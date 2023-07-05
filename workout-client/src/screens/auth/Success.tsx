import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { Button, Text } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigation";
import { useTheme } from "../../contexts/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

type SuccessProps = NativeStackScreenProps<AuthStackParamList, "Success">;

const Success: FC<SuccessProps> = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={theme.mode === "dark" ? "light" : "dark"}></StatusBar>
      <View style={styles.innerContainer}>
        <Text style={{ textAlign: "center" }} variant="headlineSmall">
          Success
        </Text>
        <View style={styles.contentContainer}>
          <Text style={{ marginBottom: 10 }}>Account Created successfully, you can now Login</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          style={{ width: 150, alignSelf: "center" }}
          mode="contained"
          onPress={() => navigation.replace("Login")}
        >
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  contentContainer: {
    margin: 10,
    justifyContent: "space-between",
  },
  footer: {
    height: 100,
  },
});

export default Success;
