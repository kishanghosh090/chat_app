import { colors } from "@/constants/theme";

import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
} from "react-native";
import { View } from "react-native";

const Loading = ({
  size = "large",
  color = colors.primary,
}: ActivityIndicatorProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};
export default Loading;

const styles = StyleSheet.create({});
