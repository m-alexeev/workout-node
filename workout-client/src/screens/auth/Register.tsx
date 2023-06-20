import React, { FC, useState } from "react";
import {
  Appbar,
  Button,
  HelperText,
  Menu,
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
import { RegisterSchema } from "./schemas";
import { useConfig } from "../../contexts/config";
import { Platform } from "react-native";
import { MultiChoiceDialog } from "../../components/multichoiceDialog";

type RegisterProps = NativeStackScreenProps<AuthStackParamList, "Register">;

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const Register: FC<RegisterProps> = ({ navigation }) => {
  const { config, updateUnits, updateLanguage } = useConfig();
  const [menuVisible, setMenuVisible] = useState(false);

  const [dialog, setOpenDialog] = useState(false);

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
    if (config.units === "imperial") {
      if (values.height !== undefined) {
        values.height = values.height / 3.281;
      }
      if (values.weight !== undefined) {
        values.weight = values.weight / 2.205;
      }
    }
    // redirection will happen automatically as soon as user is set in context
    await onRegister!(values);
  };

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={theme.dark ? "light" : "dark"}></StatusBar>
      <Appbar.Header>
        <Appbar.Content title={"Create Profile"}></Appbar.Content>

        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon={MORE_ICON} onPress={openMenu}></Appbar.Action>
          }
        >
          <Menu.Item onPress={() => {setOpenDialog(true)}} leadingIcon="cog" title="Configure" />
        </Menu>
      </Appbar.Header>

      <MultiChoiceDialog
        title="Configuration"
        choices={["imperial", "metric"]}
        show={dialog}
        hideDialog={() => setOpenDialog(false)}
      ></MultiChoiceDialog>

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
                    <TextInput.Affix
                      text={config.units === "imperial" ? "ft" : "m"}
                    />
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
                      text={config.units === "imperial" ? "lbs" : "kg"}
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
