import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import useStore from "../store/index.js";
import { Colors } from "../styles/index.js";
import Helpers from "../utils/helpers.js";
import AntDesign from "@expo/vector-icons/AntDesign";
import { images, icons } from "../constants/index.js";
import MtButton from "../components/common/MtButton.jsx";

const ViewRefueling = () => {
  const { refuelling, vehicle } = useStore();

  const handleCancel = () => {
    router.back();
  };
  console.log("Dewa ViewRefueling refuelling", refuelling);
  const handleEdit = () => {
    router.push(`/formRefuelling/${refuelling?.refuelling_id}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerWrappr}>
        <View style={styles.topContainerWrapper}>
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
            <Text style={styles.refuellingDate}>
              {Helpers.formatDateType2(refuelling?.refuellingDate)}
            </Text>
            <TouchableOpacity
              style={styles.backArrowContainer}
              // onPress={handleCancel}
            >
              <Image source={icons.delete2} style={styles.delete} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.middleContainer}>
          <Text style={styles.vehicleName}>{vehicle?.vehicleName}</Text>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.createdAt}>
            Added on {Helpers.formatDateType2(refuelling?.createdAt)}
          </Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoline}>
          <Text style={styles.infoTitle}>Start Reading</Text>
          <Text style={styles.infoValue}>{refuelling?.startReading} kms</Text>
        </View>
        <View style={styles.infoline}>
          <Text style={styles.info}>End Reading</Text>
          <Text style={styles.info}>{refuelling?.endReading} kms</Text>
        </View>
        <View style={styles.infoline}>
          <Text style={styles.info}>Consumed</Text>
          <Text style={styles.info}>{refuelling?.consumed}L</Text>
        </View>
        <View style={styles.infoline}>
          <Text style={styles.info}>Price</Text>
          <Text style={styles.info}>S$ {refuelling?.price}</Text>
        </View>
      </View>

      <View style={styles.footerButton}>
        <View style={styles.leftButton}>
          <MtButton
            title="Edit"
            style={styles.button}
            onPress={handleEdit}
            backgroundColor="transparent"
            borderWidth={1}
            textColor={Colors.textPrimary}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  containerWrappr: {
    width: "100%",
    paddingHorizontal: 20,
    alignSelf: "center",
    height: 137,
    width: "100%",
    backgroundColor: Colors.white,
    marginBottom: 53,
  },
  topContainerWrapper: {
    marginTop: 40,
    marginBottom: 6,
  },
  topContainer: {
    width: "100%",
    height: 28,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftArrow: {
    color: Colors.disabled,
  },
  refuellingDate: {
    fontFamily: "Rubrik-Medium",
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "500",
    color: Colors.textPrimary,
  },
  delete: {
    width: 24,
    height: 24,
  },
  middleContainer: {
    marginBottom: 6,
    // height: 20,
    paddingHorizontal: 0,
    // paddingVertical: 18,
    alignSelf: "center",
  },
  vehicleName: {
    fontFamily: "Rubrik-Medium",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    color: Colors.textPrimary,
  },
  bottomContainer: {
    marginBottom: 16,
    alignSelf: "center",
  },
  createdAt: {
    fontFamily: "Rubrik-Regular",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "400",
    color: Colors.subText,
  },
  infoCard: {
    height: 140,
    padding: 16,
    width: "88%",
    backgroundColor: Colors.white,
    borderRadius: 8,
  },
  infoline: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
  },
  info: {
    fontFamily: "Rubrik-Regular",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    letterSpacing: 0.15,
    color: Colors.textPrimary,
  },
  footerButton: {
    position: "absolute",
    bottom: 0,
    paddingBottom: 28,
  },
});

export default ViewRefueling;
