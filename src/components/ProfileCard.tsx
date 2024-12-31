import styled from "styled-components";
import { auth, db } from "../firebase";
import React, { useEffect, useRef, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { onAuthStateChanged, updateProfile, User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

export default function ProfileCard({
  isShared = false,
  externalUid,
}: {
  isShared?: boolean;
  externalUid?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("User");
  const [uid, setUid] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const nameFieldRef = useRef<HTMLDivElement>(null);

  const [totalLetters, setTotalLetters] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  const onClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      nameFieldRef.current?.focus();
    }, 0);
  };

  // 이름 수정
  const handleBlur = async (e: React.FocusEvent<HTMLDivElement>) => {
    try {
      setIsEditing(false);
      if (user) {
        const newUsername = e.target.textContent ?? "User";
        setUsername(newUsername);
        await updateProfile(user, {
          displayName: newUsername,
        });
        console.log("Profile updated:", user.displayName);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const getUserInfo = async () => {
    setIsLoading(true);
    try {
      const postCollectionRef = collection(db, "users", uid, "posts");
      const snapshot = await getDocs(postCollectionRef);
      const { totalLetters, totalPosts } = snapshot.docs.reduce(
        (totals, doc) => {
          const data = doc.data();
          return {
            totalLetters: totals.totalLetters + data.numberOfLetters,
            totalPosts: totals.totalPosts + 1,
          };
        },
        { totalLetters: 0, totalPosts: 0 }
      );
      setTotalLetters(totalLetters);
      setTotalPosts(totalPosts);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (externalUid) {
      setUid(externalUid);
    } else {
      onAuthStateChanged(auth, (curUser) => {
        if (curUser) {
          setUser(curUser);
          setUsername(curUser.displayName ?? "User");
          setUid(curUser.uid);
        }
      });
    }
  }, [externalUid]);

  useEffect(() => {
    if (uid) {
      console.log("uid" + uid);
      getUserInfo();
    }
  }, [uid]);

  return (
    <Card>
      <AvatarContainer>
        <AvatarImage src={"/images/User.png"} />
      </AvatarContainer>
      <NameContainer>
        <NameField
          contentEditable={isEditing}
          onBlur={handleBlur}
          ref={nameFieldRef}
        >
          {username}
        </NameField>
        {isShared ? null : <FiEdit2 onClick={onClick} />}
      </NameContainer>
      {isLoading ? (
        "불러오는 중..."
      ) : (
        <>
          <div>작성 문서 {totalPosts}건</div>
          <div>글자수 {totalLetters}자</div>
        </>
      )}
    </Card>
  );
}

const Card = styled.div`
  width: 210px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  gap: 5px;
`;

const AvatarContainer = styled.div`
  width: 130px;
  height: 130px;
  background-color: red;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const AvatarImage = styled.img``;

const NameContainer = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
`;

const NameField = styled.div`
  padding: 5px;
  max-width: 120px;
  overflow: hidden;
`;
