import { ref, get, update, remove, set } from "firebase/database";
import { database } from "../firebase";
import axios from "axios";

export default function GetMatch(uid) {
  const reference = ref(database, "users/" + uid);

  return get(reference)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const snapshott = snapshot.val();
        const match = snapshott.mymatch;
        const ranking = snapshott.ranking;
        const gender = snapshott.gender;
        if (match != "-") {
          console.log("you have a match already!!");
          return match;
        } else {
          console.log("you dont currently have a match..");
          let findmatchpoolref;
          let genderopp;
          if (gender == "male") {
            findmatchpoolref =
              "https://singles-inferno-1da30-default-rtdb.firebaseio.com/matchpool/female.json";
            genderopp = "female";
          } else {
            findmatchpoolref =
              "https://singles-inferno-1da30-default-rtdb.firebaseio.com/matchpool/male.json";
            genderopp = "male";
          }
          axios
            .get(findmatchpoolref)
            .then((response) => {
              set(ref(database, "matchpool/" + gender + "/" + uid), snapshott);
              for (const key in response.data) {
                if (response.data[key].ranking == ranking) {
                  if (key != uid) {
                    console.log(response.data[key].telegram);
                    update(reference, { mymatch: key });
                    update(ref(database, "users/" + key), { mymatch: uid });
                    remove(ref(database, "matchpool/" + genderopp + "/" + key));
                    remove(ref(database, "matchpool/" + gender + "/" + uid));
                    return key;
                  }
                }
              }
              return 1;
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
