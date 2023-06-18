import React, { FC, useState } from "react";
import {
  Button,
  HelperText,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LocalUser } from "../../types/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { useAuth } from "../../contexts/auth";
import { PopupDialog } from "../../components/errorDialog";
import DropDownPicker from "react-native-dropdown-picker";
import { RegisterSchema } from "./schemas";

type RegisterProps = NativeStackScreenProps<AuthStackParamList, "Register">;

const Register: FC<RegisterProps> = ({ navigation }) => {
  const [error, setError] = useState<string | undefined>();
  const [units, setUnits] = useState<"Metric" | "Imperial">("Metric");
  const { onRegister } = useAuth();
  const theme = useTheme();
  const initialValues: LocalUser = {
    first_name: "",
    last_name: "",
    height: undefined,
    weight: undefined,
  };

  const registerLocal = async (values: LocalUser) => {
    // convert units if entered in Imperial
    if (units === "Imperial") {
      if (values.height !== undefined) {
        values.height = values.height / 3.281;
      }
      if (values.weight !== undefined) {
        values.weight = values.weight / 2.205;
      }
    }
    const res = await onRegister!(values);
    if (res && res.error) {
      setError(res.message);
    } else {
      navigation.replace("Success");
    }
  };

  const changeUnits = (value: any) => {
    setUnits(value);
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
        validationSchema={RegisterSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={async (values, { resetForm }) => {
          await registerLocal(values);
          resetForm();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <View style={styles.formContainer}>
            <SegmentedButtons
              style={styles.units}
              value={units}
              onValueChange={(value) => changeUnits(value)}
              buttons={[
                { value: "Imperial", label: "Imperial" },
                { value: "Metric", label: "Metric" },
              ]}
            />
            <View style={styles.formTextField}>
              <View style={styles.formTextField}>
                <TextInput
                  label="First Name *"
                  onChangeText={handleChange("first_name")}
                  onBlur={handleBlur("first_name")}
                  error={!!errors.first_name}
                />
                {errors.first_name && touched.first_name && (
                  <HelperText type="error">{errors.first_name}</HelperText>
                )}
              </View>
              <View style={styles.formTextField}>
                <TextInput
                  label="Last Name *"
                  onChangeText={handleChange("last_name")}
                  onBlur={handleBlur("last_name")}
                  error={!!errors.last_name}
                />
                {errors.last_name && touched.last_name && (
                  <HelperText type="error">{errors.last_name}</HelperText>
                )}
              </View>
              <View style={styles.formTextField}>
                <TextInput
                  label="Height"
                  onChangeText={handleChange("height")}
                  onBlur={handleBlur("height")}
                  keyboardType="numeric"
                  error={!!errors.height}
                  right={
                    <TextInput.Affix text={units === "Imperial" ? "ft" : "m"} />
                  }
                />
                {errors.height && touched.height && (
                  <HelperText type="error">{errors.height}</HelperText>
                )}
              </View>
              <View style={styles.formTextField}>
                <TextInput
                  label="Weight"
                  onChangeText={handleChange("weight")}
                  keyboardType="numeric"
                  error={!!errors.weight}
                  right={
                    <TextInput.Affix
                      text={units === "Imperial" ? "lbs" : "kg"}
                    />
                  }
                  onBlur={handleBlur("weight")}
                />
                {errors.weight && touched.weight && (
                  <HelperText type="error">{errors.weight}</HelperText>
                )}
              </View>
            </View>

            <Button
              mode="contained"
              onPress={
                handleSubmit as unknown as (e: GestureResponderEvent) => void
              }
            >
              Create Profile
            </Button>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  units: {
    marginHorizontal: 20,
    marginTop: 5,
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  formTextField: {
    marginVertical: 10,
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
