import { push, ref, remove, update } from "firebase/database";
import { db } from "../../firebaseConnection";

export const addNewUser = (user) => {
  console.log("meu ovo")
  push(ref(db, "/users"), {
    name: user.name,
    email: user.email,
  });
};

export const teste = (user) => {
  console.log("meu ovo")
  push(ref(db, "/"), {
    name: user.name,
    email: user.email,
  });
};
