import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { auth, database } from "../firebase";
import { get, ref, onValue } from "firebase/database";
import { useFonts, LoveYaLikeASister_400Regular } from "@expo-google-fonts/dev";

function MatchScreen() {
  const uid = auth.currentUser.uid;
  const [matchid, setmatchid] = useState(null);
  const [matchname, setmatchname] = useState("");
  const [matchtele, settele] = useState("");
  const font = useFonts({ LoveYaLikeASister_400Regular });

  useEffect(() => {
    onValue(ref(database, "users/" + uid), (snapshot) => {
      if (snapshot.exists()) {
        const match = snapshot.val().mymatch;
        setmatchid(match);
        if (snapshot.val().mymatch != "-") {
          onValue(ref(database, "users/" + match), (snapshot) => {
            setmatchname(snapshot.val().name);
            settele(snapshot.val().telegram);
          });
        }
      }
    });
  }, []);

  function Render() {
    if (matchid == "-") {
      return (
        <View style={styles.matched}>
          <View>
            <Image
              source={require("../assets/brokenheart.gif")}
              style={styles.image}
            />
          </View>
          <Text style={styles.matchtext}>
            Ooopsss we couldn't find you a match....
          </Text>
          <Text style={styles.detailstext}>
            Please try again sometime soon!!
          </Text>
        </View>
      );
    } else {
      return (
        <>
          <Image source={require("../assets/heart.gif")} style={styles.image} />
          <View style={styles.matched}>
            <Text style={styles.matchtext}>You have been matched!!!</Text>
          </View>
          <View style={styles.detailscontainer}>
            <Text style={styles.detailstext}>
              Your matches' name : {matchname}
            </Text>
            <Text style={styles.detailstext}>
              Your matches' telegram handle : @ {matchtele}
            </Text>
          </View>
        </>
      );
    }
  }

  return (
    <View style={styles.main}>
      <View style={styles.matchcontainer}>
        <Render />
      </View>
    </View>
  );
}

export default MatchScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fa6559",
  },

  matchcontainer: {
    padding: 8,
    textAlign: "center",
    backgroundColor: "#e0d1c6",
    margin: 24,
    flex: 1,
    borderRadius: 16,
    shadowColor: "#823b31",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 16,
    shadowRadius: 0.35,
    paddingVertical: 12,
    marginVertical: 30,
  },
  matchtext: {
    textAlign: "center",
    fontSize: 43,
    padding: 10,
    flex: 1,
    fontFamily: "LoveYaLikeASister_400Regular",
  },
  matched: {
    flex: 1,
    justifyContent: "center",
  },
  detailscontainer: {
    flex: 1,
    padding: 8,
  },
  detailstext: {
    padding: 8,
    fontFamily: "LoveYaLikeASister_400Regular",
    fontSize: 18,
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    justifyContent: "flex-center",
    marginTop: 25,
  },
  imagecontainer: {
    flex: 1,
  },
});
