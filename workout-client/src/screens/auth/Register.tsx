import React, { FC, useState } from "react";
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LocalUser } from "../../types/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Formik } from "formik";
import { useAuth } from "../../contexts/auth";
import { PopupDialog } from "../../components/errorDialog";

type RegisterProps = NativeStackScreenProps<AuthStackParamList, "Register">;

const Register: FC<RegisterProps> = ({ navigation }) => {
  const [error, setError] = useState<string | undefined>();
  const { onRegister } = useAuth();
  const theme = useTheme();
  const initialValues: LocalUser = {
    first_name: "",
    last_name: "",
    gender: "male",
    height: undefined,
    weight: undefined,
  };

  const registerLocal = async (values: LocalUser) => {
    const res = await onRegister!(values);
    if (res && res.error) {
      setError(res.message);
    } else {
      navigation.replace("Success");
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
        Create Profile
      </Text>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values, { resetForm }) => {
          await registerLocal(values);
          resetForm();
        }}
      ></Formik>
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
