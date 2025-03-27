import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import CustomInput from "@/components/Input";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";

const PasswordReset = () => {
  // Router
  const router = useRouter();
  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.headerText}>
            Password Reset
          </ThemedText>
          <ThemedText type="default">
            Carefully enter your new password twice.
          </ThemedText>
        </View>

        <View>
          <CustomInput label="Password" type="visible-password" />
          <CustomInput label="Confirm Password" type="visible-password" />
          <CustomButton
            text="Reset Password"
            type="secondary"
            onPress={() => {
              router.push("/reset-password/password-reset/success");
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: "relative",
    height: "100%",
    flex: 1,

    backgroundColor: "white",
  },

  container: {
    flex: 1,
    padding: 32,
  },

  header: {
    width: 234,
    marginBottom: 32,
  },

  headerText: {
    marginBottom: 6,
  },

  alternative: {
    paddingBlock: 24,
    borderTopColor: "#000",
    borderBottomColor: "#000",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBlock: 32,
  },

  altText: {
    fontFamily: "PoppinsThin",
    textAlign: "center",
    marginBottom: 23,
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 16,
  },

  altNav: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },

  altNav2: {
    marginBottom: 100,
  },
});

export default PasswordReset;
