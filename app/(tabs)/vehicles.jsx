import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Colors } from "../../styles/index.js";
import NoVehicleContainer from "../../components/common/NoVehicleContainer.jsx";
import VehicleCard from "../../components/common/VehicleCard.jsx";
import useStore from "../../store/index.js";
import MtButton from "../../components/common/MtButton.jsx";

function Vehicles() {
  const { user } = useStore();
  let vehicles = Object.values(user?.vehicles) || [];
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.headerContainer]}>
        <Text style={styles.header}>Vehicles</Text>
      </View>

      {/* If theres is no vehicle */}
      {!vehicles?.length && (
        <View style={styles.noVehicleContainer}>
          <NoVehicleContainer />
        </View>
      )}

      {/* If there are vehicles */}
      {!!vehicles?.length && (
        <View style={styles.vehicleContainer}>
          <FlatList
            data={vehicles}
            renderItem={({ item }) => (
              <VehicleCard key={item.vehicle_id} vehicle={item} />
            )}
            keyExtractor={(item) => item.vehicle_id}
          />
        </View>
      )}

      {!!vehicles.length && (
        <View style={styles.fullScreenOverlay}>
          <TouchableOpacity>
            <MtButton
              textColor={Colors.textSecondary}
              iconName="plus"
              iconSize={24}
              iconColor={Colors.textSecondary}
              width={52}
              height={52}
              borderRadius={28}
              iconMarginLeft={0}
              onPress={() => router.push("/addVehicle")}
            />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryBackground,
    width: "100%",
    height: 648,
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
    height: 84,
  },
  header: {
    fontFamily: "Rubrik-Medium",
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 28,
  },

  // No vehicle
  noVehicleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Vehicle Container
  vehicleContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 18,
    marginBottom: 20,
  },
  fullScreenOverlay: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default Vehicles;
