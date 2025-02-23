import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import Twitter2 from "../images/twitter2.webp";  // Adjust the path if necessary

const Login = ({ setIsConnected }) => {
  const [form, setForm] = useState({
    login: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation();

  const handleConnection = (e) => {
    e.preventDefault();
    // Use axios instead of fetch
    axios
      .post("http://localhost:8000/api/loginGuests", {
        email: form.login,
        password: form.password,
        is_online: true,
      })
      .then((response) => {
        const data = response.data;
        if (data.user && data.token) {
          localStorage.setItem("lastName", data.user.lastName);
          localStorage.setItem("firstName", data.user.firstName);
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.user.id);
          navigation.navigate("Home");
          setIsConnected(true);
        } else {
          setIsError(true);
        }
      })
      .catch(() => setIsError(true));
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.form]}>
        <Image source={Twitter2} style={styles.logo} />
        <Text style={styles.title}>Log In To Twitter</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={form.login}
          onChangeText={(text) => setForm({ ...form, login: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
        />
        <TouchableOpacity style={styles.button} onPress={handleConnection}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        {isError && (
          <Text style={styles.error}>Email or password is incorrect</Text>
        )}
        <View style={styles.linksContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgetPassword")}
          >
            <Text style={styles.link}>Forget Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: "100%",
  },
  form: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    height: "65%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#999696",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    padding: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#1DA1F2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  link: {
    color: "#1DA1F2",
    textDecorationLine: "underline",
  },
});

export default Login;
