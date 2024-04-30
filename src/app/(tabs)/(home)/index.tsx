import { Pressable, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { wp } from "../../../constants/dimensions";
import colors from "../../../constants/colors";
import React, { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

function Home(): React.JSX.Element {
  const DURATION = 2000;
  const ease = Easing.bezier(0.1, 0.6, 0.5, 0.7);
  const sv = useSharedValue<number>(0);
  const textAnimation = useSharedValue<number>(0);
  useEffect(() => {
    sv.value = withTiming(1, { duration: DURATION, easing: ease });
    textAnimation.value = withDelay(
      DURATION,
      withTiming(1, { duration: DURATION })
    );
  }, []);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 180} deg` }],
  }));
  return (
    <View style={style.body}>
      <Animated.View style={animatedStyle}>
        <View style={style.addReminder}>
          <Pressable
            style={{
              borderRadius: 50,
              elevation: 15,
              shadowColor: colors.smoothblack,
            }}
          >
            <Link
              style={{ backgroundColor: colors.dark, borderRadius: 50 }}
              href={"/(tabs)/(home)/add-reminder"}
              asChild
            >
              <AntDesign
                size={wp(25)}
                name="pluscircleo"
                color={colors.lightorange}
              />
            </Link>
          </Pressable>
        </View>
      </Animated.View>
      <Animated.Text
        style={{
          opacity: textAnimation,
          color: colors.smoothorange,
          fontSize: wp(6),
          fontWeight: "bold",
          marginTop: wp(10),
          letterSpacing: 3,
        }}
      >
        Click on the above button 🖕
      </Animated.Text>
    </View>
  );
}

export default Home;

const style = StyleSheet.create({
  addReminder: {
    borderRadius: wp(50),
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.dark,
  },
});
