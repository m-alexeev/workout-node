import React, { FC } from "react";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RegisterType } from "../../types/api/auth";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Link } from "../../components/Link";
import { AuthStackParamList } from "../../types/navigation";

interface RegisterFormValues extends RegisterType {
  password_conf: string;
}

type RegisterProps = NativeStackScreenProps<AuthStackParamList, "Register">;

const Register: FC<RegisterProps> = ({ navigation }) => {
  const theme = useTheme();
  const initialValues: RegisterFormValues = {
    email: "",
    password: "",
    password_conf: "",
    first_name: "",
    last_name: "",
  };
  

  return (
    <SafeAreaView
    style={[styles.container, { backgroundColor: theme.colors.background }]}

    >
      <Text style={styles.title} variant="titleMedium">
        Register
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit }) => (
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
    justifyContent: "center",
  },
  linkStyle: {
    marginLeft: 5,
  },
});

export default Register;
