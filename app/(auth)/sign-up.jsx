import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import { icons } from "../../constants/index.js";
import MtButton from "../../components/common/MtButton.jsx";
import PasscodeScreen from "./passcode.jsx";
import { Colors } from "../../styles/index.js";
import { validateExistingEmail } from "../../services/index.js";

const CreateAccountScreen = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    nickname: "",
    email: "",
  });
  const [redirectToPasscodeScreen, setRedirectToPasscodeScreen] =
    useState(false);

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", nickname: "", email: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    } else if (name.length > 25) {
      newErrors.name = "Name cannot be longer than 25 characters";
      valid = false;
    }

    if (!/^[a-zA-Z]+$/.test(nickname)) {
      newErrors.nickname = "Nickname cannot include symbols and numbers";
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (setter, value, field) => {
    setter(value);
    const newErrors = { ...errors };
    if (field === "name") {
      if (!value.trim()) {
        newErrors.name = "Name is required";
      } else if (value.length > 25) {
        newErrors.name = "Name cannot be longer than 25 characters";
      } else {
        newErrors.name = "";
      }
    } else if (field === "nickname") {
      if (!/^[a-zA-Z]+$/.test(value)) {
        newErrors.nickname = "Nickname cannot include symbols and numbers";
      } else {
        newErrors.nickname = "";
      }
    } else if (field === "email") {
      if (!value.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "Email address is invalid";
      } else {
        newErrors.email = "";
      }
    }
    setErrors(newErrors);
  };


  const handleSubmit = () => {
    if (validate()) {
      if (!validateExistingEmail(email)) {
        alert("Email already exists");
      } else {
        setRedirectToPasscodeScreen(true);
      }
    }
  };

  const isFormValid = !errors.name && !errors.nickname && !errors.email;

  return (
    <>
      {!redirectToPasscodeScreen ? (
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

            <Text style={styles.headerText}>Create Account</Text>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.topContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    Name<Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={(text) => handleChange(setName, text, "name")}
                    placeholder=""
                  />
                  {errors.name ? (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  ) : null}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Nickname</Text>
                  <TextInput
                    style={styles.input}
                    value={nickname}
                    onChangeText={(text) =>
                      handleChange(setNickname, text, "nickname")
                    }
                    placeholder=""
                  />
                  {errors.nickname ? (
                    <Text style={styles.errorText}>{errors.nickname}</Text>
                  ) : null}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    Email Address<Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) =>
                      handleChange(setEmail, text, "email")
                    }
                    placeholder=""
                    keyboardType="email-address"
                  />
                  {errors.email ? (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  ) : null}
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

          <View style={styles.bottomContainer}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                style={styles.checkbox}
                value={isAgreed}
                onValueChange={setIsAgreed}
                color={isAgreed ? Colors.selection : undefined}
              />
              <Text style={styles.checkboxLabel}>
                Tick this box to confirm you are at least 18 years old and agree
                to our{" "}
                <Text style={isAgreed && styles.link}>terms & conditions</Text>
              </Text>
            </View>

            <MtButton
              title="Continue"
              textColor={Colors.textSecondary}
              marginTop={18}
              style={styles.button}
              onPress={handleSubmit}
              disabled={!isAgreed || !isFormValid}
            />
          </View>
        </SafeAreaView>
      ) : (
        <PasscodeScreen
          userName={name.trim()}
          email={email.trim()}
          nickname={nickname.trim()}
          setRedirectToPasscodeScreen={(val) =>
            setRedirectToPasscodeScreen(val)
          }
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  topContainer: {
    paddingHorizontal: 20,
  },
  headerText: {
    fontFamily: "Rubrik-Medium",
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 32,
    color: Colors.textPrimary,
    lineHeight: 28.01,
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
  input: {
    backgroundColor: Colors.inputBackground,
    padding: 10,
    borderRadius: 5,
    borderWidth: 0,
    borderColor: "transparent",
    border: "none",
    fontSize: 16,
    marginBottom: 4,
    boxShadow: "2px 2px 2px 0px rgba(166, 171, 189, 0.2) inset",
  },
  errorText: {
    fontFamily: "Rubrik-Regular",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 17,
    color: Colors.error,
    marginLeft: 14,
  },
  bottomContainer: {
    width: "100%",
    height: 146,
    backgroundColor: Colors.inputBackground,
    padding: 20,
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  checkboxLabel: {
    width: 296,
    height: 34,
    marginLeft: 10,
    fontSize: 14,
    color: Colors.textPrimary,
    flexWrap: "wrap",
  },
  link: {
    color: Colors.link,
  },
});

export default CreateAccountScreen;
