import React, { useState, useEffect, useRef } from "react";
import { useRouter, router } from "expo-router";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Keyboard,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { icons } from "../../constants/index.js";
import { Colors } from "../../styles/index.js";
import MtButton from "../../components/common/MtButton.jsx";
import { UserServices } from "../../services/index.js";
import useStore from "../../store/index.js";

const PasscodeScreen = ({
  setRedirectToPasscodeScreen,
  userName,
  nickname,
  email,
}) => {
  const router = useRouter();
  const { setUser } = useStore();

  const [passcode, setPasscode] = useState(Array(4).fill(""));
  const [confirmPasscode, setConfirmPasscode] = useState(Array(4).fill(""));
  const [passcodeError, setPasscodeError] = useState("");
  const [confirmPasscodeError, setConfirmPasscodeError] = useState("");

  const passcodeRefs = useRef([]);
  const confirmPasscodeRefs = useRef([]);

  useEffect(() => {
    return () => setRedirectToPasscodeScreen(false);
  }, []);

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
      return updatedPasscode;
    });

    // Clear error when input is modified
    if (value) {
      setPasscodeError("");
      setConfirmPasscodeError("");
    }

    // Move to the next input field if a digit is entered
    if (value && index < 3) {
      refsArray.current[index + 1].focus();
    } else if (value && index === 3 && nextRefArray) {
      // If the last passcode digit is entered, move focus to the first confirm passcode input
      nextRefArray.current[0].focus();
    } else if (value && index === 3 && !nextRefArray) {
      // If the last confirm passcode digit is entered, dismiss the keyboard
      Keyboard.dismiss();
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

  const handleSubmit = async () => {
    const passcodeString = passcode.join("");
    const confirmPasscodeString = confirmPasscode.join("");

    if (passcodeString.length < 4) {
      setPasscodeError("Passcode must be 4 digits.");
    } else if (confirmPasscodeString.length < 4) {
      setConfirmPasscodeError("Confirm passcode must be 4 digits.");
    } else if (passcodeString !== confirmPasscodeString) {
      setConfirmPasscodeError("Passcodes do not match.");
    } else {
      const newUser = {
        userName,
        email: email.toLowerCase(),
        nickname,
        passcode,
        vehicles: {},
      };
      const upadtedUser = await UserServices.addUser(newUser);
      setUser(upadtedUser);

      router.replace("/home");
    }
  };

  const handleSkip = async () => {
    const newUser = {
      userName,
      email: email.toLowerCase(),
      nickname,
      vehicles: {},
    };
    const upadtedUser = await UserServices.addUser(newUser);
    setUser(upadtedUser);
    router.replace("/home");
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

          <Text style={styles.headerText}>Set a Passcode</Text>

          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.topContainer}>
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { marginBottom: 4 }]}>
                  Enter a 4-Digit Passcode{" "}
                  <Text style={styles.required}>*</Text>
                </Text>
                <Text style={[styles.subText, { marginBottom: 12 }]}>
                  You will need to enter it every app launch
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
                          passcodeRefs,
                          confirmPasscodeRefs
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
                  <Text style={styles.errorText}>{passcodeError}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Confirm Passcode <Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.passcodeContainer}>
                  {confirmPasscode.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={(el) => (confirmPasscodeRefs.current[index] = el)}
                      style={[styles.input, styles.inputText]}
                      value={digit ? "X" : ""}
                      onChangeText={(value) =>
                        handleInputChange(
                          value,
                          index,
                          setConfirmPasscode,
                          confirmPasscodeRefs
                        )
                      }
                      onKeyPress={(e) =>
                        handleKeyPress(
                          e,
                          index,
                          setConfirmPasscode,
                          confirmPasscodeRefs
                        )
                      }
                      maxLength={1}
                      keyboardType="number-pad"
                      secureTextEntry={false}
                      returnKeyType="next"
                      onSubmitEditing={() =>
                        index < 3 &&
                        confirmPasscodeRefs.current[index + 1].focus()
                      }
                    />
                  ))}
                </View>
                {confirmPasscodeError ? (
                  <Text style={styles.errorText}>{confirmPasscodeError}</Text>
                ) : null}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <View style={styles.buttonContainer}>
          <MtButton
            title="Continue"
            textColor={Colors.textSecondary}
            marginTop={18}
            style={styles.button}
            onPress={handleSubmit}
          />

          <MtButton
            title="Skip"
            backgroundColor="transparent"
            textColor={Colors.textPrimary}
            marginTop={18}
            marginBottom={28}
            style={styles.skipText}
            onPress={handleSkip}
          />
        </View>
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
  buttonContainer: {
    position: "fixed",
    bottom: 0,
    alignItems: "center",
    paddingBottom: 28,
  },
  continueButton: {
    backgroundColor: "#003366",
    paddingVertical: 15,
    borderRadius: 8,
  },
  skipText: {
    fontSize: 16,
    color: "#003366",
    textAlign: "center",
  },
});

export default PasscodeScreen;
