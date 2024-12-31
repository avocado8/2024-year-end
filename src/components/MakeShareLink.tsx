import { FaSquareShareNodes } from "react-icons/fa6";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

export default function MakeShareLink() {
  const { uid } = useAuth();
  const handleClick = async () => {
    console.log(uid);
    if (!uid) return;
    const shareLink = `${window.location.origin}/share/${uid}`;
    try {
      await navigator.clipboard.writeText(shareLink);
      alert("공유 링크가 복사되었습니다.");
    } catch (e) {
      alert(e);
    }
  };
  return (
    <>
      <StyledButton onClick={handleClick} size={"24px"} />
    </>
  );
}

const StyledButton = styled(FaSquareShareNodes)`
  color: #9caf88;
  cursor: pointer;
  size: 24px;
  &:hover {
    transform: scale(1.1);
    transition: 0.2s;
  }
`;
