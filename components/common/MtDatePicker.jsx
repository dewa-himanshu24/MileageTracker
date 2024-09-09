import React, { useEffect, useState } from "react";
import {
  View,
  Platform,
  Pressable,
  TextInput,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "../../styles/index.js";
import { icons } from "../../constants/index.js";
import Helpers from "../../utils/helpers.js";

const MtDatePicker = ({ value, onChange }) => {
  const [date, setDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onDatePickerChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios"); // Keep picker open for iOS
    setDate(currentDate);
    onChange(currentDate);

    if (Platform.OS !== "ios") {
      setDate(currentDate);
      onChange(currentDate);
    }
  };

  return (
    <View style={styles.container}>
      {!showPicker && (
        <Pressable onPress={toggleDatePicker} style={styles.inputContainer}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ width: 268 }}>
              <Text style={styles.label}>Refueling Date</Text>
              <TextInput
                style={styles.inputText}
                placeholder="Select Refuelling Date"
                value={date ? Helpers.formatDate(date) : ""}
                placeholderTextSize={16}
                editable={false}
              />
            </View>
            <Image source={icons.calender} style={styles.calendarIcon} />
          </View>
        </Pressable>
      )}

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDatePickerChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.secondaryBackground,
    borderRadius: 8,
    backgroundColor: Colors.white,
    justifyContent: "space-between",
    height: 52,
    paddingVertical: 8,
    paddingRight: 12,
    paddingLeft: 16,
  },
  calendarIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.textPrimary,
  },
  label: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    color: Colors.inactive,
    fontSize: 11,
  },
  inputText: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    color: Colors.textPrimary,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
});

export default MtDatePicker;