import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

const Todo = ({ todos, id, handleComplete, handleDelete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{todos.goal}</Text>
      <View style={styles.compilationContainer}>
      <Text style={styles.compilation}>
        {todos.isCompleted ? "Completed" : "Uncompleted"}
      </Text>
      <TouchableOpacity
          style={todos.isCompleted ? styles.toggleGreen : styles.toggleRed}
          onPress={() => handleComplete(todos.goal)}
        />
      </View>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(id)}>
          <Entypo name="trash" size={20} color="black" />
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#00C1A8",
    padding: 10,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  compilationContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,

  },
  text: {
    fontSize: 16,
    color: "black",
    flex: 1,
  },
  compilation: {
    fontSize: 12,
  },
  toggleGreen: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "green",
    marginLeft: 5,
  },
  toggleRed: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "red",
    marginLeft: 5,
  },
});

export default Todo;
