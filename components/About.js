import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";

const About = ({ pageTexts, screenWidth, theme }) => {
  const titleFontSize = screenWidth < 400 ? 20 : 24;
  const fontSize = screenWidth < 400 ? 15 : 18;
  const iconSize = screenWidth < 400 ? 60 : 75;
  const th = theme ?? {};

  return (
    <ScrollView>
      <View style={styles.about}>
        <Text style={[styles.title, { fontSize: titleFontSize, color: th.text }]}>
          {pageTexts.title}
        </Text>
        <Text style={[styles.content, { fontSize, color: th.text }]}>
          {pageTexts.content}
        </Text>

        <View style={styles.infoBox}>
          <Text style={[styles.link, { fontSize, color: th.link }]} onPress={() => Linking.openURL(pageTexts.linkedinUrl)}>
            {pageTexts.linkedin}
          </Text>
          <Text style={[styles.link, { fontSize, color: th.link }]} onPress={() => Linking.openURL(pageTexts.githubUrl)}>
            {pageTexts.github}
          </Text>
          <Text style={[styles.link, { fontSize, color: th.link }]} onPress={() => Linking.openURL(pageTexts.youtubeUrl)}>
            {pageTexts.youtube}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={[styles.info, { fontSize, color: th.link }]} onPress={() => Linking.openURL(pageTexts.siteUrl)}>
            {pageTexts.site}
          </Text>
          <Text style={[styles.info, { fontSize, color: th.text }]}>
            {pageTexts.email}
          </Text>
        </View>

        <Text style={[styles.myApps, { fontSize, color: th.text }]}>
          {pageTexts.myApps}
        </Text>

        <TouchableOpacity
          onPress={() => {
            Linking.openURL(pageTexts.playStoreUrl);
          }}
        >
          <Image
            source={require("../assets/play-store-icon.png")}
            style={[
              styles.playStoreImage,
              { width: iconSize, height: iconSize },
            ]}
            alt="Play Store"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  about: { alignItems: "center", paddingHorizontal: 20, marginTop: 10 },
  title: { textAlign: "center" },
  content: { marginVertical: 20 },
  link: { marginBottom: 10 },
  infoBox: { marginVertical: 10 },
  info: { textAlign: "center", marginBottom: 10 },
  myApps: { marginVertical: 15, textAlign: "center" },
  playStoreImage: { width: 80, height: 80, marginBottom: 20 },
});

export default About;
