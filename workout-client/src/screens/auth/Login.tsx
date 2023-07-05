import { GestureResponderEvent, StyleSheet, View } from "react-native";
import React, { FC, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigation";
import { useAuth } from "../../contexts/auth";
import { Appbar, Button, HelperText, TextInput, Text } from "react-native-paper";
import { UserCredentials } from "../../types/contexts";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { LoginSchema } from "./schemas";
import { useTheme } from "../../contexts/theme";

type LoginProps = NativeStackScreenProps<AuthStackParamList, "Login">;

const Login: FC<LoginProps> = ({ navigation }) => {
  const [apiError, setApiError] = useState("");
  const { onSignIn } = useAuth();
  const {theme} = useTheme();
  const initialValues: UserCredentials = {
    email: "",
    password: "",
  };

  const login = async (values: UserCredentials) => {
    const errors = await onSignIn!(values);
    if (errors){
      setApiError(errors.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={theme.mode === "dark" ? 'light' : 'dark'} />
      <Appbar.Header>
        <Appbar.Content title={"Create Profile"}></Appbar.Content>
      </Appbar.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={async (values) => {
          await login(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <View style={styles.formContainer}>
            <View style={styles.formTextField}>
              <Text style={{color: theme.error}}>{apiError}</Text>
              <View style={styles.formTextField}>
                <TextInput
                  label="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={!!errors.email}
                />
                {errors.email && touched.email && <HelperText type="error">{errors.email}</HelperText>}
              </View>
              <View style={styles.formTextField}>
                <TextInput
                  label="Password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  secureTextEntry={true}
                  error={!!errors.password}
                />
                {errors.password && touched.password && <HelperText type="error">{errors.password}</HelperText>}
              </View>
            </View>
            <Button mode="contained" onPress={handleSubmit as unknown as (e: GestureResponderEvent) => void}>
              Sign In
            </Button>
            <View style={styles.linkContainer}>
              <Text >Don't have an account?</Text>
              <Button onPress={() => navigation.navigate("Register")}>Register</Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {flex: 1},
  formContainer: {
    paddingHorizontal: 30,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
  },

  formTextField: {
    marginVertical: 10,
  },
  linkContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
    alignItems: 'center',
  },
  link: {
    marginLeft: 5,
  },
});
