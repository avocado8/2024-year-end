import { BeatLoader } from "react-spinners";
import styled from "styled-components";

export default function Loading() {
  return (
    <Wrapper>
      <BeatLoader color="#303030" />
      <h1>Loading...</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
