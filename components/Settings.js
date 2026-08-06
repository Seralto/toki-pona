import React, { useRef } from "react";
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Share, Alert, Linking, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import Accordion from "./Accordion";

const APP_VERSION = Constants.expoConfig?.version ?? "—";
const FEEDBACK_EMAIL = "contato@sergiotoledo.com.br";

const APP_URL = "https://play.google.com/store/apps/details?id=com.seralto.tokipona";
const WEB_URL = "https://learn-toki-pona.vercel.app/";

const LANGUAGES = [
  { key: "english",    label: "English",  flag: "🇺🇸" },
  { key: "portuguese", label: "Português", flag: "🇧🇷" },
  { key: "spanish",   label: "Español",  flag: "🇪🇸" },
];

const THEME_OPTIONS = [
  { key: "dark",    labelKey: "themeDark",    icon: "moon-outline",  fallback: "Dark"    },
  { key: "light",   labelKey: "themeLight",   icon: "sunny-outline", fallback: "Light"   },
  { key: "classic", labelKey: "themeClassic", icon: "book-outline",  fallback: "Classic" },
];

const FONT_SIZE_OPTIONS = [
  { key: "normal", labelKey: "fontNormal", fallback: "Normal" },
  { key: "large",  labelKey: "fontLarge",  fallback: "Large"  },
];

const SectionLabel = ({ label, t, fo = 0 }) => (
  <Text style={[styles.sectionLabel, { color: t.textDim, fontSize: 11 + fo }]}>{label}</Text>
);

