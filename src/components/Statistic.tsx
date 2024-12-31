import { useEffect, useState } from "react";
import { BsFileEarmarkBarGraphFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { stopWords } from "../consts/StopWords";

export default function Statistic({ externalUid }: { externalUid?: string }) {
  const { uid: authUid } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [topWords, setTopWords] = useState<[string, number][] | null>(null);
  const [avgLetters, setAvgLetters] = useState(0);
  const [uid, setUid] = useState<string | null>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const checkStopword = (word: string) => {
    return stopWords.includes(word) || word.length <= 2;
  };

  const fetchContents = async () => {
    const postCollectionRef = collection(db, "users", uid!, "posts");
    const snapshot = await getDocs(postCollectionRef);
    const contents = snapshot.docs.map((doc) => doc.data().content);
    const contentLetters = snapshot.docs.map(
      (doc) => doc.data().numberOfLetters
    );
    return [contents, contentLetters];
  };

  const getAvgLetters = (contentLetters: number[]) => {
    const sum = contentLetters.reduce((acc, curr) => acc + curr, 0);
    return Math.floor(sum / contentLetters.length);
  };

  const countWords = (contents: string[]) => {
    const wordCounts: Record<string, number> = {}; // 단어 - 개수 맵
    contents.forEach((content) => {
      const words = content.replace(/[^a-zA-Z가-힣\s]/g, "").split(/\s+/); // 공백 기준으로 단어 분리
      words.forEach((word) => {
        if (!checkStopword(word)) {
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
      });
    });
    return wordCounts;
  };

  const getTopWords = (wordCounts: Record<string, number>) => {
    const sortedWords = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    return sortedWords;
  };

  const getStatistic = async () => {
    const contents = await fetchContents();
    const wordCounts = countWords(contents[0]);
    const topWords = getTopWords(wordCounts);
    const avgLetters = getAvgLetters(contents[1]);
    setTopWords(topWords);
    setAvgLetters(avgLetters);
  };

  useEffect(() => {
    setUid(externalUid || authUid); // externalUid 우선
  }, [externalUid, authUid]);

  useEffect(() => {
    if (uid) {
      getStatistic(); // uid가 설정된 후에만 실행
    }
  }, [uid]);

  return (
    <>
      <StyledButton onClick={handleOpen} size={"24px"} />
      {isOpen && (
        <>
          <Overlay />
          <Modal>
            <ModalHeader>
              <ModalTitle>통계</ModalTitle>
              <IoIosCloseCircle
                color="#9CAF88"
                cursor={"pointer"}
                size={"24px"}
                onClick={handleClose}
              />
            </ModalHeader>
            <ModalContents>
              <Words>
                <WordsTitle>사용 단어 Top10</WordsTitle>
                {topWords?.map(([word, count]) => (
                  <WordContainer>
                    <Word>{word}</Word>
                    <Count>{count}</Count>
                  </WordContainer>
                ))}
              </Words>
              <AvgLetters>
                <WordsTitle>문서 평균</WordsTitle>
                <Word>{avgLetters}자</Word>
              </AvgLetters>
            </ModalContents>
          </Modal>
        </>
      )}
    </>
  );
}

const StyledButton = styled(BsFileEarmarkBarGraphFill)`
  color: #9caf88;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: 0.2s;
  }
`;

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

const ModalContents = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const WordsTitle = styled.div`
  font-size: 20px;
`;

const Words = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  background-color: #fff;
  padding: 50px;
  border-radius: 20px;
`;

const WordContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Word = styled.div`
  background-color: #9caf88;
  min-width: 90px;
  text-align: center;
  color: #f2e8d5;
  padding: 5px;
  border-radius: 5px;
`;

const Count = styled.div`
  background-color: #fff;
  min-width: 30px;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
`;

const AvgLetters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  background-color: #fff;
  padding: 50px;
  border-radius: 20px;
`;
