import React from "react";
import { Stack } from "expo-router";
import colors from "../../../constants/colors";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.smoothblack,
        },
        headerTintColor: colors.orange,
        animation: "slide_from_right",
        animationDuration: 5,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="add-reminder"
        options={{
          title: "Add New Reminder",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default Layout;
