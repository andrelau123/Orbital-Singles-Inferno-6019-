import {
  ref,
  get,
  getReference,
  orderByChild,
  query,
  equalTo,
} from "firebase/database";
import { database } from "../firebase";
import axios from "axios";

export default function GetMatch(uid) {
  const reference = ref(database, "users/" + uid);

  get(reference)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const match = snapshot.val().mymatch;
        if (match != "-") {
          console.log(match);
        } else {
          console.log("you dont have a match");
          axios
            .get(
              "https://singles-inferno-1da30-default-rtdb.firebaseio.com/users.json"
            )
            .then((response) => {
              for (const key in response.data) {
                console.log(response.data[key].mymatch);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        console.log("error");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
