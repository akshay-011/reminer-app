import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../constants/colors";

interface buttonPorps {
  children: string;
  onClick: () => void;
}

const Button: React.FC<buttonPorps> = ({ children, onClick }) => {
  return (
    <Pressable onPress={onClick}>
      <Text style={styles.text}> {children} </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  text: {
    backgroundColor: colors.lightorange,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#fff",
    elevation: 10,
  },
});
