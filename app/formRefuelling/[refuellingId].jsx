import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../../styles/index.js";
import MtDropdown from "../../components/common/MtDropdown.jsx";
import useStore from "../../store/index.js";
import MtDatePicker from "../../components/common/MtDatePicker.jsx";
import MtButton from "../../components/common/MtButton.jsx";
import MtInputs from "../../components/common/MtInputs.jsx";
import { RefuellingServices } from "../../services/index.js";
import * as Crypto from "expo-crypto";
import Helpers from "../../utils/helpers.js";

const FormRefueling = () => {
  const { user, setUser, vehicle, setVehicle, refuelling, setRefuelling } =
    useStore();
  const { refuellingId } = useLocalSearchParams();

  
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [refuellingDate, setrefuellingDate] = useState(new Date());
  const [startReading, setStartReading] = useState("");
  const [endReading, setEndReading] = useState("");
  const [consumed, setConsumed] = useState("");
  const [price, setPrice] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    setSelectedVehicle(vehicle ? { ...vehicle, name: vehicle?.vehicleName } : null);
  }, [vehicle]);

  const vehicles = user?.vehicles ? Object.values(user?.vehicles) : [];

  // Preparing the data for MtDropdown
  const dataList = vehicles.map((vehicle) => ({
    ...vehicle,
    id: vehicle.vehicle_id,
    name: vehicle.vehicleName,
  }));

  const handleCancel = () => {
    router.back();
  };

  const handleAddRefuelling = () => {
    setFormSubmitted(true);
    if (
      selectedVehicle &&
      refuellingDate &&
      startReading &&
      endReading &&
      consumed &&
      price &&
      Number(endReading.trim()) > Number(startReading.trim()) &&
      Helpers.validateOdometerReading(selectedVehicle, startReading)
    ) {
      const payload = {
        refuelling_id: Crypto.randomUUID(),
        user: user,
        vehicle: vehicle,
        vehicle_id: selectedVehicle.id,
        refuellingDate: refuellingDate,
        startReading: startReading,
        endReading: endReading,
        consumed: consumed,
        price: price,
        createdAt: new Date(),
      };
      const updateUser = RefuellingServices.addRefuelling(payload);

      setUser(updateUser?.user);
      setVehicle(updateUser?.vehicle);
      setRefuelling(updateUser?.refuelling);
      router.push("/refuelling");
    }
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
          <Text style={styles.headerText}>Add Refuelling Record</Text>
        </View>

        <View style={styles.fullScreenOverlay}>
          <MtDropdown
            placeholder="Select a vehicle"
            label="Vehicle Name"
            isSearchable
            value={selectedVehicle}
            onChange={(value) => {
              setSelectedVehicle(value);
              setVehicle(value);
            }}
            width={324}
            dropdownHeight={52}
            dropdownBackgroundColor={Colors.inputBackground}
            dataList={dataList}
            dropdownTextSize={16}
            menuHeight={170}
          />
        </View>

        <View style={styles.datePickerContainer}>
          <MtDatePicker
            value={refuellingDate}
            onChange={(date) => {
              setrefuellingDate(date);
            }}
          />
        </View>

        <View style={styles.odometerContainer}>
          <Text style={styles.label}>Odometer</Text>
          <View style={styles.odometerInputContainer}>
            <MtInputs
              label="Start reading"
              placeholder="Start reading"
              value={startReading}
              onChangeText={(text) => {
                setStartReading(text.trim());
              }}
              width={158}
              keyboardType="numeric"
              borderColor={
                formSubmitted && !startReading ? "red" : "transparent"
              }
            />
            <MtInputs
              label="End reading"
              placeholder="End reading"
              value={endReading}
              onChangeText={(text) => {
                setEndReading(text.trim());
              }}
              width={158}
              keyboardType="numeric"
              borderColor={
                formSubmitted &&
                (!endReading.trim() ||
                  Number(endReading.trim()) <= Number(startReading.trim()))
                  ? "red"
                  : "transparent"
              }
            />
          </View>
        </View>

        <View
          style={[
            styles.odometerContainer,
            { marginTop: 20, marginBottom: 241 },
          ]}
        >
          <Text style={styles.label}>Fuel</Text>
          <View style={styles.odometerInputContainer}>
            <MtInputs
              label="Consumed (in L)"
              placeholder="Consumed (in L)"
              value={consumed}
              onChangeText={(text) => {
                setConsumed(text.trim());
              }}
              width={158}
              keyboardType="numeric"
              borderColor={
                formSubmitted && !consumed.trim() ? "red" : "transparent"
              }
            />
            <MtInputs
              label="Price (in S$)"
              placeholder="Price (in S$)"
              value={price}
              onChangeText={(text) => {
                setPrice(text.trim());
              }}
              width={158}
              keyboardType="numeric"
              borderColor={
                formSubmitted && !price.trim() ? "red" : "transparent"
              }
            />
          </View>
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
              onPress={handleAddRefuelling}
              width={158}
              disabled={
                formSubmitted &&
                (!selectedVehicle ||
                  !refuellingDate ||
                  !startReading ||
                  !endReading ||
                  !consumed ||
                  !price)
              }
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
  fullScreenOverlay: {
    position: "absolute",
    top: 139,
    left: 0,
    right: 0,
    zIndex: 900,
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerContainer: {
    alignSelf: "center",
    marginTop: 72,
    height: 52,
    width: 324,
    marginBottom: 20,
  },
  odometerContainer: {
    alignSelf: "center",
    width: 324,
    height: 76,
  },
  label: {
    fontFamily: "Rubrik-Regular",
    fontWeight: "400",
    color: Colors.textPrimary,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  odometerInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: Colors.secondaryBackground,
    borderRadius: 8,
    height: 52,
  },
  odometerInput: {
    fontFamily: "Rubrik-Regular",
    fontWeight: "400",
    color: Colors.textPrimary,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.2,
    width: 158,
    height: 52,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 324,
    height: 96,
    alignSelf: "center",
    paddingBottom: 28,
  },
});

export default FormRefueling;
