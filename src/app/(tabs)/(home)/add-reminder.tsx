import { StyleSheet, TextInput, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import colors from "../../../constants/colors";
import { hp, wp } from "../../../constants/dimensions";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../../components/Button";
import reminderDataModel from "../../../constants/interfaces";
import scheduleNotification from "../../../constants/dbManagement";

const AddReminder = () => {
  const [reminderData, setReminderData] = useState<reminderDataModel>({
    name: "",
    description: "",
    dateTime: new Date(),
    notificationId: "",
  });

  function changeName(newName: string) {
    setReminderData((prevState) => ({ ...prevState, name: newName }));
  }

  function changeDescription(newDescription: string) {
    setReminderData((prevState) => ({
      ...prevState,
      description: newDescription,
    }));
  }

  const [show, setShow] = useState<boolean>(false);
  const [mode, setMode] = useState<any>("date");

  function changeDate(event: any, selectedDate: any) {
    setShow(false);
    let newDate = selectedDate || reminderData.dateTime;
    setReminderData((prev) => ({ ...prev, dateTime: newDate }));
  }

  return (
    <View style={styles.body}>
      <View style={styles.form}>
        <TextInput
          placeholderTextColor={colors.white}
          onChangeText={changeName}
          value={reminderData.name}
          placeholder="Name"
          style={styles.textInput}
        />
        <TextInput
          placeholderTextColor={colors.white}
          onChangeText={changeDescription}
          placeholder="Description"
          style={styles.description}
          value={reminderData.description}
        />
        <View style={{ flexDirection: "row" }}>
          <Button
            onClick={() => {
              setMode("date");
              setShow(true);
            }}
          >
            Choose Date
          </Button>

          <Button
            onClick={() => {
              setMode("time");
              setShow(true);
            }}
          >
            Choose Time
          </Button>
        </View>

        {show && (
          <RNDateTimePicker
            onChange={changeDate}
            value={reminderData.dateTime}
            mode={mode}
            display="spinner"
            minimumDate={new Date()}
          />
        )}
        <Button
          onClick={async () => {
            if (
              !(
                reminderData.name.length <= 0 ||
                reminderData.description.length <= 0
              )
            ) {
              await scheduleNotification(reminderData);
              changeName("");
              changeDescription("");
              changeDate(null, new Date());
              return;
            }
            ToastAndroid.show("Please fill the form", ToastAndroid.LONG);
          }}
        >
          Submit
        </Button>
      </View>
    </View>
  );
};

export default AddReminder;

const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.dark,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.lightorange,
    width: "75%",
    fontSize: 20,
    height: hp(5),
    borderRadius: 7,
    letterSpacing: 2,
    color: colors.white,
    padding: 10,
  },
  form: {
    borderWidth: 5,
    width: wp(90),
    minHeight: hp(65),
    borderColor: colors.lightblack,
    borderRadius: wp(10),
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  description: {
    borderWidth: 1,
    borderColor: colors.lightorange,
    width: "75%",
    fontSize: 20,
    height: hp(10),
    borderRadius: 7,
    letterSpacing: 2,
    color: colors.white,
    padding: 10,
  },
});
