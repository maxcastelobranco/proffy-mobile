import React, { useEffect } from "react";
import { ClipPath, Defs, G, Path } from "react-native-svg";
import {
  Easing,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { mix } from "react-native-redash";

import { AnimatedPath } from "../../reanimatedSvgComponents";

const LINES_LENGTH = 280;

const SpeechBalloon: React.FC = () => {
  const animationDriver = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = mix(animationDriver.value, 0, -LINES_LENGTH);

    return {
      transform: [{ translateX }],
    };
  });

  useEffect(() => {
    runOnUI(() => {
      "worklet";
      animationDriver.value = withRepeat(
        withTiming(1, {
          duration: 10000,
          easing: Easing.bezier(0.65, 0, 0.35, 1),
        }),
        -1,
        true
      );
    })();
  }, [animationDriver]);

  return (
    <>
      <Defs>
        <ClipPath id="prefix__a">
          <Path
            d="M36.362 25.25c-.36-.442-.743-.867-1.076-1.327-1.17-1.617-2.742-1.961-4.73-1.935-8.614.11-17.23.048-25.845.046-3.192 0-4.705-1.497-4.708-4.654-.002-2.97-.007-5.939.002-8.908a4.016 4.016 0 014.39-4.364q16.544-.028 33.087.002a3.912 3.912 0 014.261 4.204q.02 4.82 0 9.64a3.828 3.828 0 01-4 4.054c-.873.02-1.068.326-1.006 1.077.052.64.01 1.287.01 1.93z"
            fill="#6842c1"
          />
        </ClipPath>
      </Defs>
      <G>
        <Path
          d="M36.362 23.111c-.36-.44-.743-.866-1.076-1.326-1.17-1.617-2.742-1.96-4.73-1.935-8.614.11-17.23.048-25.845.046-3.192 0-4.705-1.497-4.708-4.654-.002-2.97-.007-5.938.002-8.908a4.016 4.016 0 014.39-4.364q16.544-.028 33.087.002a3.912 3.912 0 014.261 4.204q.02 4.82 0 9.64a3.828 3.828 0 01-4 4.054c-.873.02-1.068.326-1.006 1.077.052.64.01 1.287.01 1.93z"
          fill="#6842c1"
        />
        <G
          id="Lines"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeMiterlimit={10}
          strokeWidth={2}
          clipPath="url(#prefix__a)"
        >
          <AnimatedPath
            d="M48.234 6.803h4.517M72.798 6.803h19.724M102.871 6.803h10.215M121.454 6.803h24.614M43.645 10.941h9.106M60.768 10.941h6.808M78.798 10.941h21.52M109.626 10.941h4.701M123.798 10.941h8.153M137.247 10.941h16.48M50.492 15.266h12.364M69.418 15.266h21.837M98.238 15.266h4.092M110.73 15.266h11.112M127.226 15.266h16.618M152.56 6.803h15.442M180.049 6.803h19.724M208.855 6.803h3.403M218.045 6.803h10.216M236.704 6.803h18.052M172.013 10.941h7.826M228.335 10.941h4.924M189.049 10.941h28.414M239.048 10.941h8.153M252.498 10.941h12.303M152.406 15.266h15.596M188.049 15.266h18.456M216.548 15.266h11.112M233.525 15.266h16.618"
            style={animatedStyle}
          />
        </G>
      </G>
    </>
  );
};

export default SpeechBalloon;
