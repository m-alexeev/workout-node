import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { FC, useState } from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { LoginType } from "../../types/api/auth";
import { Formik } from "formik";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Link } from "../../components/Link";
import { StatusBar } from "expo-status-bar";
import { LoginSchema } from "../../types/schemas/auth-schemas";
import { useAuth } from "../../contexts/auth";
import { PopupDialog } from "../../components/errorDialog";

interface LoginFormValues extends LoginType {}

type LoginProps = NativeStackScreenProps<AuthStackParamList, "Login">;

const Login: FC<LoginProps> = ({ navigation }) => {
  const { onLogin } = useAuth();
  const theme = useTheme();
  const initialValues: LoginFormValues = { email: "", password: "" };
  const [error, setError] = useState<string | undefined>();

  const login = async (values: LoginFormValues) => {
    const res = await onLogin!(values);
    if (res && res.error) {
      setError(res.message);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={theme.dark ? "light" : "dark"}></StatusBar>
      <PopupDialog
        title="Error"
        content={error || ""}
        show={!!error}
        hideDialog={() => setError(undefined)}
      ></PopupDialog>
      <Text style={styles.title} variant="titleMedium">
        Login
      </Text>
      <Formik
        validationSchema={LoginSchema}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues}
        onSubmit={login}
      >
        {({ handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting }) => (
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
              loading={isSubmitting}
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