const Settings = ({
  pageTexts,
  currentLanguage,
  currentTheme,
  currentFontSize,
  theme,
  onChangeLanguage,
  onChangeTheme,
  onChangeFontSize,
  onResetScore,
}) => {
  const t = theme ?? {};
  const fo = currentFontSize === "large" ? 4 : 0;
  const scrollRef = useRef(null);
  const s = pageTexts?.settings ?? {};
  const tp = pageTexts?.tokiPona ?? {};
  const ab = pageTexts?.aboutMe ?? {};

  const handleShare = async () => {
    try {
      await Share.share({ message: `${s.shareMessage ?? "Learn Toki Pona!"} ${APP_URL}` });
    } catch (_) {}
  };

  const handleShareWeb = async () => {
    try {
      await Share.share({ message: `${s.shareWebMessage ?? "Learn Toki Pona in the browser!"} ${WEB_URL}` });
    } catch (_) {}
  };

  const handleResetScore = () => {
    Alert.alert(
      s.resetScore ?? "Reset Score",
      s.resetConfirm ?? "Delete all quiz points on this device?",
      [
        { text: s.cancel ?? "Cancel", style: "cancel" },
        { text: s.reset ?? "Reset", style: "destructive", onPress: onResetScore },
      ]
    );
  };

  const pageLabel = (key) =>
    ({ tokipona: pageTexts?.pages?.tokiPona, about: pageTexts?.pages?.aboutMe }[key] ?? key);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: 26 + fo, color: t.text }]}>
        {pageTexts?.settings?.title ?? "Settings"}
      </Text>

      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        {/* Language */}
        <SectionLabel label={s.sectionLanguage ?? "Language"} t={t} fo={fo} />
        <View style={styles.cardRow}>
          {LANGUAGES.map(({ key, label, flag }) => {
            const isActive = currentLanguage === key;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.optCard, { backgroundColor: t.langBtnBg, borderColor: "transparent" },
                  isActive && { borderColor: t.accentBorder, backgroundColor: t.langBtnActiveBg }]}
                onPress={() => onChangeLanguage(key)}
                activeOpacity={0.7}
              >
                {isActive && <Ionicons name="checkmark" size={13} color={t.accentBorder} style={styles.check} />}
                <Text style={styles.optEmoji}>{flag}</Text>
                <Text style={[styles.optLabel, { fontSize: 12 + fo, color: isActive ? t.accentSecondary : t.textMuted },
                  isActive && { fontWeight: "600" }]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Appearance */}
        <SectionLabel label={s.sectionAppearance ?? "Appearance"} t={t} fo={fo} />
        <View style={styles.cardRow}>
          {THEME_OPTIONS.map(({ key, labelKey, icon, fallback }) => {
            const label = s[labelKey] ?? fallback;
            const isActive = currentTheme === key;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.optCard, { backgroundColor: t.langBtnBg, borderColor: "transparent" },
                  isActive && { borderColor: t.accentBorder, backgroundColor: t.langBtnActiveBg }]}
                onPress={() => onChangeTheme(key)}
                activeOpacity={0.7}
              >
                {isActive && <Ionicons name="checkmark" size={13} color={t.accentBorder} style={styles.check} />}
                <Ionicons name={icon} size={24 + fo} color={isActive ? t.accentSecondary : t.textMuted} style={{ marginBottom: 4 }} />
                <Text style={[styles.optLabel, { fontSize: 12 + fo, color: isActive ? t.accentSecondary : t.textMuted },
                  isActive && { fontWeight: "600" }]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Font Size */}
        <SectionLabel label={s.sectionFontSize ?? "Font Size"} t={t} fo={fo} />
        <View style={[styles.cardRow, { marginBottom: 24 }]}>
          {FONT_SIZE_OPTIONS.map(({ key, labelKey, fallback }) => {
            const label = s[labelKey] ?? fallback;
            const isActive = (currentFontSize ?? "normal") === key;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.optCard, { backgroundColor: t.langBtnBg, borderColor: "transparent" },
                  isActive && { borderColor: t.accentBorder, backgroundColor: t.langBtnActiveBg }]}
                onPress={() => onChangeFontSize(key)}
                activeOpacity={0.7}
              >
                {isActive && <Ionicons name="checkmark" size={13} color={t.accentBorder} style={styles.check} />}
                <Text style={[styles.fontAa, { fontSize: 24 + fo, color: isActive ? t.accentSecondary : t.textMuted }]}>Aa</Text>
                <Text style={[styles.optLabel, { fontSize: 12 + fo, color: isActive ? t.accentSecondary : t.textMuted },
                  isActive && { fontWeight: "600" }]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* App */}
        <SectionLabel label={s.sectionApp ?? "App"} t={t} fo={fo} />
        <View style={[styles.extraCard, { backgroundColor: t.surface, borderColor: t.surfaceBorder }]}>
          <TouchableOpacity style={styles.shareRow} onPress={handleShare} activeOpacity={0.7}>
            <View style={styles.shareText}>
              <Text style={[styles.shareTitle, { fontSize: 15 + fo, color: t.text }]}>{s.shareApp ?? "Share Android app"}</Text>
              <Text style={[styles.shareSubtitle, { fontSize: 13 + fo, color: t.textMuted }]}>{s.shareSubtitle ?? "Recommend to a friend"}</Text>
            </View>
            <Ionicons name="logo-android" size={22 + fo} color={t.textMuted} />
          </TouchableOpacity>
          <View style={[styles.rowDivider, { backgroundColor: t.surfaceBorder }]} />
          <TouchableOpacity style={styles.shareRow} onPress={handleShareWeb} activeOpacity={0.7}>
            <View style={styles.shareText}>
              <Text style={[styles.shareTitle, { fontSize: 15 + fo, color: t.text }]}>{s.shareWeb ?? "Share web version"}</Text>
              <Text style={[styles.shareSubtitle, { fontSize: 13 + fo, color: t.textMuted }]}>{s.shareWebSubtitle ?? "For iPhone users"}</Text>
            </View>
            <Ionicons name="logo-apple" size={22 + fo} color={t.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Data */}
        <SectionLabel label={s.sectionData ?? "Data"} t={t} fo={fo} />
        <View style={[styles.extraCard, { backgroundColor: t.surface, borderColor: t.surfaceBorder }]}>
          <TouchableOpacity style={styles.shareRow} onPress={handleResetScore} activeOpacity={0.7}>
            <View style={[styles.trashCircle, { backgroundColor: t.cardBg }]}>
              <Ionicons name="trash-outline" size={20 + fo} color="#e05050" />
            </View>
            <View style={styles.shareText}>
              <Text style={[styles.shareTitle, { fontSize: 15 + fo, color: "#e05050" }]}>{s.resetScore ?? "Reset Score"}</Text>
              <Text style={[styles.shareSubtitle, { fontSize: 13 + fo, color: t.textMuted }]}>{s.resetSubtitle ?? "Delete all quiz points on this device"}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* About */}
        <SectionLabel label={s.sectionAbout ?? "About"} t={t} fo={fo} />
        <View style={[styles.extraCard, { backgroundColor: t.surface, borderColor: t.surfaceBorder }]}>
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { fontSize: 15 + fo, color: t.textMuted }]}>{s.appVersion ?? "App version"}</Text>
            <Text style={[styles.aboutValue, { fontSize: 15 + fo, color: t.text }]}>{APP_VERSION}</Text>
          </View>
          <View style={[styles.rowDivider, { backgroundColor: t.surfaceBorder }]} />
          <TouchableOpacity style={styles.aboutRow} onPress={() => Linking.openURL(`mailto:${FEEDBACK_EMAIL}`)} activeOpacity={0.7}>
            <Text style={[styles.aboutLabel, { fontSize: 15 + fo, color: t.textMuted }]}>{s.feedback ?? "Feedback"}</Text>
            <Text style={[styles.aboutValue, styles.aboutLink, { fontSize: 15 + fo, color: t.link }]}>{FEEDBACK_EMAIL}</Text>
          </TouchableOpacity>
        </View>

        {/* Toki Pona info */}
        <Accordion title={tp.title ?? "O que é Toki Pona?"} th={t} titleSize={15 + fo} scrollRef={scrollRef}>
          <View style={styles.accordionBody}>
            <Text style={[styles.accordionText, { fontSize: 14 + fo, color: t.textMuted }]}>{tp.content}</Text>
            <Text style={[styles.accordionText, { fontSize: 14 + fo, color: t.textMuted }]}>{tp.official}</Text>
            <Text style={[styles.accordionLink, { fontSize: 14 + fo, color: t.link }]} onPress={() => Linking.openURL(tp.siteUrl)}>
              {tp.site}
            </Text>
          </View>
        </Accordion>

        {/* About */}
        <Accordion title={pageTexts?.pages?.aboutMe ?? "Sobre Mim"} th={t} titleSize={15 + fo} scrollRef={scrollRef}>
          <View style={styles.accordionBody}>
            <Text style={[styles.accordionText, { fontSize: 14 + fo, color: t.textMuted }]}>{ab.content}</Text>
            <View style={styles.linksRow}>
              {[
                { url: ab.linkedinUrl, icon: "logo-linkedin" },
                { url: ab.githubUrl,   icon: "logo-github"   },
                { url: ab.youtubeUrl,  icon: "logo-youtube"  },
              ].map(({ url, icon }) => (
                <TouchableOpacity key={icon} onPress={() => Linking.openURL(url)} activeOpacity={0.7}>
                  <Ionicons name={icon} size={28 + fo} color={t.link} />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={[styles.accordionLink, { fontSize: 14 + fo, color: t.link }]} onPress={() => Linking.openURL(ab.siteUrl)}>{ab.site}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(ab.playStoreUrl)} style={styles.playStoreBtn}>
              <Text style={[styles.accordionText, { fontSize: 14 + fo, color: t.textMuted }]}>{ab.myApps}</Text>
              <Image source={require("../assets/play-store-icon.png")} style={styles.playStoreIcon} />
            </TouchableOpacity>
          </View>
        </Accordion>

        <View style={{ height: 48 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:   { flex: 1, paddingHorizontal: 20 },
  title:       { fontSize: 26, fontWeight: "bold", marginBottom: 20, marginTop: 8 },
  sectionLabel:{ fontSize: 11, fontWeight: "600", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10 },
  cardRow:     { flexDirection: "row", gap: 10, marginBottom: 20 },
  optCard:     { flex: 1, alignItems: "center", paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, position: "relative" },
  check:       { position: "absolute", top: 7, right: 9 },
  optEmoji:    { fontSize: 24, marginBottom: 6 },
  optLabel:    { fontSize: 12 },
  fontAa:      { fontSize: 24, fontWeight: "700", marginBottom: 4 },
  extraCard:    { borderRadius: 12, borderWidth: 1.5, overflow: "hidden", marginBottom: 20 },
  shareRow:     { flexDirection: "row", alignItems: "center", paddingVertical: 16, paddingHorizontal: 16, gap: 12 },
  rowDivider:   { height: 1, marginHorizontal: 16 },
  shareText:    { flex: 1 },
  shareTitle:   { fontSize: 15, fontWeight: "600", marginBottom: 2 },
  shareSubtitle:{ fontSize: 13 },
  trashCircle:   { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  aboutRow:      { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 16, paddingHorizontal: 16 },
  aboutLabel:    { fontSize: 15 },
  aboutValue:    { fontSize: 15, fontWeight: "600" },
  aboutLink:     { textDecorationLine: "underline" },
  accordionBody: { paddingHorizontal: 16, paddingVertical: 14, gap: 8 },
  accordionText: { fontSize: 14, lineHeight: 21 },
  accordionLink: { fontSize: 14, fontWeight: "600" },
  linksRow:      { flexDirection: "row", gap: 16, flexWrap: "wrap" },
  playStoreBtn:  { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 4 },
  playStoreIcon: { width: 36, height: 36, borderRadius: 8 },
});

export default Settings;
