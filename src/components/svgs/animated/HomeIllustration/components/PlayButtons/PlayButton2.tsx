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

const PlayButton2: React.FC = () => {
  const play2AnimationDriver = useSharedValue(0);

  const play2AnimatedProps = useAnimatedProps(() => {
    return {
      opacity: play2AnimationDriver.value,
    };
  });

  useEffect(() => {
    runOnUI(() => {
      "worklet";
      play2AnimationDriver.value = repeat(
        withTiming(1, {
          duration: 2200,
          easing: Easing.bezier(0.7, 0, 0.84, 0),
        }),
        -1,
        true
      );
    })();
  }, [play2AnimationDriver]);

  return (
    <AnimatedG id="PlayButton2" animatedProps={play2AnimatedProps}>
      <Path
        d="M198.8615,68.5692A8.79,8.79,0,0,1,207.7,59.6971a8.6255,8.6255,0,0,1,8.822,8.7815,8.754,8.754,0,0,1-8.9333,8.9042C202.69,77.3534,198.6284,73.1131,198.8615,68.5692Z"
        transform="translate(0 -2.1379)"
        fill="#c7bee4"
      />
      <Path
        d="M214.3684,68.5291c.3416,3.8241-3.2365,6.9121-6.6675,6.8571a6.8479,6.8479,0,1,1-.011-13.6957C211.3305,61.6507,214.7085,64.7342,214.3684,68.5291Z"
        transform="translate(0 -2.1379)"
        fill="#e5e5ef"
      />
      <Path
        d="M204.3588,68.4865c0-.874-.0315-1.7494.0076-2.6216.0646-1.4416,1.1272-2.1518,2.3961-1.5164,1.6319.8171,3.2324,1.7089,4.7851,2.6679a1.6773,1.6773,0,0,1-.0947,2.84,40.2688,40.2688,0,0,1-4.5437,2.5811c-1.4615.7045-2.5333-.0756-2.5495-1.704C204.3522,69.9848,204.3584,69.2356,204.3588,68.4865Z"
        transform="translate(0 -2.1379)"
        fill="#c7bee4"
      />
    </AnimatedG>
  );
};

export default PlayButton2;
