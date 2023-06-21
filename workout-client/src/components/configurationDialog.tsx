import { FC } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Dialog,
  Text,
  Portal,
  SegmentedButtons,
} from "react-native-paper";
import { useConfig } from "../contexts/config";
import { LanguageType, UnitType } from "../types/config";

interface ConfigurationDialogProps {
  hideDialog: () => void;
  show: boolean;
}

const ConfigurationDialog: FC<ConfigurationDialogProps> = ({
  hideDialog,
  show,
}) => {
  const { config, updateLanguage, updateUnits } = useConfig();

  const languageButtons: { value: LanguageType; label: string }[] = [
    { value: "en", label: "English" },
    { value: "ru", label: "Russian" },
  ];
  const unitButtons: { value: UnitType; label: string }[] = [
    { value: "metric", label: "Metric (kg)" },
    { value: "imperial", label: "Imperial (lb)" },
  ];

  return (
    <Portal>
      <Dialog visible={show} onDismiss={hideDialog}>
        <Dialog.Title>Configuration</Dialog.Title>
        <Dialog.Content>
          <View>
            <View style={styles.configContainer}>
              <Text variant="titleMedium" style={styles.label}>Language</Text>
              <SegmentedButtons
                value={config.language}
                onValueChange={(value) => updateLanguage(value as LanguageType)}
                buttons={languageButtons}
              />
            </View>
            <View style={styles.configContainer}>
              <Text variant="titleMedium" style={styles.label}>Units</Text>
              <SegmentedButtons
                value={config.units}
                onValueChange={(value) => updateUnits(value as UnitType)}
                buttons={unitButtons}
              />
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  configContainer: {
    marginVertical: 5,
  },
  label: {
    marginBottom:3,
  },
});

export { ConfigurationDialog };
