import React, { FC, useState } from "react";
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RegisterType } from "../../types/api/auth";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Link } from "../../components/Link";
import { AuthStackParamList } from "../../types/navigation";
import { StatusBar } from "expo-status-bar";
import { RegistrationSchema } from "../../types/schemas/auth-schemas";
import { useAuth } from "../../contexts/auth";
import { PopupDialog } from "../../components/errorDialog";

interface RegisterFormValues extends RegisterType {
  password_conf: string;
}

type RegisterProps = NativeStackScreenProps<AuthStackParamList, "Register">;

const Register: FC<RegisterProps> = ({ navigation }) => {
  const theme = useTheme();
  const { onRegister } = useAuth();
  const [error, setError] = useState<string | undefined>();
  const initialValues: RegisterFormValues = {
    email: "",
    password: "",
    password_conf: "",
    first_name: "",
    last_name: "",
  };

  const register = async (values: RegisterType) => {
    const res = await onRegister!(values);
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
      />
      <Text style={styles.title} variant="titleMedium">
        Register
      </Text>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <View style={styles.formContainer}>
            {Object.keys(initialValues).map((value, index) => {
              const showErrors =
                !!errors[value as keyof RegisterFormValues] &&
                touched[value as keyof RegisterFormValues];
              return (
                <View key={index} style={styles.formTextField}>
                  <TextInput
                    key={index}
                    label={value.charAt(0).toUpperCase() + value.slice(1)}
                    onChangeText={handleChange(value)}
                    onBlur={handleBlur(value)}
                    secureTextEntry={value === "password"}
                  />
                  {showErrors && (
                    <HelperText type="error" visible={showErrors}>
                      {errors[value as keyof RegisterFormValues]}
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
        <Text>Already have an Account?</Text>
        <Link
          style={styles.linkStyle}
          text="Login"
          onPress={() => navigation.replace("Login")}
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
