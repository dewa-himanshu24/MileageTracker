import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Colors } from "../../styles/index.js";
import { images } from "../../constants/index.js";
import Helpers from "../../utils/helpers.js";
import useStore from "../../store/index.js";

const FuelCard = ({ item }) => {
  const { refuelling, setRefuelling } = useStore();

  const handleViewRefuelling = () => {
    setRefuelling(item);
    router.push("/viewRefuelling");
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleViewRefuelling(item)}
    >
      <View style={styles.leftContainer}>
        <Image source={images.flower} style={styles.flower} />
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.textDate}>
          {Helpers.formatDateType2(item?.refuellingDate)}
        </Text>
        <Text style={styles.textFuel}>{item?.consumed}L</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.currency}>+S$</Text>
        <Text style={styles.price}>{item?.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  leftContainer: {
    height: 24,
    width: 24,
  },
  flower: {
    width: 24,
    height: 24,
  },
  middleContainer: {
    // height: 36,
    width: 198,
    paddingHorizontal: 0,
    paddingVertical: 16,
  },
  textDate: {
    fontFamily: "Rubik-Medium",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: Colors.textPrimary,
    letterSpacing: 0.15,
    width: "182",
  },
  textFuel: {
    fontFamily: "Rubik-Regular",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "400",
    color: Colors.subText,
    letterSpacing: 0.15,
  },
  rightContainer: {
    // width: 62,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  currency: {
    fontFamily: "Rubik-Medium",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "400",
    color: Colors.textPrimary,
    letterSpacing: 0.15,
    marginRight: 4,
  },
  price: {
    fontFamily: "Rubik-Medium",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: Colors.textPrimary,
    letterSpacing: 0.15,
  },
});

export default FuelCard;
