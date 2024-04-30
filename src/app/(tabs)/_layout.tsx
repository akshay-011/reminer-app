import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../constants/colors";
import { Entypo } from "@expo/vector-icons";

const RootLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: colors.white,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.smoothblack,
          borderCurve: "continuous",
          shadowColor: colors.white,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="home" size={24} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="showReminders"
        options={{
          title: "Show Reminders",
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="list" size={24} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
