import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LANGUAGES = [
  { key: "english",    label: "English",  flag: "🇺🇸" },
  { key: "portuguese", label: "Português", flag: "🇧🇷" },
  { key: "spanish",   label: "Español",  flag: "🇪🇸" },
];

const EXTRA_PAGES = [
  { key: "tokipona", icon: "information-circle-outline" },
  { key: "about",    icon: "person-outline" },
];

const OptionsModal = ({
  pageTexts,
  modalVisibility,
  currentLanguage,
  onChangePage,
  onChangeLanguage,
  onShowModal,
}) => {
  const pageLabel = (key) => {
    const map = {
      settings: pageTexts?.pages?.settings,
      tokipona: pageTexts?.pages?.tokiPona,
      about:    pageTexts?.pages?.aboutMe,
    };
    return map[key] ?? key;
  };

  return (
    <Modal
      visible={modalVisibility}
      animationType="slide"
      transparent
      onRequestClose={() => onShowModal(false)}
    >
      {/* Dimmed backdrop closes modal on tap */}
      <TouchableWithoutFeedback onPress={() => onShowModal(false)}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.sheet}>
        {/* Drag handle */}
        <View style={styles.handle} />

        {/* Language selector */}
        <Text style={styles.sectionLabel}>Language</Text>
        <View style={styles.langRow}>
          {LANGUAGES.map(({ key, label, flag }) => {
            const isActive = currentLanguage === key;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.langBtn, isActive && styles.langBtnActive]}
                onPress={() => { onChangeLanguage(key); onShowModal(false); }}
              >
                <Text style={styles.langFlag}>{flag}</Text>
                <Text style={[styles.langLabel, isActive && styles.langLabelActive]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Extra pages */}
        {EXTRA_PAGES.map(({ key, icon }) => (
          <TouchableOpacity
            key={key}
            style={styles.pageRow}
            onPress={() => { onChangePage(key); onShowModal(false); }}
          >
            <Ionicons name={icon} size={20} color="#9b9db8" style={styles.pageIcon} />
            <Text style={styles.pageLabel}>{pageLabel(key)}</Text>
            <Ionicons name="chevron-forward" size={16} color="#4a4d6a" />
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    backgroundColor: "#2f3245",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#4a4d6a",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  sectionLabel: {
    color: "#6b6e8a",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  langRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  langBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#3a3d56",
    borderWidth: 1,
    borderColor: "transparent",
  },
  langBtnActive: {
    borderColor: "#7eb8d4",
    backgroundColor: "#2a3d4d",
  },
  langFlag: {
    fontSize: 22,
    marginBottom: 4,
  },
  langLabel: {
    fontSize: 11,
    color: "#9b9db8",
  },
  langLabelActive: {
    color: "#7eb8d4",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#3d4060",
    marginBottom: 8,
  },
  pageRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#3d4060",
  },
  pageIcon: {
    marginRight: 12,
  },
  pageLabel: {
    flex: 1,
    color: "#c3c3c3",
    fontSize: 16,
  },
});

export default OptionsModal;
