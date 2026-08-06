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

const THEME_OPTIONS = [
  { key: "dark",    label: "Dark",    icon: "moon-outline" },
  { key: "light",   label: "Light",   icon: "sunny-outline" },
  { key: "classic", label: "Classic", icon: "book-outline" },
];

const FONT_SIZE_OPTIONS = [
  { key: "normal", label: "Normal" },
  { key: "large",  label: "Grande" },
];

const EXTRA_PAGES = [
  { key: "tokipona", icon: "information-circle-outline" },
  { key: "about",    icon: "person-outline" },
];

const OptionsModal = ({
  pageTexts,
  modalVisibility,
  currentLanguage,
  currentTheme,
  currentFontSize,
  theme,
  onChangePage,
  onChangeLanguage,
  onChangeTheme,
  onChangeFontSize,
  onShowModal,
}) => {
  const t = theme ?? {};
  const pageLabel = (key) => {
    const map = {
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
      <TouchableWithoutFeedback onPress={() => onShowModal(false)}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={[styles.sheet, { backgroundColor: t.sheet }]}>
        <View style={[styles.handle, { backgroundColor: t.handle }]} />

        {/* Language selector */}
        <Text style={[styles.sectionLabel, { color: t.textDim }]}>Language</Text>
        <View style={styles.langRow}>
          {LANGUAGES.map(({ key, label, flag }) => {
            const isActive = currentLanguage === key;
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.langBtn,
                  { backgroundColor: t.langBtnBg, borderColor: "transparent" },
                  isActive && { borderColor: t.accentBorder, backgroundColor: t.langBtnActiveBg },
                ]}
                onPress={() => { onChangeLanguage(key); onShowModal(false); }}
              >
                <Text style={styles.langFlag}>{flag}</Text>
                <Text style={[styles.langLabel, { color: t.textMuted }, isActive && { color: t.accentSecondary, fontWeight: "600" }]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Theme selector */}
        <Text style={[styles.sectionLabel, { color: t.textDim }]}>Appearance</Text>
        <View style={styles.langRow}>
          {THEME_OPTIONS.map(({ key, label, icon }) => {
            const isActive = currentTheme === key;
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.langBtn,
                  { backgroundColor: t.langBtnBg, borderColor: "transparent" },
                  isActive && { borderColor: t.accentBorder, backgroundColor: t.langBtnActiveBg },
                ]}
                onPress={() => { onChangeTheme(key); onShowModal(false); }}
              >
                <Ionicons name={icon} size={22} color={isActive ? t.accentSecondary : t.textMuted} style={{ marginBottom: 4 }} />
                <Text style={[styles.langLabel, { color: t.textMuted }, isActive && { color: t.accentSecondary, fontWeight: "600" }]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Font size selector */}
        <Text style={[styles.sectionLabel, { color: t.textDim }]}>Font Size</Text>
        <View style={[styles.langRow, { marginBottom: 20 }]}>
          {FONT_SIZE_OPTIONS.map(({ key, label }) => {
            const isActive = (currentFontSize ?? "normal") === key;
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.fontBtn,
                  { backgroundColor: t.langBtnBg, borderColor: "transparent" },
                  isActive && { borderColor: t.accentBorder, backgroundColor: t.langBtnActiveBg },
                ]}
                onPress={() => { onChangeFontSize(key); onShowModal(false); }}
                activeOpacity={0.7}
              >
                {isActive && (
                  <Ionicons
                    name="checkmark"
                    size={13}
                    color={t.accentBorder}
                    style={styles.fontCheck}
                  />
                )}
                <Text style={[styles.fontAa, { color: isActive ? t.accentSecondary : t.textMuted }]}>Aa</Text>
                <Text style={[styles.langLabel, { color: isActive ? t.accentSecondary : t.textMuted }, isActive && { fontWeight: "600" }]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={[styles.divider, { backgroundColor: t.sheetBorder }]} />

        {/* Extra pages */}
        {EXTRA_PAGES.map(({ key, icon }) => (
          <TouchableOpacity
            key={key}
            style={[styles.pageRow, { borderBottomColor: t.sheetBorder }]}
            onPress={() => { onChangePage(key); onShowModal(false); }}
          >
            <Ionicons name={icon} size={20} color={t.textMuted} style={styles.pageIcon} />
            <Text style={[styles.pageLabel, { color: t.text }]}>{pageLabel(key)}</Text>
            <Ionicons name="chevron-forward" size={16} color={t.textDim} />
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 12,
  },
  handle: {
    width: 40, height: 4, borderRadius: 2,
    alignSelf: "center", marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 11, fontWeight: "600", letterSpacing: 0.8,
    textTransform: "uppercase", marginBottom: 10,
  },
  langRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  langBtn: {
    flex: 1, alignItems: "center", paddingVertical: 10,
    borderRadius: 10, borderWidth: 1,
  },
  langFlag: { fontSize: 22, marginBottom: 4 },
  langLabel: { fontSize: 11 },
  divider:   { height: 1, marginBottom: 8 },
  fontBtn:   { flex: 1, alignItems: "center", paddingVertical: 14, borderRadius: 10, borderWidth: 1, position: "relative" },
  fontAa:    { fontSize: 22, fontWeight: "700", marginBottom: 4 },
  fontCheck: { position: "absolute", top: 6, right: 8 },
  pageRow: {
    flexDirection: "row", alignItems: "center",
    paddingVertical: 14, borderBottomWidth: 1,
  },
  pageIcon: { marginRight: 12 },
  pageLabel: { flex: 1, fontSize: 16 },
});

export default OptionsModal;
