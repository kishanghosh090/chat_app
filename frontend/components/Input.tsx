import { InputProps } from "@/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Input = (props: InputProps) => {
  return (
    <View style={[styles.container]}>
      <Text> textInComponent </Text>
    </View>
  );
};

export default Input;
const styles = StyleSheet.create({
  container: {},
});
