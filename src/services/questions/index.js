import { push, ref, remove, update } from "firebase/database";
import { db } from "../../firebaseConnection";

export const addNewResponse = (result, number, difficulty) => {
  console.log("🚀 ~ file: index.js:5 ~ addNewResponse ~ result, number, difficulty:", result, number, difficulty)
  push(ref(db, `/results/${difficulty}/${number}`), {
    ...result,
  });
};
