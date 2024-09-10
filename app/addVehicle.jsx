import React, { useState } from "react";
import { router } from "expo-router";
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Colors } from "../styles/index.js";
import { constant } from "../constants/index.js";
import AntDesign from "@expo/vector-icons/AntDesign";
import MtImagePicker from "../components/common/MtImagePicker.jsx";
import MtInputs from "../components/common/MtInputs.jsx";
import MtDropdown from "../components/common/MtDropdown.jsx";
import MtButton from "../components/common/MtButton.jsx";
import useStore from "../store/index.js";
import { VehicleServices } from "../services/index.js";

const AddVehicle = () => {
  const { setUser, user, setVehicle } = useStore();

  const [vehicleName, setVehicleName] = useState("");
  const [engineCapacity, setEngineCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNameError, setVehicleNameError] = useState("");
  const [engineCapacityError, setEngineCapacityError] = useState("");
  const [imageURI, setImageURI] = useState(null);

  const handleCancel = () => {
    router.back();
  };

  const handleAdd = () => {
    if (
      VehicleServices.validateFields(
        vehicleName,
        engineCapacity,
        setVehicleNameError,
        setEngineCapacityError
      )
    ) {
      let payload = {
        user: user,
        vehicleName: vehicleName,
        engineCapacity: engineCapacity,
        vehicleType: vehicleType?.name,
        imageURI: imageURI,
      };
      const updatedUser = VehicleServices.addVehicle(payload);
      console.log("Dewa1 addVehicle updatedUser", JSON.stringify(updatedUser));
      setUser(updatedUser?.user);
      setVehicle(updatedUser?.vehicle);
      router.push("/vehicles");
    }
  };

  const handleImageChange = (image) => {
    setImageURI(image);
  };
  const handleVehicleNameChange = (text) => {
    setVehicleName(text);
    VehicleServices.validateFields(
      text,
      engineCapacity,
      setVehicleNameError,
      setEngineCapacityError
    );
  };

  const handleEngineCapacityChange = (text) => {
    setEngineCapacity(text);
    VehicleServices.validateFields(
      vehicleName,
      text,
      setVehicleNameError,
      setEngineCapacityError
    );
  };

  const handleVehicleTypeChange = (text) => {
    setVehicleType(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Top container with back button */}
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={styles.backArrowContainer}
            onPress={handleCancel}
          >
            <AntDesign
              name="arrowleft"
              size={24}
              color={Colors.secondaryBackground}
              style={styles.leftArrow}
            />
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Add Vehicle</Text>
        </View>

        {/* Image picker */}
        <View style={styles.imgContainer}>
          <MtImagePicker image={imageURI} onChange={handleImageChange} />
        </View>

        {/* Vehicle Name Input */}
        <View style={styles.inputTopContainer}>
          <MtInputs
            label="Vehicle Name"
            value={vehicleName}
            onChangeText={handleVehicleNameChange}
            error={vehicleNameError}
          />
          {vehicleNameError ? (
            <Text style={styles.errorText}>{vehicleNameError}</Text>
          ) : null}
        </View>

        {/* Engine Capacity Input */}
        <View style={styles.inputBottomContainer}>
          <MtInputs
            label="Engine Capacity"
            value={engineCapacity}
            onChangeText={handleEngineCapacityChange}
            error={engineCapacityError}
          />
          {engineCapacityError ? (
            <Text style={styles.errorText}>{engineCapacityError}</Text>
          ) : null}
        </View>

        {/* Vehicle Type Dropdown */}
        <View style={styles.dropdownContainer}>
          <MtDropdown
            showLabel
            label="Vehicle Type"
            placeholder="Select vehicle type"
            onChange={handleVehicleTypeChange}
            value={vehicleType}
            width={324}
            dropdownHeight={52}
            dropdownBackgroundColor={Colors.inputBackground}
            dataList={constant.vehicleType}
            dropdownTextSize={16}
            dropdownMarginTop={0}
            menuHeight={170}
            isSearchable={false}
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <View style={styles.leftButton}>
            <MtButton
              title="Cancel"
              marginTop={18}
              style={styles.button}
              onPress={handleCancel}
              width={158}
              backgroundColor="transparent"
              borderWidth={1}
              textColor={Colors.textPrimary}
            />
          </View>

          <View style={styles.rightButton}>
            <MtButton
              title="Add"
              textColor={Colors.textSecondary}
              marginTop={18}
              style={styles.button}
              onPress={handleAdd}
              width={158}
              disabled={!vehicleName || !engineCapacity || !vehicleType}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryBackground,
  },
  topContainer: {
    width: "100%",
    height: 78,
    backgroundColor: "rgba(245, 88, 88, 1)",
    paddingHorizontal: 18,
  },
  backArrowContainer: {
    justifyContent: "center",
    width: "100%",
    marginTop: 36,
  },
  headerContainer: {
    alignSelf: "center",
    marginTop: 6,
    marginBottom: 36,
  },
  headerText: {
    fontFamily: "Rubrik-Medium",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 25,
    color: Colors.textPrimary,
  },
  imgContainer: {
    width: "100%",
    height: 120,
    marginBottom: 4,
  },
  inputTopContainer: {
    marginTop: 20,
    width: 324,
    alignSelf: "center",
  },
  dropdownContainer: {
    position: "relative",
    marginTop: 20,
    width: 324,
    alignSelf: "center",
  },
  inputBottomContainer: {
    marginTop: 20,
    width: 324,
    alignSelf: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 324,
    alignSelf: "center",
    paddingBottom: 28,
    position: "absolute",
    bottom: 0,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default AddVehicle;
