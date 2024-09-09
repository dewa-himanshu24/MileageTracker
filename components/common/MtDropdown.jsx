import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, FlatList, SafeAreaView, Platform, TouchableWithoutFeedback,
} from "react-native";
import { icons } from "../../constants/index.js";
import { Colors } from "../../styles/index.js";

const MtDropdown = ({
  onChange,
  placeholder = "",
  label,
  dataList,
  isSearchable,
  width = 240,
  dropdownHeight = 44,
  dropdownBackgroundColor = "rgba(198, 232, 233, 1)",
  dropdownTextSize = 16,
  dropdownMarginTop = 8,
  iconHeight = 20,
  iconWidth = 20,
  menuHeight = 300,
  value,
}) => {
  const [selectedItem, setSelectedItem] = useState(value?.name || placeholder);
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState(dataList);
  console.log("Dewa1 MtDropdown value", JSON.stringify(value));
  const searchRef = useRef();

  useEffect(() => {
    setSelectedItem(value?.name || placeholder);
  }, [value]);
  
  const handleSearch = (text) => {
    if (text) {
      setData(
        dataList?.filter((item) =>
          item?.name?.toLowerCase().includes(text.toLowerCase())
        )
      );
    } else {
      setData(dataList);
    }
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const handleSelection = (item) => {
    // setSelectedItem(item?.name);
    onChange(item);
    setShowDropdown(false);
    if (isSearchable && searchRef.current) {
      searchRef.current.clear();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={[
            styles.dropdown,
            { width: width },
            { height: dropdownHeight },
            { backgroundColor: dropdownBackgroundColor },
            { fontSize: dropdownTextSize },
            { marginTop: dropdownMarginTop },
          ]}
          onPress={() => {
            setShowDropdown(!showDropdown);
            handleSearch("");
          }}
        >
          <View>
            {label && (
              <Text style={styles.dropdownLabel}>{label}</Text>
            )}
            <Text style={[styles.dropdownText, {fontSize: dropdownTextSize}]}>{selectedItem}</Text>
          </View>
          <Image
            source={showDropdown ? icons.down : icons.down}
            style={[styles.icon, { height: iconHeight }, { width: iconWidth }, {transform: [{ rotate: showDropdown ? "180deg" : "0deg" }]}]}
          />
        </TouchableOpacity>
        {showDropdown && (
          <View style={[styles.dropdownMenu, { width: width }, { height: menuHeight }]}>
            {isSearchable && (
              <TextInput
                placeholder="Search Vehicles"
                style={[styles.searchInput, { width: width }]}
                onChangeText={handleSearch}
                ref={searchRef}
              />
            )}

            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => {
                    handleSelection(item);
                  }}
                >
                  <Text style={styles.itemText}>{item?.name}</Text>
                </TouchableOpacity>
              )}
              style={{ flex: 1 }}
              scrollEnabled={true}
              contentContainerStyle={{ paddingBottom: 10 }}
            />
          </View>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdown: {
    borderRadius: 8,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  dropdownLabel: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    color: Colors.inactive,
    fontSize: 11,
  },
  dropdownText: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    color: Colors.primary,
  },
  icon: {
    borderRadius: 12,
  },
  dropdownMenu: {
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: "#F7F7F7",
    elevation: 4,
    alignSelf: "center",
  },
  searchInput: {
    width: 240,
    height: 48,
    borderRadius: 8,
    borderBottomWidth: 0.5,
    borderColor: Colors.primary,
    alignSelf: "center",
    paddingLeft: 16,
  },
  itemContainer: {
    width: "85%",
    height: 40,
    alignSelf: "center",
    justifyContent: "center",
  },
  itemText: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    color: Colors.primary,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
});

{/* <MtDropdown
  showLabel
  isSearchable
  width={324}
  dropdownHeight={52}
  dropdownBackgroundColor={Colors.inputBackground}
  dataList={vehicles}
  dropdownTextSize={16}
/>; */}

{/* <MtDropdown
  width={156}
  dropdownHeight={34}
  dropdownBackgroundColor={Colors.inputBackground}
  dataList={vehicles}
  dropdownTextSize={14}
/>; */}

export default MtDropdown;
