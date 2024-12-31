import styled from "styled-components";
import ProfileCard from "../components/ProfileCard";
import DataList from "../components/DataList";
import Statistic from "../components/Statistic";
import { useParams } from "react-router";

export default function SharedMainPage() {
  const { uid } = useParams();
  return (
    <>
      <Header>
        <MainTitle>2024 YEAR END</MainTitle>
        <MainLine />
      </Header>
      <Wrapper>
        <LeftSide>
          <ProfileCard isShared={true} externalUid={uid} />
          <ButtonWrapper>
            <Statistic externalUid={uid} />
          </ButtonWrapper>
        </LeftSide>
        <RightSide>
          <DataList isShared={true} externalUid={uid} />
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
