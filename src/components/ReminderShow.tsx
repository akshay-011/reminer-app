import { Pressable, StyleSheet, Text, View } from "react-native";
import reminderDataModel from "../constants/interfaces";
import colors from "../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { deleteReminder } from "../constants/dbManagement";

const ReminderShow = ({
  props,
  setRefresh,
}: {
  props: reminderDataModel;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const newDate = new Date(props.dateTime);
  return (
    <View style={styles.body}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.description}>{props.description}</Text>
        <Text style={styles.date}>
          {newDate.toLocaleDateString()} : {newDate.toLocaleTimeString()}
        </Text>
      </View>
      <Pressable
        onPress={async () => {
          await deleteReminder(props.notificationId);
          setRefresh((prev) => prev + 1);
        }}
        style={styles.deleteView}
      >
        <MaterialIcons name="delete" size={24} color="red" />
      </Pressable>
    </View>
  );
};

export default ReminderShow;

const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.dark,
    width: "100%",
    borderWidth: 1,
    borderColor: colors.lightblack,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
  },
  name: {
    color: colors.orange,
    fontSize: 24,
  },
  description: {
    color: colors.white,
    fontSize: 20,
    textTransform: "capitalize",
  },
  date: {
    color: colors.white,
    fontSize: 20,
  },
  time: {
    color: colors.white,
    fontSize: 20,
  },
  delete: {
    color: "red",
    fontSize: 20,
    textTransform: "capitalize",
  },
  deleteView: {},
});
