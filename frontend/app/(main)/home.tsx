import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWraper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/context/authContext";
import { testSocket } from "@/socket/socketEvents";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import * as Icons from "phosphor-react-native";
import { useRouter } from "expo-router";


const home = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
  };
  // const testSocketHandler = (data: any) => {
  //   console.log("got res from socker", data);
  // };
  // useEffect(() => {
  //   testSocket(testSocketHandler, false);
  //   testSocket("testSocketHandler", false);
  //   return () => {
  //     testSocket(null, true);
  //   };
  // }, []);
  return (
    <ScreenWrapper showPattern={true} style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Typo
            style={styles.header}
            color={colors.neutral200}
            size={19}
            textProps={{ numberOfLines: 1 }}
          >
            Welcome,{" "}
            <Typo color={colors.neutral200} fontWeight={"800"}>
              {" "}
            </Typo>
          </Typo>
          <TouchableOpacity
            style={styles.settingIcon}
            onPress={() => router.push("/(main)/profileModal")}
          >
            <Icons.GearSixIcon
              size={verticalScale(22)}
              color={colors.white}
              weight="fill"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>

        </View>
      </View>
    </ScreenWrapper>
  );
};
export default home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacingX._20,
    gap: spacingY._15,
    paddingTop: spacingY._15,
    paddingBottom: spacingY._20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius._50,
    borderTopRightRadius: radius._50,
    borderCurve: "continuous",
    overflow: "hidden",
    padding: spacingX._20,
  },
  navBar: {
    flexDirection: "row",
    gap: spacingX._15,
    alignItems: "center",
    paddingHorizontal: spacingX._10,
  },

  tabs: {
    flexDirection: "row",
    gap: spacingX._10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.full,
    backgroundColor: colors.neutral100,
  },
  activeTabStyle: {
    backgroundColor: colors.primaryLight,
  },
  conversationList: {
    paddingVertical: spacingY._20,
  },
  settingIcon: {
    padding: spacingY._10,
    borderRadius: radius.full,
    backgroundColor: colors.neutral700,
  },

  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,
    position: "absolute",
    bottom: verticalScale(30),
    right: verticalScale(30),
  },
});
