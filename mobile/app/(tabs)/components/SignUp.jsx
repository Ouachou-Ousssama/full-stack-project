import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";  // Import axios

import Twitter2 from "../images/twitter2.webp"; // Assuming image is locally available

const SignUp = () => {
  const [signUp, setSignUp] = useState({
    firstName: "",
    lastName: "",
    dateBirth: "",
    email: "",
    password: "",
  });

  const navigation = useNavigation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      signUp.firstName &&
      signUp.lastName &&
      signUp.dateBirth &&
      signUp.email &&
      signUp.password
    ) {
      axios
        .post("http://localhost:8000/api/createGuests", {
          firstName: signUp.firstName,
          lastName: signUp.lastName,
          dateOfBirth: signUp.dateBirth,
          email: signUp.email,
          password: signUp.password,
        })
        .then((response) => {
          console.log("API Response: ", response.data);
          // Continue with the signup logic
        })
        .catch((error) => {
          console.error("Error during signup:", error);
          // Handle errors appropriately
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <Image source={Twitter2} style={styles.logo} />
        <Text style={styles.title}>Create An Account</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={(text) => setSignUp({ ...signUp, firstName: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={(text) => setSignUp({ ...signUp, lastName: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          secureTextEntry={false}
          onChangeText={(text) => setSignUp({ ...signUp, dateBirth: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setSignUp({ ...signUp, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setSignUp({ ...signUp, password: text })}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>CREATE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  backButtonContainer: {
    width: "100%",
    marginBottom: 20,
    alignItems: "flex-start",
  },
  backButton: {
    fontSize: 16,
    color: "#1DA1F2",
    textDecorationLine: "underline",
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 3, // Shadow effect
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
    color: "#000",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#1DA1F2",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SignUp;
