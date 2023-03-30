import { FC } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";


type LinkProps = {
  text: string;
  onPress: () => void;
  style: ViewStyle;
};

const Link: FC<LinkProps> = ({ text, onPress, style }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={{ color: theme.colors.primary }}>{text}</Text>
    </TouchableOpacity>
  );
};

export { Link };
