import { FC } from "react";
import { View } from "react-native";
import { Button, Dialog, Text, Portal } from "react-native-paper";

interface PopupDialogProps {
  type?: "error" | "warning" | "success" | "info"
  title: string;
  content: string;
  hideDialog: () => void;
  show: boolean;
}

const PopupDialog: FC<PopupDialogProps> = ({
  title,
  content,
  hideDialog,
  show,
}) => {
  return (
    <Portal>
      <Dialog visible={show} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{content}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export { PopupDialog };
