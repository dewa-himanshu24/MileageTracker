import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Colors } from "../../styles/index.js";
import { images } from "../../constants/index.js";

const VehicleCard = ({ vehicle }) => {
  return (
    <View style={styles.cardContainer}>
      {/* Vehicle Image */}
      <View style={styles.imageContainer}>
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
      {/* Vehicle Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailsLeftContainer}>
          <Text style={styles.vehicleName}>{vehicle?.vehicleName}</Text>
          <Text style={styles.vehicleType}>{vehicle?.vehicleType?.name}</Text>
        </View>
        <View style={styles.detailsRightContainer}>
          <Text style={styles.engineCC}>{vehicle?.engineCapacity} CC</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginTop: 24,
    flexDirection: "column",
  },
  imageContainer: {
    width: "100%",
    height: 148,
    backgroundColor: Colors.lightGrey,
  },
  vehicleImage: {
    width: "100%",
    height: 148,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  detailsContainer: {
    width: "100%",
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    display: "flex",
    flexDirection: "row",
  },
  detailsLeftContainer: {
    width: "75%",
    height: 52,
  },
  vehicleName: {
    fontFamily: "Rubrik-Medium",
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: "500",
    lineHeight: 18,
    letterSpacing: 0.15,
  },
  vehicleType: {
    fontFamily: "Rubrik-Regular",
    fontSize: 11,
    color: Colors.subText,
    fontWeight: "400",
    lineHeight: 14,
  },
  detailsRightContainer: {
    width: "25%",
    height: 52,
    alignSelf: "end",
  },
  engineCC: {
    fontFamily: "Rubrik-Medium",
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: "400",
    lineHeight: 18,
    letterSpacing: 0.15,
    textAlign: "right",
    marginTop: 8,
  },
});

export default VehicleCard;
