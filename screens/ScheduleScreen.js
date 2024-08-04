import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import Button from "../components/Button";
import { Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { get, onValue, ref, update, push, child } from "firebase/database";
import { auth, database } from "../firebase";
import Filter from "../components/Filter";

function ScheduleScreen() {
  const [items, setitems] = useState("");
  const [name, setname] = useState("");
  const [date, setdate] = useState(new Date());
  const [modal, setmodal] = useState(false);
  const [dates, setdates] = useState([]);
  const [num, setnum] = useState(0);
  const uid = auth.currentUser.uid;
  const reference = ref(database, "users/" + uid + "/dates");

  useEffect(() => {
    onValue(reference, (snapshot) => {
      snapshot.forEach((child) => {
        const value = child.val();
        console.log(value);
        var present = false;
        for (var d of dates) {
          if (d.event == value.event) {
            present = true;
            console.log("same event");
          }
        }
        if (!present) {
          console.log("added new date");
          setdates((curr) => [...curr, value]);
        }
      });
      console.log(dates);
    });
  }, []);

  function loadItems(day) {
    const items = items || {};
    console.log(day);
    setTimeout(() => {
      for (let i = -1000; i < 1000; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        console.log(strTime);

        if (!items[strTime]) {
          items[strTime] = [];
        }
      }
      console.log(dates);

      const arrUniq = [...new Map(dates.map((v) => [v.event, v])).values()];
      console.log("unj" + arrUniq);

      for (var j of arrUniq) {
        const datee = timeToString(j.date);
        console.log(datee);
        console.log(items[datee]);

        items[datee].push({
          name: j.event + " for " + datee + "#1",
          day: datee,
        });
        console.log("pushed out");
      }

      // get(reference)
      //   .then((snap) => {
      //     snap.forEach((child) => {
      //       const val = child.val();
      //       console.log(val.date);
      //       const datee = timeToString(val.date);
      //       console.log(datee);
      //       items[datee].push({
      //         name: val.event + " for " + date + "#1",
      //         day: datee,
      //       });
      //     });
      //   })
      //   .catch((error) => console.log(error));

      // const numItems = 1;
      // for (let j = 0; j < numItems; j++) {
      //   const datee = date.toISOString().split("T")[0];
      //   items[datee].push({
      //     name: name + " for " + date + " #" + j,
      //     day: datee,
      //   });
      // }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setitems(newItems);
      console.log(items);
    }, 1000);
  }

  function timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }

  function onChange(event, selectedDate) {
    const currentDate = selectedDate;
    setdate(currentDate);
    console.log(currentDate.toISOString().split("T")[0]);
  }

  function closemodal() {
    if (name == "") {
      Alert.alert("Please enter an event");
    }
    setmodal(false);
    console.log(date);
    const dateupdate = date.setDate(date.getDate() + 1);
    push(reference, { event: name, date: dateupdate });
  }

  function handlename(input) {
    setname(input);
  }

  function handledateandname(date) {
    date = date;
  }

  function renderItem(item) {
    return (
      <TouchableOpacity style={styles.touch}>
        <Card>
          <Card.Content>
            <View style={styles.item}>
              <Text>{item.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  }

  function handleevent() {
    setmodal(true);
  }

  return (
    <View style={styles.input}>
      <View style={styles.main}>
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={"2024-08-05"}
          style={styles.cal}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.button}>
        <Button onPress={handleevent}>ADD EVENT</Button>
      </View>
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={modal}
      >
        <View style={styles.modal}>
          <View style={styles.inputContainer}>
            <View style={styles.eachfield}>
              <Text style={styles.text}>Event Name: </Text>
              <TextInput
                style={styles.inputtext}
                placeholder="name"
                onChangeText={handlename}
                value={name}
              />
            </View>
            <View style={styles.eachfield}>
              <Text style={styles.text}>Date: </Text>
              <DateTimePicker
                mode="date"
                value={date}
                onChange={onChange}
                style={styles.date}
              />
              <Text style={styles.text}>selected: {date.toLocaleString()}</Text>
            </View>
          </View>

          <View style={styles.addbutton}>
            <Button onPress={closemodal}>ADD EVENT</Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ScheduleScreen;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    backgroundColor: "#fa6559",
  },
  main: {
    flex: 6,
    backgroundColor: "#fa6559",
    padding: 16,
    marginBottom: 40,
  },
  cal: {
    borderRadius: 20,
  },
  item: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  touch: {
    marginRight: 10,
    marginTop: 35,
  },
  button: {
    padding: 12,
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
  },
  modal: {
    backgroundColor: "#fa6559",
    flex: 1,
    alignContent: "center",
    marginTop: 90,
  },
  addbutton: {
    padding: 30,
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    padding: 12,
    marginTop: 6,
  },
  eachfield: {
    padding: 8,
  },
  text: {
    paddingVertical: 8,
    marginHorizontal: 8,
    fontSize: 15,
    color: "white",
    fontFamily: "Sans Serif",
    fontWeight: "600",
  },
  inputtext: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 8,
    backgroundColor: "#f6d9c1",
    borderColor: "white",
  },
  date: {
    color: "white",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 220,
  },
});
