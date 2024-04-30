import {
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableHighlight,
  View,
} from "react-native";
import React, { lazy, useEffect, useRef, useState } from "react";
import colors from "../../constants/colors";
import reminderDataModel from "../../constants/interfaces";
import { cleanData, getData } from "../../constants/dbManagement";
import ReminderShow from "../../components/ReminderShow";
import { FontAwesome } from "@expo/vector-icons";
import { hp } from "@/src/constants/dimensions";

function showReminders() {
  const [reminderData, setReminderData] = useState<reminderDataModel[]>();
  const [loading, setLoading] = useState(true);
  const [cleanDataShow, setCleanDataShow] = useState(false);

  // fetch data and state management
  const fetchData = async () => {
    setLoading(true);
    try {
      let data: reminderDataModel[] = await getData(); // getting data
      // validating data
      if (data != null) {
        setReminderData(data);
      }
    } catch (e) {
      ToastAndroid.show("Error getting data showReminders", ToastAndroid.SHORT);
    }
    setLoading(false);
  };
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    fetchData();
  }, [refresh]);

  // freshesh icon component
  const RefreshIcon = () => {
    const iconColor = cleanDataShow ? "gray" : "orange";
    return (
      <TouchableHighlight
        onPress={() => {
          setCleanDataShow(true);
          if (reminderData) {
            const d = cleanData(reminderData);
            setReminderData(d);
          }
          setRefresh((prev) => prev + 1);
          setTimeout(() => {
            setCleanDataShow(false);
          }, 10000);
        }}
        style={styles.refresh}
        disabled={cleanDataShow}
      >
        <FontAwesome name="refresh" size={45} color={iconColor} />
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.body}>
      <View>
        <Text style={styles.heading}>Reminders</Text>
      </View>
      <View style={styles.view}>
        <FlatList
          data={reminderData}
          renderItem={({ item }) => (
            <ReminderShow props={item} setRefresh={setRefresh} />
          )}
          keyExtractor={(item) => item.notificationId}
          ListEmptyComponent={<Text style={styles.view}>No Reminders</Text>}
          refreshing={loading}
          onRefresh={fetchData}
          style={{
            marginBottom: hp(10),
          }}
        />
      </View>
      <RefreshIcon />
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  view: {
    shadowColor: "#fff",
    width: "100%",
    alignItems: "stretch",
    justifyContent: "center",
  },
  heading: {
    color: colors.smoothorange,
    fontSize: 33,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 20,
    marginTop: 10,
  },
  refresh: {
    position: "absolute",
    right: 10,
    bottom: 15,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    borderRadius: 40,
    backgroundColor: colors.dark,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.dark,
  },
});
export default showReminders;
