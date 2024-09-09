import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { Colors } from "../../styles/index.js";
import { icons, images } from "../../constants/index.js";
import MtButton from "../../components/common/MtButton.jsx";
import useStore from "../../store/index.js";
import EmptyHomeState from "../../components/common/EmptyHomeState.jsx";
import MtDropdown from "../../components/common/MtDropdown.jsx";

const Home = () => {
  const { user, vehicle, setVehicle } = useStore();
  const [selectedVehicle, setSelectedVehicle] = useState(vehicle ? { ...vehicle, name: vehicle?.vehicleName } : null);
  console.log("Dewa1 Home user", JSON.stringify(vehicle));

  useEffect(() => {
    console.log("Dewa3 Home user", JSON.stringify(vehicle));
    setSelectedVehicle(vehicle ? { ...vehicle, name: vehicle?.vehicleName } : null);
  }, [vehicle]);

  // Check if user or vehicles exist to avoid null reference issues
  const vehicles = user?.vehicles ? Object.values(user?.vehicles) : [];

  // Extracting refuellings from all vehicles
  const refuellings = vehicles?.map((vehicle) => vehicle?.refuellings).flat();

  // Preparing the data for MtDropdown
  const dataList = vehicles?.map((vehicle) => ({
    ...vehicle,
    id: vehicle.vehicle_id,
    name: vehicle.vehicleName,
  }));

  const handleOnPressUser = () => {
    router.push("/profile");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <Pressable onPress={handleOnPressUser}>
            <Image source={icons.user} style={styles.user} />
          </Pressable>
        </View>
        <View style={styles.topMiddle}>
          <Image source={icons.union} style={styles.union} />
        </View>
        <View style={styles.topRight} />
      </View>

      <View style={styles.content}>
        <Text style={styles.greeting}>
          Hi {user?.nickname?.toProperCase() || user?.userName?.toProperCase()},
        </Text>
      </View>

      {!vehicles.length && <EmptyHomeState />}

      {!!vehicles.length && (
        <>
          <View style={styles.middleBar}>
            <Text style={styles.description}>
              Here is everything about your
            </Text>
            <View style={styles.fullScreenOverlay}>
              <MtDropdown
                width={156}
                dropdownHeight={34}
                dropdownBackgroundColor={Colors.inputBackground}
                dataList={dataList}
                dropdownTextSize={14}
                menuHeight={120}
                onChange={(value) => {
                  setVehicle(value);
                  setSelectedVehicle(value);
                }}
                value={selectedVehicle}
              />
            </View>
            <Image
              source={
                vehicle?.imageURI
                  ? { uri: vehicle.imageURI }
                  : vehicle?.vehicleType === "2 Wheeler"
                  ? images?.bike
                  : images?.car
              }
              style={styles.vehicleImage}
            />
          </View>
          {!refuellings.length && (
            <View style={styles.noRefuellingContainer}>
              <View style={styles.noRefuellingImgContainer}>
                <Image
                  source={images.noIllustration}
                  style={styles.noIllustration}
                  resizeMode="contain"
                  accessible={true}
                  accessibilityLabel="Illustration of a cloud"
                />
                <View style={styles.noRefuellingSubtextContainer}>
                  <Text style={styles.noRefuellingSubtext1}>
                    It's time to add the refuelling details to get more insights
                  </Text>
                </View>
              </View>
              <View>
                <MtButton
                  title="Add Refuelling"
                  textColor={Colors.textSecondary}
                  style={styles.button}
                  iconName="arrowright"
                  iconColor={Colors.textSecondary}
                  width={161}
                  onPress={() => router.push("/formRefuelling/new")}
                />
              </View>
            </View>
          )}
          {!!refuellings.length && (
            <View>

              <View>
                <Text style={styles.label}>Fuel Insights</Text>
                <View style={styles.insightContainer}>
                  <View style={styles.insightWrapper}>
                    <View style={styles.insightInfo}></View>
                  </View>
                  <View style={styles.insightWrapper}>
                    <View style={styles.insightInfo}></View>
                  </View>
                </View>
              </View>

              <View></View>
              <View></View>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    width: "100%",
    height: 732,
    alignItems: "center",
  },
  topBar: {
    display: "flex",
    marginTop: 36,
    width: "100%",
    height: 28,
    marginBottom: 28,
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 0,
  },
  topLeft: {
    width: 110,
    height: 24,
  },
  user: {
    width: 24,
    height: 24,
  },
  topMiddle: {
    position: "absolute",
    left: "50%",
  },
  union: {
    height: 28,
    width: 28,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  greeting: {
    fontFamily: "Rubrik-Regular",
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.textTertiary,
  },

  middleBar: {
    alignItems: "center",
    marginTop: 0,
    paddingHorizontal: 20,
    marginBottom: 36,
  },
  description: {
    fontFamily: "Rubrik-Regular",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 8,
  },
  fullScreenOverlay: {
    position: "absolute",
    top: 28,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  vehicleImage: {
    marginTop: 58,
    width: 318,
    height: 178,
    backgroundColor: Colors.lightGrey,
    borderRadius: 12,
    borderWidth: 5,
    borderColor: Colors.white,
    zIndex: -1,
  },

  noRefuellingContainer: {
    flex: 1,
    alignItems: "center",
    height: 190,
    width: 324,
    // marginTop: 48,
  },
  noRefuellingImgContainer: {
    width: 124,
    height: 134,
    alignItems: "center",
  },
  noIllustration: {
    width: 124,
    height: 62,
  },
  noRefuellingSubtextContainer: {
    marginTop: 16,
    width: 300,
    height: 40,
  },
  noRefuellingSubtext1: {
    fontFamily: "Rubrik-Regular",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 20,
  },
  insightContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(240, 242, 242, 1)",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  insightWrapper: {
    height: 109,
    width: 155,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
  },
  label: {
    fontFamily: "Rubrik-Medium",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 20,
    color: Colors.textPrimary,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
});

export default Home;
