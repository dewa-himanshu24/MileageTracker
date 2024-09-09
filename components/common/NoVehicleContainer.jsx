import React from "react";
import { router } from 'expo-router';
import { View, Text, Image, StyleSheet } from "react-native";
import { images } from "../../constants/index.js";
import MtButton from "../../components/common/MtButton.jsx";
import { Colors } from "../../styles/index.js";

const NoVehicleContainer = () => {

  const handleOnPress = () => {
    router.push('/addVehicle')
  }

  return (
    <>
      <Image
        source={images.milestone}
        style={styles.milestone}
        resizeMode="contain"
        accessible={true}
        accessibilityLabel="Illustration of a road"
      />
      <View style={styles.noVehicleSubtextContainer}>
        <Text style={styles.noVehicleSubtext}>
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
    </>
  );
};

const styles = StyleSheet.create({
  milestone: {
    width: 110,
    height: 110,
    marginBottom: 32,
  },
  noVehicleSubtextContainer: {
    width: 300,
    height: 40,
    marginBottom: 4,
  },
  noVehicleSubtext: {
    fontFamily: "Rubrik-Regular",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 20,
    color: Colors.primaryText
  },
});

export default NoVehicleContainer;
