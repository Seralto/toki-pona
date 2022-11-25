import { React, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const Settings = ({
  onSelectLanguage,
  onSelectPage,
  pagesOptions,
  pageTexts,
  language,
  page,
}) => {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [languageValue, setLanguageValue] = useState(language);
  const [pageOpen, setPageOpen] = useState(false);
  const [pageValue, setPageValue] = useState(page);

  const [languages, setLanguages] = useState([
    { label: "Português", value: "portuguese" },
    { label: "English", value: "english" },
    { label: "Español", value: "spanish" },
  ]);

  const [pages, setPages] = useState(
    Object.keys(pagesOptions).map((key) => ({
      label: pagesOptions[key],
      value: key,
    }))
  );

  const setLanguage = (language) => {
    onSelectLanguage(language.value);
  };

  const setPage = (page) => {
    onSelectPage(page.value);
  };

  return (
    <View style={styles.settings}>
      <Text style={styles.title}>{pageTexts.title}</Text>

      <View style={styles.languageBox}>
        <Text style={styles.subtitle}>{pageTexts.defaultLanguage}</Text>
        <DropDownPicker
          zIndex={2000}
          zIndexInverse={1000}
          closeOnBackPressed={true}
          items={languages}
          open={languageOpen}
          value={languageValue}
          setOpen={setLanguageOpen}
          setValue={setLanguageValue}
          setItems={setLanguages}
          onSelectItem={setLanguage}
          placeholder={pageTexts.defaultLanguage}
          textStyle={{ fontSize: 18 }}
          listMode="SCROLLVIEW"
          theme="DARK"
        />
      </View>

      <View style={styles.pageBox}>
        <Text style={styles.subtitle}>{pageTexts.defaultPage}</Text>
        <DropDownPicker
          zIndex={1000}
          zIndexInverse={2000}
          closeOnBackPressed={true}
          items={pages}
          open={pageOpen}
          value={pageValue}
          setOpen={setPageOpen}
          setValue={setPageValue}
          setItems={setPages}
          onSelectItem={setPage}
          placeholder={pageTexts.defaultPage}
          textStyle={{ fontSize: 18 }}
          listMode="SCROLLVIEW"
          theme="DARK"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settings: {
    padding: 30,
  },
  title: {
    fontSize: 28,
    color: "#c3c3c3",
    marginTop: 40,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 22,
    color: "#c3c3c3",
    marginBottom: 10,
  },
  languageBox: {
    marginTop: 30,
    flex: 1,
  },
  pageBox: {
    height: 300,
    marginTop: 30,
    flex: 1,
  },
});

export default Settings;
