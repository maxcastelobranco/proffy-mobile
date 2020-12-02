import React, { useEffect } from "react";
import {
  Easing,
  withRepeat,
  runOnUI,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Path } from "react-native-svg";

import { AnimatedG } from "../../../reanimatedSvgComponents";

const PlayButton3: React.FC = () => {
  const play3AnimationDriver = useSharedValue(0);

  const play3AnimatedProps = useAnimatedProps(() => {
    return {
      opacity: play3AnimationDriver.value,
    };
  });

  useEffect(() => {
    runOnUI(() => {
      "worklet";
      play3AnimationDriver.value = withRepeat(
        withTiming(1, {
          duration: 2400,
          easing: Easing.bezier(0.7, 0, 0.84, 0),
        }),
        -1,
        true
      );
    })();
  }, [play3AnimationDriver]);

  return (
    <AnimatedG id="PlayButton3" animatedProps={play3AnimatedProps}>
      <Path
        d="M198.93,103.3434a8.79,8.79,0,0,1,8.8384-8.872,8.6253,8.6253,0,0,1,8.822,8.7815,8.7539,8.7539,0,0,1-8.9333,8.9041C202.7583,112.1277,198.6972,107.8874,198.93,103.3434Z"
        transform="translate(0 -2.1379)"
        fill="#c7bee4"
      />
      <Path
        d="M214.4372,103.3033c.3416,3.8241-3.2365,6.9121-6.6675,6.8572a6.8479,6.8479,0,1,1-.011-13.6957C211.3993,96.425,214.7772,99.5084,214.4372,103.3033Z"
        transform="translate(0 -2.1379)"
        fill="#e5e5ef"
      />
      <Path
        d="M204.4276,103.2608c0-.874-.0315-1.7494.0076-2.6217.0645-1.4415,1.1271-2.1517,2.3961-1.5163,1.6319.8171,3.2324,1.7089,4.7851,2.6678a1.6772,1.6772,0,0,1-.0948,2.84,40.2682,40.2682,0,0,1-4.5436,2.5812c-1.4616.7044-2.5333-.0756-2.5495-1.7041C204.421,104.7591,204.4272,104.01,204.4276,103.2608Z"
        transform="translate(0 -2.1379)"
        fill="#c7bee4"
      />
      <Path
        d="M206.4654,101.1659c1.1086.6139,2.0483,1.1138,2.9662,1.6509.4755.2783.3888.5362-.088.7622-.9219.437-1.92,1.6866-2.6257,1.32-.7717-.4011-.175-1.88-.2861-2.8822A7.0744,7.0744,0,0,1,206.4654,101.1659Z"
        transform="translate(0 -2.1379)"
        fill="#e5e5ef"
      />
    </AnimatedG>
  );
};

export default PlayButton3;
