import React from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RegisterType } from "../../types/api/auth";

interface RegisterFormValues extends RegisterType {
  password_conf: string;
}

const Register = () => {
  const initialValues: RegisterFormValues = {
    email: "",
    password: "",
    password_conf: "",
    first_name: "",
    last_name: "",
  };

  return (
    <SafeAreaView>
      <Text variant="titleMedium">Register</Text>
    </SafeAreaView>
  );
};

export default Register;
