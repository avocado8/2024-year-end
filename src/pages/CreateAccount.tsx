import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || email == "" || password == "") return;
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <Wrapper>
      <Title>Create Account</Title>
      <Form onSubmit={onSubmit}>
        <Input onChange={onChange} name="email" placeholder="이메일" />
        <Input
          onChange={onChange}
          name="password"
          placeholder="비밀번호"
          type="password"
        />
        <ErrorLine>{errorMessage}</ErrorLine>
        <Input
          type="submit"
          value="계정 만들기"
          style={{ cursor: "pointer" }}
        />
      </Form>
      <ChangeButton onClick={handleClick}>already have?</ChangeButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 150px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
`;

const ErrorLine = styled.div`
  color: red;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Input = styled.input`
  outline: none;
  font-size: 14px;
  padding: 5px;
  border: none;
  border-radius: 10px;
`;

const ChangeButton = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
