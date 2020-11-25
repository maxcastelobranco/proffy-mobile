import React, { useEffect } from "react";
import {
  Easing,
  repeat,
  runOnUI,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Path } from "react-native-svg";

import { AnimatedG } from "../../../reanimatedSvgComponents";

const PlayButton1: React.FC = () => {
  const play1AnimationDriver = useSharedValue(0);

  const play1AnimatedProps = useAnimatedProps(() => {
    return {
      opacity: play1AnimationDriver.value,
    };
  });

  useEffect(() => {
    runOnUI(() => {
      "worklet";
      play1AnimationDriver.value = repeat(
        withTiming(1, {
          duration: 2000,
          easing: Easing.bezier(0.7, 0, 0.84, 0),
        }),
        -1,
        true
      );
    })();
  }, [play1AnimationDriver]);

  return (
    <AnimatedG id="PlayButton1" animatedProps={play1AnimatedProps}>
      <Path
        d="M199.55,33.527a8.79,8.79,0,0,1,8.8383-8.872,8.6254,8.6254,0,0,1,8.8221,8.7814,8.7541,8.7541,0,0,1-8.9333,8.9042C203.3781,42.3112,199.317,38.071,199.55,33.527Z"
        transform="translate(0 -2.1379)"
        fill="#c7bee4"
      />
      <Path
        d="M215.0569,33.4869c.3416,3.8241-3.2365,6.9121-6.6674,6.8571a6.8478,6.8478,0,1,1-.0111-13.6956C212.0191,26.6085,215.397,29.692,215.0569,33.4869Z"
        transform="translate(0 -2.1379)"
        fill="#e5e5ef"
      />
      <Path
        d="M205.0474,33.4443c0-.874-.0315-1.7494.0075-2.6216.0646-1.4416,1.1272-2.1517,2.3961-1.5164,1.632.8171,3.2325,1.709,4.7852,2.6679a1.6772,1.6772,0,0,1-.0948,2.84,40.2762,40.2762,0,0,1-4.5437,2.5812c-1.4615.7044-2.5333-.0757-2.5495-1.7041C205.0408,34.9426,205.047,34.1934,205.0474,33.4443Z"
        transform="translate(0 -2.1379)"
        fill="#c7bee4"
      />
      <Path
        d="M207.0851,31.35c1.1086.6138,2.0483,1.1138,2.9663,1.6509.4754.2782.3887.5361-.088.7621-.922.4371-1.92,1.6867-2.6257,1.32-.7717-.4012-.175-1.8805-.2861-2.8822A7.09,7.09,0,0,1,207.0851,31.35Z"
        transform="translate(0 -2.1379)"
        fill="#e5e5ef"
      />
    </AnimatedG>
  );
};

export default PlayButton1;
