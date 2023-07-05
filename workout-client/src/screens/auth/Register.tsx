import React, { FC, useState } from "react";
import { Appbar, Button, HelperText, Menu, TextInput, Text } from "react-native-paper";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserRegisterCredentials } from "../../types/contexts";
import { StatusBar } from "expo-status-bar";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { useAuth } from "../../contexts/auth";
import { RegisterSchema } from "./schemas";
import { Platform } from "react-native";
import { ConfigurationDialog } from "../../components/configurationDialog";
import { useTheme } from "../../contexts/theme";

type RegisterProps = NativeStackScreenProps<AuthStackParamList, "Register">;

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const Register: FC<RegisterProps> = ({ navigation }) => {
  const [apiError, setApiError] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [dialog, setOpenDialog] = useState(false);
  const { onRegister } = useAuth();
  const {theme} = useTheme();
  const initialValues: UserRegisterCredentials = {
    email: "",
    password: "",
    conf_password: "",
  };

  const register = async (values: UserRegisterCredentials) => {
    // redirection will happen automatically as soon as user is set in context
    const errors = await onRegister!(values);
    if (errors){
      setApiError(errors.message);
    }else{
      // Redirect to Success page
      navigation.replace("Success");
    }
  };

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={theme.mode === "dark" ? 'light' : 'dark'}></StatusBar>
      <Appbar.Header>
        <Appbar.Content title={"Create Profile"}></Appbar.Content>

        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon={MORE_ICON} onPress={openMenu}></Appbar.Action>}
        >
          <Menu.Item
            onPress={() => {
              setOpenDialog(true);
            }}
            leadingIcon="cog"
            title="Configure"
          />
        </Menu>
      </Appbar.Header>

      <ConfigurationDialog show={dialog} hideDialog={() => setOpenDialog(false)}></ConfigurationDialog>

      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={async (values, {resetForm}) => {
          await register(values);
          resetForm();
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
              <View style={styles.formTextField}>
                <TextInput
                  label="Confirm Password"
                  onChangeText={handleChange("conf_password")}
                  error={!!errors.conf_password}
                  secureTextEntry={true}
                  onBlur={handleBlur("conf_password")}
                />
                {errors.conf_password && touched.conf_password && (
                  <HelperText type="error">{errors.conf_password}</HelperText>
                )}
              </View>
            </View>
            <Button mode="contained" onPress={handleSubmit as unknown as (e: GestureResponderEvent) => void}>
              Create Profile
            </Button>
            <View style={styles.linkContainer}>
              <Text>Don't have an account?</Text>
              <Button onPress={() => navigation.navigate("Login")}>Login</Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
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
  linkStyle: {
    marginLeft: 5,
  },
});

export default Register;
