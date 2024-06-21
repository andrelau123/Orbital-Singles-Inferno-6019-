import { ref, get, update, remove, set } from "firebase/database";
import { database } from "../firebase";
import axios from "axios";

export default function GetMatch(uid) {
  const reference = ref(database, "users/" + uid);
  const refmatch = ref(database, "matchpool/" + uid);

  get(reference)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const snapshott = snapshot.val();
        const match = snapshott.mymatch;
        const ranking = snapshott.ranking;
        if (match != "-") {
          console.log("you have a match already!!");
          return match;
        } else {
          console.log("you dont currently have a match..");
          axios
            .get(
              "https://singles-inferno-1da30-default-rtdb.firebaseio.com/matchpool.json"
            )

            .then((response) => {
              for (const key in response.data) {
                if (response.data[key].ranking == ranking) {
                  if (key != uid) {
                    console.log(response.data[key].telegram);
                    update(reference, { mymatch: key });
                    update(ref(database, "users/" + key), { mymatch: uid });
                    remove(refmatch);
                    remove(ref(database, "matchpool/" + key));
                    return key;
                  }
                }
              }
              set(refmatch, snapshott);
              return null;
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
