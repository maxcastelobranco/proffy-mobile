import { useTheme } from "@shopify/restyle";
import React from "react";

import { Theme } from "../../../../theme";
import WhoAreYou from "../Forms/WhoAreYou";
import EmailPassword from "../Forms/EmailPassword";
import { BaseControllerProps } from "../../../../utils/types";

interface SlideData {
  title: string;
  Form: React.FC<BaseControllerProps>;
  buttonBackgroundColor: string;
  buttonLabel: string;
  enabled: boolean;
}

const useSlideData = (
  scrollEnabled: boolean,
  submitEnabled: boolean
): SlideData[] => {
  const theme = useTheme<Theme>();

  return [
    {
      title: "Who are you?",
      Form: WhoAreYou,
      buttonBackgroundColor: theme.colors.primary,
      buttonLabel: "Next",
      enabled: scrollEnabled,
    },
    {
      title: "Email and Password",
      Form: EmailPassword,
      buttonBackgroundColor: theme.colors.secondary,
      buttonLabel: "Complete registration",
      enabled: submitEnabled,
    },
  ];
};

export default useSlideData;
