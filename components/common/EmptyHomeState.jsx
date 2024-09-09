import React from "react";
import { router } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import { Colors } from "../../styles/index.js";
import { images } from "../../constants/index.js";
import MtButton from "../../components/common/MtButton.jsx";

const EmptyHomeState = () => {
  const handleOnPress = () => {
    router.push("/addVehicle");
  };

  return (
    <View style={styles.middleBar}>
      <Text style={styles.description}>
        Track your miles towards a prosperous financial journey!
      </Text>
      <Image source={images.milestone} style={styles.milestone} />
      <View style={styles.subtextContainer}>
        <Text style={styles.subtext}>
          Add a vehicle to start tracking its fuelling & performance
        </Text>
      </View>
      <MtButton
        title="Add Vehicle"
        textColor={Colors.textSecondary}
        marginTop={18}
        style={styles.button}
        iconName="arrowright"
        iconColor={Colors.textSecondary}
        width={139}
        onPress={handleOnPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  middleBar: {
    alignItems: "center",
    marginTop: 0,
    paddingHorizontal: 20,
  },
  description: {
    fontFamily: "Rubrik-Regular",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 113,
  },
  milestone: {
    width: 110,
    height: 110,
    marginBottom: 32,
  },
  subtextContainer: {
    width: 300,
    height: 40,
    marginBottom: 4,
  },
  subtext: {
    fontFamily: "Rubrik-Regular",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default EmptyHomeState;
