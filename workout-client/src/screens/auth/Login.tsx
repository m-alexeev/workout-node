import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { LoginType } from "../../types/api/auth";
import { Formik } from "formik";
import { AuthStackParamList } from "../../types/navigation";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Link } from "../../components/Link";

interface LoginFormValues extends LoginType {}

type LoginProps = NativeStackScreenProps<AuthStackParamList, "Login">;

const Login = ({ navigation }: LoginProps) => {
  const theme = useTheme();
  const initialValues: LoginFormValues = { email: "", password: "" };
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={styles.title} variant="titleMedium">
        Login
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formContainer}>
            {Object.keys(initialValues).map((value, index) => (
              <TextInput
                key={index}
                style={styles.formTextField}
                label={value.charAt(0).toUpperCase() + value.slice(1)}
                onChangeText={handleChange(value)}
                onBlur={handleBlur(value)}
                secureTextEntry={value === "password"}
              />
            ))}
            <Button
              mode="contained"
              onPress={
                handleSubmit as unknown as (e: GestureResponderEvent) => void
              }
            >
              Login
            </Button>
          </View>
        )}
      </Formik>
      <View style={styles.linkContainer}>
        <Text>Dont have an Account?</Text>
        <Link
          style={styles.linkStyle}
          text="Register"
          onPress={() => navigation.navigate("Register")}
        ></Link>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  formTextField: {
    marginBottom: 10,
  },
  linkContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent:"center",
  },
  linkStyle: {
    marginLeft: 5
  }
});

export default Login;
