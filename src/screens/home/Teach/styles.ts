import { BoxProps, TextProps } from "@shopify/restyle";

import { Theme } from "../../../theme";

export const useStyles = () => {
  const containerStyles: BoxProps<Theme> = {
    flex: 1,
    backgroundColor: "primary",
  };
  const teacherRegistrationContainerStyles: BoxProps<Theme> = {
    flex: 2.4,
    backgroundColor: "background3",
  };
  const pageDescriptionContainerStyles: BoxProps<Theme> = {
    flex: 1,
    backgroundColor: "primary",
    paddingHorizontal: "l",
  };
  const pageTitleStyles: TextProps<Theme> = {
    variant: "usernameBig",
    marginTop: "ml",
    marginBottom: "xs",
  };
  const pageDescriptionStyles: TextProps<Theme> = {
    variant: "regularTextMedium",
    color: "baseText",
  };

  return {
    containerStyles,
    teacherRegistrationContainerStyles,
    pageDescriptionContainerStyles,
    pageTitleStyles,
    pageDescriptionStyles,
  };
};
