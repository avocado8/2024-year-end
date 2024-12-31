import { IoIosCloseCircle } from "react-icons/io";
import styled from "styled-components";
import EditData from "./EditData";
import { DataDetailProps } from "../types/DataDetailProps";

export default function DataDetail({
  id,
  isOpen,
  title,
  subtitle,
  content,
  date,
  color,
  numberOfLetters,
  onClose,
  externalUid,
}: DataDetailProps) {
  const dateConverted = date.toDate().toISOString().substring(0, 10);

  return (
    <>
      {isOpen && (
        <>
          <Overlay />
          <Modal>
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
              <ModalSubtitle>{subtitle}</ModalSubtitle>
              <ContentDate>
                {dateConverted} | {numberOfLetters}자
              </ContentDate>
              {externalUid ? null : (
                <EditData
                  id={id}
                  title={title}
                  subtitle={subtitle}
                  content={content}
                  date={date}
                  numberOfLetters={numberOfLetters}
                  color={color}
                />
              )}
              <DetailButton>
                <IoIosCloseCircle size={"24px"} onClick={onClose} />
              </DetailButton>
            </ModalHeader>
            <ModalContent>{content}</ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}

const DetailButton = styled.div`
  color: #9caf88;
  cursor: pointer;
  margin-left: 3px;
  padding: 0;
  &:hover {
    opacity: 0.7;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 6;
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
  box-sizing: border-box;
  z-index: 7;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 13px; /* 스크롤바 너비 */
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #9caf88;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 10px;
  position: sticky;
  top: 0;
  background-color: #f2e8d5;
  height: 30px;
  border-bottom: 2px solid #9caf88;
  z-index: 2;
`;

const ModalTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const ModalSubtitle = styled.div`
  font-size: 14px;
  margin-left: 3px;
  flex-grow: 1;
  align-self: flex-end;
`;

const ContentDate = styled.div`
  font-size: 14px;
  margin-right: 5px;
`;

const ModalContent = styled.div`
  white-space: pre-wrap;
  position: absolute;
  padding: 15px 22px;
  line-height: 1.5;
`;
