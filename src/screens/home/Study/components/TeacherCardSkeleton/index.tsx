import React from "react";
import { useTheme } from "@shopify/restyle";

import { useStyles as useCardStyles } from "../TeacherCard/styles";
import { Box, Theme } from "../../../../../theme";
import Skeleton from "../../../../../components/animated/Skeleton";
import { useStyles as useHeaderStyles } from "../TeacherCard/components/CardHeader/styles";
import responsivePixelSize from "../../../../../utils/responsivePixelSize";
import { WEEKDAYS } from "../../../components/TeacherForm/components/AvailableHours/components/WeekdayController/weekdays";
import ScheduleDisplay from "../TeacherCard/components/ScheduleDisplay";
import { useStyles as useFooterStyles } from "../TeacherCard/components/CardFooter/styles";

const TeacherCardSkeleton: React.FC = () => {
  const theme = useTheme<Theme>();

  const {
    containerStyles: cardContainerStyles,
    boxShadowStyle,
    CARD_WIDTH,
  } = useCardStyles();
  const { containerStyles: headerStyles, AVATAR_WIDTH } = useHeaderStyles();
  const { rowStyles } = useFooterStyles();

  return (
    <Box width={CARD_WIDTH} {...cardContainerStyles} style={boxShadowStyle}>
      <Box {...headerStyles}>
        <Skeleton
          width={AVATAR_WIDTH}
          height={AVATAR_WIDTH}
          boxProps={{
            backgroundColor: "background1",
          }}
          overrideThemeStyle={{
            borderRadius: AVATAR_WIDTH / 2,
          }}
        />
        <Box marginLeft="s">
          <Skeleton
            width={responsivePixelSize(162)}
            height={responsivePixelSize(25)}
            boxProps={{
              backgroundColor: "titleDark",
              borderRadius: "default",
              marginBottom: "xs",
            }}
          />
          <Skeleton
            width={responsivePixelSize(60)}
            height={responsivePixelSize(20)}
            boxProps={{
              backgroundColor: "baseTextDark",
              borderRadius: "default",
            }}
          />
        </Box>
      </Box>
      <Box marginBottom="xs" alignItems="center">
        <Skeleton
          width={CARD_WIDTH - theme.spacing.m * 2}
          height={12}
          boxProps={{
            backgroundColor: "baseTextDark",
            borderRadius: "default",
          }}
        />
        <Skeleton
          width={CARD_WIDTH - theme.spacing.m * 2}
          height={12}
          boxProps={{
            marginTop: "xxs",
            backgroundColor: "baseTextDark",
            borderRadius: "default",
          }}
        />
        <Skeleton
          width={CARD_WIDTH - theme.spacing.m * 2}
          height={12}
          boxProps={{
            marginTop: "xxs",
            backgroundColor: "baseTextDark",
            borderRadius: "default",
          }}
        />
      </Box>
      {WEEKDAYS.map((weekday) => {
        return (
          <ScheduleDisplay key={weekday} available={false} {...{ weekday }} />
        );
      })}
      <Box {...rowStyles} marginHorizontal="xxs">
        <Skeleton
          width={responsivePixelSize(150)}
          height={12}
          boxProps={{
            backgroundColor: "baseTextDark",
            borderRadius: "default",
          }}
        />
        <Skeleton
          width={responsivePixelSize(107)}
          height={12}
          boxProps={{
            backgroundColor: "primary",
            borderRadius: "default",
          }}
        />
      </Box>
      <Skeleton
        width={CARD_WIDTH - theme.spacing.l * 2}
        height={responsivePixelSize(32)}
        boxProps={{
          backgroundColor: "secondary",
          borderRadius: "default",
          marginTop: "xs",
          alignSelf: "center",
        }}
      />
    </Box>
  );
};

export default TeacherCardSkeleton;
