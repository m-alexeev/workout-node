import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { FC } from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { LoginType } from "../../types/api/auth";
import { Formik } from "formik";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Link } from "../../components/Link";
import { StatusBar } from "expo-status-bar";
import { LoginSchema } from "../../types/schemas/auth-schemas";

interface LoginFormValues extends LoginType {}

type LoginProps = NativeStackScreenProps<AuthStackParamList, "Login">;

const Login: FC<LoginProps> = ({ navigation }) => {
  const theme = useTheme();
  const initialValues: LoginFormValues = { email: "", password: "" };
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={theme.dark ? "light" : "dark"}></StatusBar>
      <Text style={styles.title} variant="titleMedium">
        Login
      </Text>
      <Formik
        validationSchema={LoginSchema}
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <View style={styles.formContainer}>
            {Object.keys(initialValues).map((value, index) => {
              const showErrors =
                !!errors[value as keyof LoginFormValues] &&
                touched[value as keyof LoginFormValues];
              return (
                <View key={index} style={styles.formTextField}>
                  <TextInput
                    error={showErrors}
                    label={value.charAt(0).toUpperCase() + value.slice(1)}
                    onChangeText={handleChange(value)}
                    onBlur={handleBlur(value)}
                    secureTextEntry={value === "password"}
                  />
                  {showErrors && (
                    <HelperText type="error" visible={showErrors}>
                      {errors[value as keyof LoginFormValues]}
                    </HelperText>
                  )}
                </View>
              );
            })}
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
          onPress={() => navigation.replace("Register")}
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

export default Login;
