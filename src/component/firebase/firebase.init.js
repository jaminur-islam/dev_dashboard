import { initializeApp } from "firebase/app";
import firebaseConfig from "./firbase.confing";

const firebaseAuthenticationInit = () => {
  return initializeApp(firebaseConfig);
};
export default firebaseAuthenticationInit;
