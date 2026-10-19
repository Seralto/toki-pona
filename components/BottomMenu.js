import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const NAV_ITEMS = [
  { key: "translator", icon: "swap-horizontal-outline", iconActive: "swap-horizontal" },
  { key: "dictionary", icon: "book-outline",            iconActive: "book" },
  { key: "grammar",    icon: "school-outline",          iconActive: "school" },
  { key: "sentences",  icon: "chatbubble-outline",      iconActive: "chatbubble" },
  { key: "quiz",       icon: "game-controller-outline", iconActive: "game-controller" },
];

const BottomMenu = ({ pageTexts, currentPage, theme, onChangePage }) => {
  const t = theme ?? {};
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bottomMenu, {
      backgroundColor: t.bottomMenu,
      borderTopColor: t.bottomMenuBorder,
      paddingBottom: Platform.OS === "android" ? insets.bottom + 10 : 10,
    }]}>
      {NAV_ITEMS.map(({ key, icon, iconActive }) => {
        const isActive = currentPage === key;
        const color = isActive ? t.accent : t.inactive;
        const label = pageTexts?.pages?.[key] ?? key;

        return (
          <TouchableOpacity
            key={key}
            style={styles.navItem}
            onPress={() => onChangePage(key)}
            accessibilityLabel={label}
            testID={`nav-${key}`}
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
    borderTopWidth: 1,
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
