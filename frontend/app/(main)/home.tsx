import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWraper";
import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";
import { useAuth } from "@/context/authContext";
import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

const home = () => {
  const { user, signOut } = useAuth();
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <ScreenWrapper>
      <Typo color={colors.white}>Home</Typo>
      <Button onPress={handleLogout}>
        <Typo>logout</Typo>
      </Button>
    </ScreenWrapper>
  );
};
export default home;
const styles = StyleSheet.create({});
