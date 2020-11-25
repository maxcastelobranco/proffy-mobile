import React, { useEffect, useState } from "react";
import {
  Easing,
  repeat,
  runOnUI,
  useAnimatedProps,
  useAnimatedRef,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { mix } from "react-native-redash";

import { AnimatedPath } from "../../reanimatedSvgComponents";

const GraphPath: React.FC = () => {
  const graphPathRef = useAnimatedRef<typeof AnimatedPath>();
  const [graphPathLength, setGraphPathLength] = useState(0);
  const graphPathAnimationDriver = useSharedValue(0);
  const graphPathAnimatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: mix(
        graphPathAnimationDriver.value,
        0.1,
        graphPathLength - 0.1
      ),
    };
  });
  useEffect(() => {
    runOnUI(() => {
      "worklet";
      graphPathAnimationDriver.value = repeat(
        withTiming(1, {
          duration: 2400,
          easing: Easing.bezier(0.65, 0, 0.35, 1),
        }),
        -1,
        true
      );
    })();
  }, [graphPathAnimationDriver]);

  return (
    <AnimatedPath
      id="AnimatedGraphPath"
      animatedProps={graphPathAnimatedProps}
      ref={graphPathRef}
      onLayout={() => setGraphPathLength(graphPathRef.current.getTotalLength)}
      d="M165.7441,133.5882a3.1345,3.1345,0,0,0,2.2588-1.0588,8.269,8.269,0,0,1,4.2511-2.7351c2.4722-.4548,2.6842-5.3031,5.6754-4.6414s3.3617,3.4677,7.2529,1.6942,2.8489-4.81,5.2147-4.4471,4.6324,3.9945,4.6589,5.6237,2.8288,1.7351,2.8288,1.7351"
      transform="translate(0 -2.1379)"
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={graphPathLength}
    />
  );
};

export default GraphPath;
