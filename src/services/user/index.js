import { push, ref, remove, update } from "firebase/database";
import { db } from "../../firebaseConnection";

export const addNewUser = (user) => {
  push(ref(db, "/users"), {
    name: user.name,
    email: user.email,
  });
};
