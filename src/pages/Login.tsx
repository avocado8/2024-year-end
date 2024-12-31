import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <Wrapper>
      <Title>Login</Title>
      <Form onSubmit={onSubmit}>
        <Input onChange={onChange} name="email" placeholder="이메일" />
        <Input
          onChange={onChange}
          name="password"
          placeholder="비밀번호"
          type="password"
        />
        <Input type="submit" value="로그인" style={{ cursor: "pointer" }} />
      </Form>
      <ChangeButton onClick={handleClick}>create account</ChangeButton>
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
