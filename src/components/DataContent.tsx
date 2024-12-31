import styled from "styled-components";
import DataDetail from "./DataDetail";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

interface DataContentProps {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  date: Timestamp;
  numberOfLetters: number;
  color: string;
  onDelete: (id: string) => void;
  isShared?: boolean;
  externalUid?: string;
}

export default function DataContent({
  id,
  title,
  subtitle,
  content,
  date,
  numberOfLetters,
  color,
  onDelete,
  isShared,
  externalUid,
}: DataContentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [uid, setUid] = useState("");

  const isValidHexColor = (color: string): boolean => {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(color);
  };
  const finalColor =
    color === "" || !isValidHexColor(color) ? "#c2c5aa" : color; // 미입력시 기본 색상

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const deletePost = async () => {
    try {
      const postCollectionRef = collection(db, "users", uid, "posts");
      const ok = confirm("이 글을 지우시겠습니까?");
      if (ok) {
        await deleteDoc(doc(postCollectionRef, id));
        onDelete(id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (curUser) => {
      if (curUser) {
        setUid(curUser.uid);
      }
    });
  }, []);

  return (
    <Wrapper>
      <DataDetail
        isOpen={isOpen}
        onClose={handleClose}
        id={id}
        title={title}
        subtitle={subtitle}
        content={content}
        date={date}
        numberOfLetters={numberOfLetters}
        color={color}
        externalUid={externalUid}
      />
      <TapeContainer>
        <TapeButtonOverlay>
          <TapeButton onClick={handleOpen}>열기</TapeButton>
          {isShared ? null : <TapeButton onClick={deletePost}>삭제</TapeButton>}
        </TapeButtonOverlay>
        <TapeBackColor style={{ backgroundColor: finalColor }} />
        <TapeImage src="/images/Tape_shadow_2.png" alt="tape" />
        <TapeText>{title}</TapeText>
      </TapeContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0 10px;
`;

const TapeContainer = styled.div`
  width: 280px;
  height: 180px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  padding: 10px 20px;
  margin: 0 10px;
  &:hover {
    transform: scale(1.05);
  }
`;

const TapeButtonOverlay = styled.div`
  opacity: 0;
  width: 98%;
  height: 87%;
  z-index: 5;
  position: absolute;
  border-radius: 10px;
  top: 1;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  gap: 7px;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  &:hover {
    opacity: 1;
  }
`;

const TapeButton = styled.div`
  padding: 5px;
  font-size: 14px;
  background-color: #9caf88;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    scale: 1.2;
    background-color: #89a079;
  }
`;

const TapeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
`;

const TapeBackColor = styled.div`
  width: 90%;
  height: 72%;
  position: absolute;
`;

const TapeText = styled.div`
  z-index: 2;
  font-size: 16px;
  position: absolute;
  bottom: 18%;
  text-align: center;
`;
