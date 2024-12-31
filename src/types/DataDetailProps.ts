import { Timestamp } from "firebase/firestore";

export interface DataDetailProps {
  id: string;
  isOpen?: boolean;
  title: string;
  subtitle: string;
  content: string;
  date: Timestamp;
  numberOfLetters: number;
  color: string;
  onClose?: () => void;
  externalUid?: string;
}
