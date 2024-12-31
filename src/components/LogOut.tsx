import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { SlLogout } from "react-icons/sl";
import styled from "styled-components";

export default function LogOut() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };

  return (
    <StyledLogout
      color="#9CAF88"
      cursor={"pointer"}
      size={"24px"}
      onClick={handleLogout}
    />
  );
}

const StyledLogout = styled(SlLogout)`
  color: #9caf88;
  cursor: pointer;
  size: 24px;
  &:hover {
    transform: scale(1.1);
    transition: 0.2s;
  }
`;
