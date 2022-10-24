import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import colors from "../config/colors";

export default function RadioButton({ data, onSelect }) {
  const [userOption, setUserOption] = useState(null);
  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
  };

  return (
    <View>
      {data.map((item) => {
        return (
          <Pressable
            key={item.value}
            style={
              item.value === userOption ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item.value)}
          >
            <Text style={styles.option}> {item.value}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    fontSize: 18,
    color: colors.medium,
    height: 30,
    marginVertical: 5,
  },
  unselected: {
    backgroundColor: colors.light,
    borderRadius: 10,
    margin: 5,
    padding: 10,
    width: 100,
    height: 50,
    textAlign: "center",
    justifyContent: "center",
  },
  selected: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    margin: 5,
    padding: 10,
    borderRadius: 10,
    width: 100,
    height: 50,
    textAlign: "center",
    justifyContent: "center",
  },
});
