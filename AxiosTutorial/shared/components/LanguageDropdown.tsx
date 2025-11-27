import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from "react-native";

import colors from "../../constants/color";
import { useLangViewModel } from "../../features/auth/viewModel/LangViewModel";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "es", label: "Español" }
];

export default function LanguageDropdown() {
  const vmLang = useLangViewModel();
  
  
 
  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity
        onPress={() => vmLang.setOpen(!vmLang.open)}
        style={styles.dropdownHeader}
      >
        <Text style={styles.headerText}>
          {vmLang.selectedAppLanguage
            ? LANGUAGES.find((l) => l.code === vmLang.selectedAppLanguage)?.label
            : "Follow Device Language"}
        </Text>

        <Text style={styles.arrow}>{vmLang.open ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {/* Options */}
      {vmLang.open && (
        <View style={styles.dropdown}>
          <FlatList
            data={LANGUAGES}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => vmLang.changeLanguage(item.code)}
              >
                <Text style={styles.itemText}>{item.label}</Text>
                {item.code === vmLang.selectedAppLanguage && <Text style={styles.tick}>✓</Text>}
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.item} onPress={() => vmLang.followDeviceLanguage()}>
            <Text style={styles.itemText}>Follow Device Language</Text>
            {!vmLang.selectedAppLanguage && <Text style={styles.tick}>✓</Text>}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 16,
  },

  dropdownHeader: {
    backgroundColor: colors.cardUpperLayer,
    padding: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },

  arrow: {
    fontSize: 16,
    color: "#444",
  },

  dropdown: {
    marginTop: 6,
    backgroundColor: colors.cardUpperLayer,
    borderRadius: 10,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    position : 'absolute',
    top :  0 , 
    right :  0 ,
    zIndex : 999999,
  },

  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  itemText: {
    fontSize: 16,
    color: "#111",
  },

  tick: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "700",
  },
});
