import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NAV_ITEMS = [
  { key: "translator", icon: "swap-horizontal-outline", iconActive: "swap-horizontal" },
  { key: "dictionary", icon: "book-outline",            iconActive: "book" },
  { key: "grammar",    icon: "school-outline",          iconActive: "school" },
  { key: "sentences",  icon: "chatbubble-outline",      iconActive: "chatbubble" },
  { key: "quiz",       icon: "game-controller-outline", iconActive: "game-controller" },
];

const ACTIVE_COLOR   = "#7eb8d4";
const INACTIVE_COLOR = "#6b6e8a";

const BottomMenu = ({ pageTexts, currentPage, onChangePage }) => {
  return (
    <View style={styles.bottomMenu}>
      {NAV_ITEMS.map(({ key, icon, iconActive }) => {
        const isActive = currentPage === key;
        const color = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;
        const label = pageTexts?.pages?.[key] ?? key;

        return (
          <TouchableOpacity
            key={key}
            style={styles.navItem}
            onPress={() => onChangePage(key)}
            accessibilityLabel={label}
          >
            <Ionicons
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
