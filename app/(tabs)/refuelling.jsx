import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { router } from "expo-router";
import { images } from "../../constants/index.js";
import MtButton from "../../components/common/MtButton.jsx";
import { Colors } from "../../styles/index.js";
import MtDropdown from "../../components/common/MtDropdown.jsx";
import NoVehicleContainer from "../../components/common/NoVehicleContainer.jsx";
import useStore from "../../store/index.js";
import Helpers from "../../utils/helpers.js";
import FuelCard from "../../components/common/FuelCard.jsx";

const Refuelling = () => {
  const { vehicle, setVehicle, user, refuelling, refuellings, setRefuellings } =
    useStore();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setSelectedVehicle(
      vehicle ? { ...vehicle, name: vehicle.vehicleName } : null
    );
  }, [vehicle, refuellings]);

  const vehicles = user?.vehicles ? Object.values(user?.vehicles) : [];
  console.log("Dewa Refuelling vehicles", vehicles);
  const dataList = vehicles?.map((vehicle) => ({
    ...vehicle,
    id: vehicle.vehicle_id,
    name: vehicle.vehicleName,
  }));

  const handleAddRefuelingPress = () => {
    router.push("/formRefuelling/new");
  };

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
      <View
        style={[
          styles.headerContainer,
          { height: !!vehicles?.length ? 148 : 84, zIndex: 300 },
        ]}
      >
        <Text style={styles.header}>Refuelling</Text>
        {!!vehicles.length && (
          <View
            style={{
              zIndex: 10,
            }}
          >
            <MtDropdown
              placeholder="Select a vehicle"
              isSearchable
              value={selectedVehicle}
              onChange={handleSelectVehicle}
              dropdownTextSize={14}
              dataList={dataList}
              menuHeight={170}
              onOpen={() => handleDropdownToggle(true)}
              onClose={() => handleDropdownToggle(false)}
              style={dropdownOpen ? { zIndex: 1000 } : { zIndex: 1 }}
            />
          </View>
        )}
      </View>

      {/* If theres is no vehicle and no refueling */}
      {!vehicles?.length && (
        <View style={styles.noVehicleContainer}>
          <NoVehicleContainer />
        </View>
      )}

      {!!vehicles?.length && (
        <>
          <View
            style={[
              styles.bodyContainer,
              { flex: !refuellings?.length ? 1 : 0 },
            ]}
          >
            {/* If theres is vehicle and no refueling */}
            {!!vehicles?.length && !refuellings?.length && (
              <View style={styles.noRefuellingContainer}>
                <View style={styles.noRefuellingImgContainer}>
                  <Image
                    source={images.noIllustration}
                    style={styles.noIllustration}
                    resizeMode="contain"
                    accessible={true}
                    accessibilityLabel="Illustration of a cloud"
                  />
                </View>
                <View style={styles.noRefuellingSubtextContainer}>
                  <Text style={styles.noRefuellingSubtext1}>
                    No refuelling records yet!
                  </Text>
                  <Text style={styles.noRefuellingSubtext2}>
                    Add a record using the + button below to begin your
                    wealthcare journey
                  </Text>
                </View>
              </View>
            )}

            {/* If there is a vehicle and refueling */}
            {!!vehicles?.length && !!refuellings?.length && (
              <View style={styles.refuellingContainer}>
                {/* <View style={styles.subScreenOverlay}>
                  <MtDropdown
                    width={156}
                    dropdownHeight={34}
                    dropdownBackgroundColor={Colors.inputBackground}
                    dataList={vehicles}
                    dropdownTextSize={14}
                  />
                </View> */}
                <View style={styles.subTextContainer}>
                  <Text style={styles.subText}>
                    {refuellings?.length} Records |{" "}
                    {Helpers.formatDate(new Date())} - Today
                  </Text>
                </View>
                <View style={styles.listContainer}>
                  <FlatList
                    data={refuellings}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <FuelCard item={item} />}
                    style={{ flex: 1 }}
                    scrollEnabled={true}
                    contentContainerStyle={{ paddingBottom: 10 }}
                  />
                </View>
              </View>
            )}
          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.footerButton}>
              <MtButton
                textColor={Colors.textSecondary}
                onPress={handleAddRefuelingPress}
                iconName="plus"
                iconSize={24}
                iconColor={Colors.textSecondary}
                width={48}
                borderRadius={28}
                iconMarginLeft={0}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryBackground,
    width: "100%",
    height: 732,
    alignItems: "center",
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
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  // Body
  bodyContainer: {
    position: "relative",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownContainer: {
    alignSelf: "center",
    marginTop: 12,
  },

  // No vehicle
  noVehicleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  //  No refuelling
  noRefuellingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    width: 324,
    position: "relative",
  },
  noIllustration: {
    width: 124,
    height: 62,
  },
  noRefuellingImgContainer: {
    width: 324,
    height: 94,
    alignItems: "center",
  },
  noRefuellingSubtextContainer: {
    width: 270,
    height: 56,
  },
  noRefuellingSubtext1: {
    fontFamily: "Rubrik-Regular",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 4,
  },
  noRefuellingSubtext2: {
    fontFamily: "Rubrik-Regular",
    fontWeight: "400",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 17,
    color: "rgba(157, 177, 188, 1)",
  },
  refuellingContainer: {
    position: "relative",
    zIndex: 0,
  },
  subScreenOverlay: {
    position: "absolute",
    top: 16,
    left: 0,
    right: 0,
    bottom: 0,
    // justifyContent: "center",
    alignItems: "center",
  },
  subTextContainer: {
    width: 324,
    height: 17,
    marginTop: 72,
    alignSelf: "center",
  },
  subText: {
    fontFamily: "Rubrik-Regular",
    fontSize: 12,
    alignSelf: "center",
    lineHeight: 17,
    color: "rgba(88, 121, 140, 1)",
    zIndex: -1100,
  },
  listContainer: {
    width: "100%",
    height: 364,
    marginTop: 20,
    paddingHorizontal: 18,
    zIndex: -1000,
  },

  // Footer
  footerContainer: {
    height: 121,
    width: 324,
    paddingHorizontal: 20,
    marginLeft: 500,
    position: "absolute",
    bottom: 0,
  },
  footerButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default Refuelling;
