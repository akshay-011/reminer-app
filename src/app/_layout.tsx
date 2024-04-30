import { Stack } from "expo-router";
import colors from "../constants/colors";

const AppLayout = () => {
  return (
    <Stack
      screenOptions={{
        statusBarColor: colors.lightorange,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "Remind Me",
          headerTitleAlign: "center",
          headerBackTitle: "asasdasd",
        }}
      />
    </Stack>
  );
};
export default AppLayout;
