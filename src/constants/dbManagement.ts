import { ToastAndroid } from "react-native";
import reminderDataModel from "./interfaces";
import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";

let data: reminderDataModel[] = [
  {
    name: "asd",
    description: "asd",
    dateTime: new Date(),
    notificationId: "asdas",
  },
];

const id: string = "MyBubbahehehehh";

// saving to DB
const storeData = async (data: reminderDataModel[]) => {
  try {
    await SecureStore.deleteItemAsync(id);
    await SecureStore.setItemAsync(id, JSON.stringify(data)); // storing to DB
  } catch (error) {
    ToastAndroid.show("Error occuring storing", ToastAndroid.SHORT); // toast message
  }
};

function isEarlierDate(x: Date, y: Date): boolean {
  const year = x.getFullYear() <= y.getFullYear();
  const month = x.getMonth() <= y.getMonth();
  const day = x.getDate() <= y.getDate();
  const hour = x.getHours() <= y.getHours();
  const minute = x.getMinutes() < y.getMinutes();
  const result = (year && month && day) || (hour && minute);
  return result;
}

export const cleanData = (data: reminderDataModel[]) => {
  const now = new Date();
  const updatedReminderData: reminderDataModel[] = data.filter(
    async (reminder) => {
      const isEarlier = isEarlierDate(new Date(reminder.dateTime), now);
      if (isEarlier) {
        await deleteReminder(reminder.notificationId, false);
        console.log(reminder.dateTime, " is canceled");
      }
      return isEarlier;
    }
  );
  return updatedReminderData;
};
// getting from DB
export const getData = async () => {
  try {
    const value = await SecureStore.getItemAsync(id);

    if (value !== null) {
      let fetchedData: reminderDataModel[] = JSON.parse(value); // parsing to json

      return fetchedData;
    }
  } catch (error) {
    ToastAndroid.show("Error getting saving getData", ToastAndroid.SHORT); // toast message
  }
  return data;
};

// adding new data to db
export async function saveData(newReminder: reminderDataModel) {
  try {
    // fetching old data
    let oldData = await getData();
    // pushing new Data
    oldData.push(newReminder);
    // storing new Data
    await storeData(oldData);
  } catch (error) {
    ToastAndroid.show("Error saving Data", ToastAndroid.SHORT); // toast message
  }
}

export async function deleteReminder(
  notificationId: string,
  notify: boolean = true
) {
  try {
    // fetching old data
    let oldData = await getData();
    // pushing new Data
    const newData: reminderDataModel[] = oldData.filter(
      (reminder) => reminder.notificationId !== notificationId
    );
    // storing new Data
    await storeData(newData);
    await cancelNotification(notificationId, notify);
  } catch (error) {
    ToastAndroid.show("Error deleting Data", ToastAndroid.SHORT); // toast message
  }
}

// schedule notifications

// push notification request
async function requestPermissionsNotification() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("No notification permissions!");
    return;
  }
}

// schedule notification
async function scheduleNotification(data: reminderDataModel) {
  // Check if the permission has already been requested
  const permissionRequested = await SecureStore.getItemAsync(
    "permissionRequested"
  );
  // If permission has not been requested, request it
  if (!permissionRequested) {
    await requestPermissionsNotification();
  }
  const bodyText = `Sir You have a reminder the contents are ${data.description} and may you have good day`;
  // notification configuration
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  await Notifications.setNotificationChannelAsync("akshay", {
    name: "Reminders",
    sound: "msg.wav",
    importance: Notifications.AndroidImportance.HIGH,
  });

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: data.name,
      body: bodyText,
      sound: "msg.wav",
      vibrate: [0, 500, 200, 500],
      data: {
        id: data.notificationId,
      },
    },
    trigger: {
      date: new Date(data.dateTime),
      channelId: "akshay",
    },
  });
  data.notificationId = notificationId; // setting notification ID
  await saveData(data); // saving data to DB
  ToastAndroid.show("Reminder added succesfully", ToastAndroid.SHORT); // toast message
}

export async function cancelNotification(
  notificationId: string,
  notify: boolean = true
) {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
  if (notify) {
    ToastAndroid.show("Reminder deleted succesfully", ToastAndroid.SHORT); // toast message
  }
}

export default scheduleNotification;
