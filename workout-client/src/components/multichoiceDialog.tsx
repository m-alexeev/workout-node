import { FC } from "react";
import { ScrollView, View } from "react-native";
import { Button, Dialog, Text, Portal } from "react-native-paper";

interface MultiChoiceDialogProps {
  title: string;
  choices: string[];
  hideDialog: () => void;
  show: boolean;
}

const MultiChoiceDialog: FC<MultiChoiceDialogProps> = ({
  title,
  choices,
  hideDialog,
  show,
}) => {
  return (
    <Portal>
      <Dialog visible={show} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
            <Text>Scrollable area example</Text>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export { MultiChoiceDialog };
