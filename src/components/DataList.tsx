import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import DataContent from "./DataContent";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

export default function DataList({
  isShared = false,
  externalUid,
}: {
  isShared?: boolean;
  externalUid?: string;
}) {
  const { uid: authUid } = useAuth();
  const [uid, setUid] = useState("");
  const [dataList, setDataList] = useState<DocumentData[]>([]);

  const getUserPosts = async (uid: string) => {
    try {
      if (uid) {
        const postCollectonRef = collection(db, "users", uid, "posts");
        const postQuery = query(postCollectonRef, orderBy("date", "asc"));
        const querySnapshot = await getDocs(postQuery);
        querySnapshot.forEach((doc) => {
          setDataList((prevDataList) => {
            const isDuplicate = prevDataList.some(
              (existingDoc) => existingDoc.id === doc.id
            );
            if (!isDuplicate) {
              return [...prevDataList, { id: doc.id, ...doc.data() }]; // 새로운 데이터 추가
            }
            return prevDataList; // 중복된 데이터는 추가하지 않음
          });
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = (id: string) => {
    setDataList((prev) => prev.filter((post) => post.id !== id));
  };

  useEffect(() => {
    setUid(externalUid || authUid);
  }, [externalUid, authUid]);

  useEffect(() => {
    if (uid) {
      getUserPosts(uid);
    }
  }, [uid]);

  useEffect(() => {
    console.log("Updated dataList:", dataList);
  }, [dataList]);

  return (
    <Wrapper>
      {dataList.map((item) => {
        return (
          <DataContent
            id={item.id}
            title={item.title}
            subtitle={item.subtitle}
            content={item.content}
            date={item.date}
            numberOfLetters={item.numberOfLetters}
            color={item.color}
            onDelete={handleDelete}
            isShared={isShared}
            externalUid={externalUid}
          />
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
  justify-content: center;
`;
