import React, { useState, useEffect, useRef } from "react";
import { useRouter, router } from "expo-router";
import { TouchableOpacity, View, Text, TextInput, Image, StyleSheet, Keyboard, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { icons } from "../../constants/index.js";
import { Colors } from "../../styles/index.js";
import useStore from "../../store/index.js";

const SignIn = ({}) => {
  const router = useRouter();
  const { user } = useStore();

  const [passcode, setPasscode] = useState(Array(4).fill(""));
  const [passcodeError, setPasscodeError] = useState("");

  const passcodeRefs = useRef([]);

  const handleInputChange = (
    value,
    index,
    setState,
    refsArray,
    nextRefArray
  ) => {
    setState((prevState) => {
      const updatedPasscode = [...prevState];
      updatedPasscode[index] = value;

      // Check passcode validation after updating the last digit
      if (index === 3 && !nextRefArray) {
        const passcodeString = updatedPasscode.join("");
        const userPassCodeString = user.passcode.join("");

        if (passcodeString !== userPassCodeString) {
          setPasscodeError("Incorrect passcode. Please try again.");
        } else {
          Keyboard.dismiss();
          router.push("/home");
        }
      }

      return updatedPasscode;
    });

    if (value) setPasscodeError("");

    if (value && index < 3) {
      refsArray.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index, setState, refsArray) => {
    if (e.nativeEvent.key === "Backspace") {
      setState((prevState) => {
        const updatedPasscode = [...prevState];

        if (updatedPasscode[index] === "") {
          // Move to the previous input field if it's empty and backspace is pressed
          if (index > 0) {
            refsArray.current[index - 1].focus();
          }
        } else {
          // Clear the current input field on first backspace press
          updatedPasscode[index] = "";
        }

        return updatedPasscode;
      });
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableOpacity
            style={styles.backArrowContainer}
            onPress={() => router.back()}
          >
            <Image source={icons.leftArrow} style={styles.leftArrow} />
          </TouchableOpacity>

          <Text style={styles.headerText}>Welcome back</Text>

          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.topContainer}>
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { marginBottom: 4 }]}>
                  Enter your 4-Digit Passcode{" "}
                  <Text style={styles.required}>*</Text>
                </Text>
                <Text style={[styles.subText, { marginBottom: 12 }]}>
                  Just checking it's really you!
                </Text>
                <View style={styles.passcodeContainer}>
                  {passcode.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={(el) => (passcodeRefs.current[index] = el)}
                      style={[styles.input, styles.inputText]}
                      value={digit ? "X" : ""}
                      onChangeText={(value) =>
                        handleInputChange(
                          value,
                          index,
                          setPasscode,
                          passcodeRefs
                        )
                      }
                      onKeyPress={(e) =>
                        handleKeyPress(e, index, setPasscode, passcodeRefs)
                      }
                      maxLength={1}
                      keyboardType="number-pad"
                      secureTextEntry={false}
                      returnKeyType="next"
                      onSubmitEditing={() =>
                        index < 3 && passcodeRefs.current[index + 1].focus()
                      }
                    />
                  ))}
                </View>
                {passcodeError ? (
                  <Text style={styles.errorText}>Incorrect OTP</Text>
                ) : null}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    width: "100%",
  },
  topContainer: {
    paddingHorizontal: 20,
    width: "100%",
    height: 412,
  },
  backArrowContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: 80,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  leftArrow: {
    height: 24,
    width: 24,
    padding: "36px, 0px, 20px, 0px",
  },
  headerText: {
    fontFamily: "Rubrik-Medium",
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 32,
    color: Colors.textPrimary,
    lineHeight: 25,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 32,
  },
  label: {
    fontFamily: "Rubrik-Regular",
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 25,
    marginBottom: 12,
  },
  required: {
    fontFamily: "Rubrik-Regular",
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 25,
    color: Colors.tertiary,
  },
  subText: {
    fontFamily: "Rubrik-Regular",
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  passcodeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: Colors.inputBackground,
    width: 72,
    height: 52,
    padding: 10,
    borderRadius: 8,
    borderWidth: 0,
    borderColor: "transparent",
    border: "none",
    fontSize: 16,
    marginBottom: 4,
    boxShadow: "2px 2px 2px 0px rgba(166, 171, 189, 0.2) inset",
    textAlign: "center",
    textAlignVertical: "center",
  },
  inputText: {
    fontFamily: "Rubrik-Medium",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.2,
    alignItems: "center",
    color: Colors.textPrimary,
  },
  passcodeInput: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    width: 60,
    height: 60,
    fontSize: 24,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
  },
});

export default SignIn;
