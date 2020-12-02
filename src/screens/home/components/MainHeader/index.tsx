import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { Feather } from "@expo/vector-icons";

import responsivePixelSize from "../../../../utils/responsivePixelSize";
import { Box, Text, Theme } from "../../../../theme";
import RippleButton from "../../../../components/static/RippleButton";
import Proffy, {
  PROFFY_ASPECT_RATIO,
} from "../../../../components/svgs/static/Proffy";
import { useAppContext } from "../../../../context";
import { ActiveIllustrationActionTypes } from "../../../../context/reducers/activeIllustrationReducer";

import { useStyles } from "./styles";

const CHEVRONS_SIZE = responsivePixelSize(28);
const LOGO_WIDTH = responsivePixelSize(48);
const LOGO_HEIGHT = LOGO_WIDTH * PROFFY_ASPECT_RATIO;

interface MainHeaderProps {
  label: string;
}

const MainHeader: React.FC<MainHeaderProps> = ({ label }) => {
  const { dispatch } = useAppContext();
  const navigation = useNavigation();
  const theme = useTheme<Theme>();

  const { containerStyles, labelStyles } = useStyles();

  const onPress = () => {
    dispatch({
      type: ActiveIllustrationActionTypes.Update,
      payload: {
        name: "homeIllustration",
      },
    });
    navigation.goBack();
  };

  return (
    <Box {...containerStyles}>
      <RippleButton {...{ onPress }}>
        <Feather
          name="chevrons-left"
          color={theme.colors.baseText}
          size={CHEVRONS_SIZE}
        />
      </RippleButton>
      <Text {...labelStyles}>{label}</Text>
      <Proffy width={LOGO_WIDTH} height={LOGO_HEIGHT} />
    </Box>
  );
};

export default MainHeader;
