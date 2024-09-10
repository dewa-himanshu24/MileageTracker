import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { images } from "../../constants/index.js";
import MtDropdown from "../../components/common/MtDropdown.jsx";
import NoVehicleContainer from "../../components/common/NoVehicleContainer.jsx";
import { Colors } from "../../styles/index.js";
import useStore from "../../store/index.js";
import RefuelingPriceBarChart from "../../components/common/RefuelingPriceBarChart.jsx";
import MileageLineChart from "../../components/common/MileageLineChart.jsx";

const Performance = () => {
  const { user, setUser, vehicle, setVehicle, refuellings, setRefuellings } =
    useStore();

  console.log("Dewa Performance refuellings", JSON.stringify(refuellings));
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setSelectedVehicle(
      vehicle ? { ...vehicle, name: vehicle.vehicleName } : null
    );
  }, [vehicle]);

  const vehicles = user?.vehicles ? Object.values(user?.vehicles) : [];

  const dataList = vehicles?.map((vehicle) => ({
    ...vehicle,
    id: vehicle.vehicle_id,
    name: vehicle.vehicleName,
  }));

  const handleSelectVehicle = (value) => {
    setVehicle(value);
    setSelectedVehicle(value);
    setRefuellings(value.refuellings);
  };

  const handleDropdownToggle = (isOpen) => {
    setDropdownOpen(isOpen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Performance</Text>
      </View>

      {!vehicles?.length && (
        <View style={styles.noVehicleContainer}>
          <NoVehicleContainer />
        </View>
      )}

      {!!vehicles?.length && (
        <>
          <View style={styles.selectContainer}>
            <Text style={styles.selectText}>Choose the vehicle</Text>

            <MtDropdown
              value={selectedVehicle}
              onChange={handleSelectVehicle}
              placeholder={"Select vehicle"}
              width={150}
              dropdownHeight={34}
              dropdownBackgroundColor={Colors.inputBackground}
              dataList={dataList}
              dropdownTextSize={14}
              onOpen={() => handleDropdownToggle(true)}
              onClose={() => handleDropdownToggle(false)}
              style={dropdownOpen ? { zIndex: 1000 } : { zIndex: 1 }}
              menuHeight={170}
            />
          </View>

          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContentContainer}
            pointerEvents={dropdownOpen ? "none" : "auto"}
          >
            <View style={styles.bodyContainer}>
              <Image
                source={
                  vehicle?.imageURI
                    ? { uri: vehicle.imageURI }
                    : vehicle?.vehicleType === "2 Wheeler"
                    ? images?.bike
                    : images?.car
                }
                style={styles.vehicleImage}
                accessibilityLabel="Vehicle Image"
                // resizeMode="contain"
              />

              <View style={styles.analyticContainer}>
                <Text style={styles.selectText}>Money spent on fuel</Text>
                {/* <View style={styles.analytic}> */}
                <RefuelingPriceBarChart />
                {/* </View> */}
              </View>

              <View style={[styles.analyticContainer, { marginBottom: 36 }]}>
                <Text style={styles.selectText}>
                  Vehicle mileage performance
                </Text>
                {/* <View style={styles.analytic}> */}
                <MileageLineChart />
                {/* </View> */}
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryBackground,
  },

  // Header
  headerContainer: {
    width: "100%",
    paddingTop: 32,
    paddingHorizontal: 0,
    paddingBottom: 20,
    borderBottomColor: "rgba(206, 216, 222, 1)",
    borderBottomWidth: 1,
    position: "relative",
    height: 84,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  // No vehicle
  noVehicleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Dropdown Container
  selectContainer: {
    marginTop: 12,
    marginBottom: 16,
    alignItems: "center",
    height: 62,
    zIndex: 1000,
  },

  // ScrollView and its content
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  scrollContentContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },

  // Body
  bodyContainer: {
    width: "100%",
    alignItems: "center",
  },
  vehicleImage: {
    // marginTop: 58,
    width: 318,
    height: 178,
    backgroundColor: Colors.lightGrey,
    borderRadius: 12,
    borderWidth: 5,
    borderColor: Colors.white,
    zIndex: -1,
  },

  analyticContainer: {
    height: 217,
    marginTop: 36,
    paddingHorizontal: 20,
  },

  analytic: {
    width: "100%",
    height: 185,
    backgroundColor: Colors.white,
    marginTop: 12,
    borderRadius: 8,
  },

  selectText: {
    fontFamily: "Rubrik-Regular",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
});

export default Performance;
