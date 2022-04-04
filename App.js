import { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  ScrollView,
  RefreshControl,
} from "react-native";
import Todo from "./Todo";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const handleComplete = (goal) => {
    setTodos(
      todos.map((todo) => {
        if (todo.goal === goal) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      })
    );
  };

  const handleDelete = (index) => {
    const currentTodos = [...todos];
    currentTodos.splice(index, 1);
    setTodos(currentTodos);
  };

  const handleSubmit = () => {
    if (text === "") {
      alert("You must enter a todo.");
      return;
    }
    setTodos([...todos, { goal: text, isCompleted: false }]);
    setText("");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.todosContainer}>
          <Text style={styles.title}>Today's Todos</Text>
          {todos?.map((todo, index) => (
            <Todo
              key={index}
              todos={todo}
              handleComplete={handleComplete}
              handleDelete={handleDelete}
              id={index}
            />
          ))}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={text}
            style={styles.input}
            onChangeText={(text) => setText(text)}
            placeholder="Enter a todo..."
          />
          <Button style={styles.button} title="Add" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    margin: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  todosContainer: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
    padding: 10,
  },
  inputContainer: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    padding: 10,
    width: "70%",
    color: "rgb(26,26,26)",
    flex: 1,
    fontSize: 16,
  },
  button: {
    borderWidth: 1,
    color: "rgb(26,26,26)",
  },
});
