import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "@/components/ScreenWraper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Animated, { FadeIn } from "react-native-reanimated";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WelcomeScreen = () => {
  const router = useRouter();
  useEffect(() => {
    if (!AsyncStorage.getItem("token")) {
      router.replace("/(main)/home");
    }
  }, []);

  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.5}>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Typo color={colors.white} size={43} fontWeight={"900"}>
            Bubbly
          </Typo>
        </View>
        <Animated.Image
          entering={FadeIn.duration(700).springify()}
          source={require("../../assets/images/welcome.png")}
          style={styles.welcomeImage}
          resizeMode={"contain"}
        />
        <View>
          <Typo color={colors.white} size={33} fontWeight={"800"}>
            Stay Connected
          </Typo>
          <Typo color={colors.white} size={33} fontWeight={"800"}>
            with your friends
          </Typo>
          <Typo color={colors.white} size={33} fontWeight={"800"}>
            and family
          </Typo>
          <Button
            style={{
              backgroundColor: colors.white,
            }}
            onPress={() => router.push("/(auth)/Register")}
          >
            <Typo size={23} fontWeight={"bold"}>
              Get started
            </Typo>
          </Button>
        </View>
      </View>
    </ScreenWrapper>
  );
};
export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: spacingX._20,
    marginVertical: spacingY._10,
  },
  backgroud: {
    flex: 1,
    backgroundColor: colors.neutral900,
  },
  welcomeImage: {
    height: verticalScale(300),
    aspectRatio: 1,
    alignSelf: "center",
  },
});
