import styled from "styled-components";
import ProfileCard from "../components/ProfileCard";
import AddData from "../components/AddData";
import DataList from "../components/DataList";
import LogOut from "../components/LogOut";
import Statistic from "../components/Statistic";
import MakeShareLink from "../components/MakeShareLink";
import { useNavigate } from "react-router";

export default function MainPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <Header>
        <MainTitle onClick={handleClick}>2024 YEAR END</MainTitle>
        <MainLine />
      </Header>
      <Wrapper>
        <LeftSide>
          <ProfileCard />
          <ButtonWrapper>
            <AddData />
            <Statistic />
            <MakeShareLink />
            <LogOut />
          </ButtonWrapper>
        </LeftSide>
        <RightSide>
          <DataList />
        </RightSide>
      </Wrapper>
    </>
  );
}

const Header = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const MainTitle = styled.div`
  font-size: 32px;
  color: #c2c5aa;
  cursor: pointer;
  &:hover {
    transition: 0.2s;
    opacity: 0.6;
  }
`;

const MainLine = styled.div`
  height: 5px;
  background-color: #c2c5aa;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: start;
  align-items: start;
  box-sizing: border-box;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RightSide = styled.div`
  width: 100%;
  background-color: transparent;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
