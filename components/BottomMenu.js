import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NAV_ITEMS = [
  { key: "translator", lib: "Ionicons",              icon: "swap-horizontal-outline", iconActive: "swap-horizontal" },
  { key: "dictionary", lib: "Ionicons",              icon: "book-outline",            iconActive: "book" },
  { key: "grammar",    lib: "Ionicons",              icon: "school-outline",          iconActive: "school" },
  { key: "sentences",  lib: "Ionicons",              icon: "chatbubble-outline",      iconActive: "chatbubble" },
  { key: "quiz",       lib: "MaterialCommunityIcons", icon: "brain",                  iconActive: "brain" },
];

const ACTIVE_COLOR   = "#7eb8d4";
const INACTIVE_COLOR = "#6b6e8a";

const BottomMenu = ({ pageTexts, currentPage, onChangePage }) => {
  return (
    <View style={styles.bottomMenu}>
      {NAV_ITEMS.map(({ key, lib, icon, iconActive }) => {
        const isActive = currentPage === key;
        const color = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;
        const label = pageTexts?.pages?.[key] ?? key;
        const IconComp = lib === "MaterialCommunityIcons" ? MaterialCommunityIcons : Ionicons;

        return (
          <TouchableOpacity
            key={key}
            style={styles.navItem}
            onPress={() => onChangePage(key)}
            accessibilityLabel={label}
          >
            <IconComp
              name={isActive ? iconActive : icon}
              size={22}
              color={color}
            />
            <Text style={[styles.label, { color }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#2f3245",
    borderTopWidth: 1,
    borderTopColor: "#3d4060",
    paddingVertical: 6,
    paddingBottom: 10,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    gap: 3,
  },
  label: {
    fontSize: 9,
    fontWeight: "500",
  },
});

export default BottomMenu;
