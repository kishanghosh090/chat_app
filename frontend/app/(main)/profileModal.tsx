import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWraper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";

const profileModal = () => {
  return (
    <ScreenWrapper isModal={true}>
      <View style={styles.container}>
        <Header
          title="Edit Profile"
          leftIcon={
            Platform.OS === "android" && (
              <BackButton color={colors.neutral900} />
            )
          }
          rightIcon={null}
          style={{ marginVertical: spacingY._15 }}
        />
        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.avatar}>
            
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default profileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral200,
    marginBottom: spacingY._10,
    borderTopWidth: 1,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.neutral500,
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    padding: spacingY._7,
  },
  inputContainer: {
    gap: spacingY._7,
  },
});
