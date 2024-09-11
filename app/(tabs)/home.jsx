import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../styles/index.js";
import { icons, images } from "../../constants/index.js";
import MtButton from "../../components/common/MtButton.jsx";
import useStore from "../../store/index.js";
import EmptyHomeState from "../../components/common/EmptyHomeState.jsx";
import MtDropdown from "../../components/common/MtDropdown.jsx";
import RefuelingPriceBarChart from "../../components/common/RefuelingPriceBarChart.jsx";
import FuelCard from "../../components/common/FuelCard.jsx";
import helpers from "../../utils/helpers.js";

const Home = () => {
  const { user, vehicle, setVehicle, refuellings, setRefuellings } = useStore();
  const [selectedVehicle, setSelectedVehicle] = useState(
    vehicle ? { ...vehicle, name: vehicle?.vehicleName } : null
  );

  useEffect(() => {
    console.log("Dewa Home user", JSON.stringify(user));
    setSelectedVehicle(
      vehicle ? { ...vehicle, name: vehicle?.vehicleName } : null
    );
    setRefuellings(vehicle?.refuellings || []);
  }, []);

  useEffect(() => {
    setSelectedVehicle(
      vehicle ? { ...vehicle, name: vehicle?.vehicleName } : null
    );
    setRefuellings(vehicle?.refuellings || []);
  }, [vehicle]);

  // Check if user or vehicles exist to avoid null reference issues
  const vehicles = user?.vehicles ? Object.values(user?.vehicles) : [];

  // Preparing the data for MtDropdown
  const dataList = vehicles?.map((vehicle) => ({
    ...vehicle,
    id: vehicle.vehicle_id,
    name: vehicle.vehicleName,
  }));

  const handleOnPressUser = () => {
    router.push("/profile");
  };

  const handleSelectVehicle = (value) => {
    setVehicle(value);
    setSelectedVehicle(value);
    setRefuellings(value.refuellings);
  };

  const averageFuelConsumption = helpers.calculateFuelConsumption(
    refuellings || []
  )?.averageFuelConsumption;
  const lastFuelConsumption = helpers.calculateFuelConsumption(
    refuellings || []
  )?.lastFuelConsumption;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            Hi{" "}
            {user?.nickname?.toProperCase() || user?.userName?.toProperCase()},
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
                  value={selectedVehicle}
                  onChange={handleSelectVehicle}
                  width={156}
                  dropdownHeight={34}
                  dropdownBackgroundColor={Colors.inputBackground}
                  dataList={dataList}
                  dropdownTextSize={14}
                  menuHeight={120}
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
            {!refuellings?.length && (
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
                      It's time to add the refuelling details to get more
                      insights
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
            {!!refuellings?.length && (
              <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContentContainer}
              >
                <View>
                  <Text
                    style={[
                      styles.label,
                      { paddingHorizontal: 20, marginBottom: 12 },
                    ]}
                  >
                    Fuel Insights
                  </Text>
                  <View style={styles.insightContainer}>
                    <View style={styles.insightWrapper}>
                      <View style={styles.insightInfo}>
                        <Text style={styles.label}>Avg Fuel Consumption</Text>
                        <Text style={styles.label}>
                          {averageFuelConsumption} km/l
                        </Text>
                      </View>
                    </View>
                    <View style={styles.insightWrapper}>
                      <View style={styles.insightInfo}>
                        <Text style={styles.label}>Last Fuel Consumption</Text>
                        <Text style={styles.label}>
                          {lastFuelConsumption} km/l
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={[styles.analyticContainer, { marginBottom: 36 }]}>
                  <Text style={styles.label}>Money spent on fuel</Text>
                  <RefuelingPriceBarChart />
                </View>

                <View style={{ marginTop: 36 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingHorizontal: 20,
                      marginBottom: 12,
                    }}
                  >
                    <Text style={[styles.label]}>Fuel Insights</Text>
                    <TouchableOpacity>
                      <Image
                        source={icons.seeAll}
                        style={{ width: 64, height: 18 }}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.insightContainer}>
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
              </ScrollView>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const screenWidth = Dimensions.get("window").width;

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
    width: 320,
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
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(240, 242, 242, 1)",
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
  insightInfo: {
    display: "flex",

    justifyContent: "space-between",
    height: "100%",
  },
  label: {
    fontFamily: "Rubrik-Medium",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 20,
    color: Colors.textPrimary,
  },

  analyticContainer: {
    height: 217,
    marginTop: 36,
    paddingHorizontal: 20,
  },

  listContainer: {
    width: "100%",
    height: 364,
    marginTop: 20,
    paddingHorizontal: 18,
    // zIndex: -1000,
  },
});

export default Home;
