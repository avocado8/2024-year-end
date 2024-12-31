import { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import styled from "styled-components";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function AddData() {
  const { uid } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [color, setColor] = useState("");
  const [isValid, setIsValid] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name == "title") {
      setTitle(e.target.value);
    } else if (e.target.name == "content") {
      setContent(e.target.value);
    } else if (e.target.name == "date") {
      setDate(new Date(e.target.value));
    } else if (e.target.name == "color") {
      setColor(e.target.value);
    } else if (e.target.name == "subtitle") {
      setSubtitle(e.target.value);
    }
  };

  const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!uid) return;
    try {
      const postCollectionRef = collection(db, "users", uid, "posts");
      const newPost = {
        title: title,
        subtitle: subtitle,
        content: content,
        date: date,
        numberOfLetters: content.length,
        color: color,
      };
      await addDoc(postCollectionRef, newPost);
      console.log("added!");
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsValid(!!title && !!content && !!date);
  }, [title, content, date]);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (curUser) => {
  //     if (curUser) {
  //       // setUser(curUser);
  //       setUid(curUser.uid);
  //     }
  //   });
  // }, []);

  return (
    <>
      <StyledAdd size={"24px"} onClick={handleOpen} />
      {isOpen && (
        <>
          <Overlay />
          <Modal>
            <ModalHeader>
              <ModalTitle>글 추가하기</ModalTitle>
              <IoIosCloseCircle
                color="#9CAF88"
                cursor={"pointer"}
                size={"24px"}
                onClick={handleOpen}
              />
            </ModalHeader>
            <Form onSubmit={addPost}>
              <FlexContainer>
                <Input
                  onChange={onChange}
                  name="title"
                  placeholder="제목 입력"
                />
                <Input
                  onChange={onChange}
                  name="subtitle"
                  placeholder="부제(생략 가능)"
                />
              </FlexContainer>
              <ContentArea
                onChange={onChange}
                name="content"
                placeholder="본문 입력"
              />
              <Input onChange={onChange} name="date" type="date" />
              <Input
                onChange={onChange}
                name="color"
                placeholder="색상(#000000 형식으로 입력) (생략 가능)"
                type="text"
              />
              <Input value="추가하기" type="submit" disabled={!isValid} />
            </Form>
          </Modal>
        </>
      )}
    </>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const Modal = styled.div`
  position: fixed;
  background-color: #f2e8d5;
  width: 60%;
  height: 70%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #9caf88;
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
  z-index: 9;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ModalTitle = styled.div`
  font-size: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  outline: none;
  font-size: 14px;
  padding: 10px 10px;
  border: none;
  border-radius: 10px;
  &[name="title"] {
    flex-grow: 1;
  }
  &[type="submit"] {
    cursor: pointer;
    transition: 0.2s;
    background-color: #fff;
    color: gray;
    &:hover {
      background-color: #c2c5aa;
      color: #f2e8d5;
    }
    &:disabled {
      cursor: not-allowed;
    }
    &:disabled:hover {
      background-color: #fff;
      color: gray;
    }
  }
`;

const ContentArea = styled.textarea`
  outline: none;
  font-size: 14px;
  padding: 10px 10px;
  border: none;
  border-radius: 10px;
  font-family: "SUIT-Regular";
  resize: none;
  height: 250px;
`;

const StyledAdd = styled(FaCirclePlus)`
  color: #9caf88;
  cursor: pointer;
  size: 24px;
  &:hover {
    transform: scale(1.1);
    transition: 0.2s;
  }
`;
