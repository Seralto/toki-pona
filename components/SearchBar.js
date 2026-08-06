import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/**
 * Shared search input used by Dictionary and Sentences.
 * Props:
 *   value          — current text string
 *   onChangeText   — called with new string on every keystroke (and "" on clear)
 *   placeholder    — placeholder string
 *   fontSize       — dynamic font size (base + fo)
 *   th             — theme token object
 *   style          — optional extra style for the outer container (e.g. marginBottom)
 */
const SearchBar = ({ value, onChangeText, placeholder, fontSize, th, style }) => {
  const q = value.trim();
  return (
    <View
      style={[
        styles.searchBox,
        { backgroundColor: th.inputBg, borderColor: q ? th.accentBorder : th.surfaceBorder },
        style,
      ]}
    >
      <Ionicons name="search-outline" size={18} color={th.textMuted} style={styles.searchIcon} />
      <TextInput
        style={[styles.searchInput, { fontSize, color: th.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={th.textMuted}
        autoCorrect={false}
        autoCapitalize="none"
        autoComplete="off"
        returnKeyType="search"
      />
      {q.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText("")}>
          <Ionicons name="close-circle" size={18} color={th.textMuted} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox:  { flexDirection: "row", alignItems: "center", borderRadius: 12, borderWidth: 1, paddingHorizontal: 12 },
  searchIcon: { marginRight: 8 },
  searchInput:{ flex: 1, paddingVertical: 12 },
});

export default SearchBar;
