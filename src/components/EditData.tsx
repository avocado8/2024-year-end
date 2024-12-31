import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { MdEdit } from "react-icons/md";
import { DataDetailProps } from "../types/DataDetailProps";

export default function EditData({
  id,
  title,
  subtitle,
  content,
  date,
  color,
}: DataDetailProps) {
  const [isOpen, setIsOpen] = useState(false);
  // const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useState("");

  // 로컬 상태
  const [localTitle, setLocalTitle] = useState(title);
  const [localSubtitle, setLocalSubtitle] = useState(subtitle);
  const [localContent, setLocalContent] = useState(content);
  const [localDate, setLocalDate] = useState(date);
  const [localColor, setLocalColor] = useState(color || "");
  const [isValid, setIsValid] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name == "title") {
      setLocalTitle(e.target.value);
    } else if (e.target.name == "content") {
      setLocalContent(e.target.value);
    } else if (e.target.name == "date") {
      setLocalDate(Timestamp.fromDate(new Date(e.target.value)));
    } else if (e.target.name == "color") {
      setLocalColor(e.target.value);
    } else if (e.target.name == "subtitle") {
      setLocalSubtitle(e.target.value);
    }
  };

  const editPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const postDocRef = doc(db, "users", uid, "posts", id);
      const updatedPost = {
        title: localTitle,
        subtitle: localSubtitle,
        content: localContent,
        date: localDate,
        numberOfLetters: localContent.length,
        color: localColor,
      };
      await updateDoc(postDocRef, updatedPost);
      console.log("modified!");
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

  useEffect(() => {
    onAuthStateChanged(auth, (curUser) => {
      if (curUser) {
        // setUser(curUser);
        setUid(curUser.uid);
      }
    });
  }, []);

  return (
    <>
      <StyledEdit size={"24px"} onClick={handleOpen} />
      {isOpen && (
        <>
          <Overlay />
          <Modal>
            <ModalHeader>
              <ModalTitle>수정하기</ModalTitle>
              <IoIosCloseCircle
                color="#9CAF88"
                cursor={"pointer"}
                size={"24px"}
                onClick={handleOpen}
              />
            </ModalHeader>
            <Form onSubmit={editPost}>
              <FlexContainer>
                <Input
                  onChange={onChange}
                  name="title"
                  placeholder="제목 입력"
                  value={localTitle}
                />
                <Input
                  onChange={onChange}
                  name="subtitle"
                  placeholder="부제(생략 가능)"
                  value={localSubtitle}
                />
              </FlexContainer>
              <ContentArea
                onChange={onChange}
                name="content"
                placeholder="본문 입력"
                value={localContent}
              />
              <Input
                onChange={onChange}
                name="date"
                type="date"
                value={localDate.toDate().toISOString().substring(0, 10)}
              />
              <Input
                onChange={onChange}
                name="color"
                placeholder="색상(#000000 형식으로 입력) (생략 가능)"
                type="text"
                value={localColor}
              />
              <Input value="수정하기" type="submit" disabled={!isValid} />
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
  z-index: 7;
`;

const Modal = styled.div`
  position: fixed;
  background-color: #f2e8d5;
  width: 100%;
  height: 100%;
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

const StyledEdit = styled(MdEdit)`
  color: #9caf88;
  cursor: pointer;
  margin-left: 3px;
  padding: 0;
  &:hover {
    opacity: 0.7;
  }
`;
