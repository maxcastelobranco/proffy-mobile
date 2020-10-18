import React from "react";
import Svg, { ClipPath, Path, SvgProps, Defs, G } from "react-native-svg";

const LongArrow: React.FC<SvgProps> = (props) => {
  return (
    <Svg width={74} height={40} viewBox="0 0 74 40" fill="none" {...props}>
      <G
        clipPath="url(#prefix__clip0)"
        stroke="#9C98A6"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M61 20H13M55.999 14.999L61 20l-5.001 5.001" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" transform="rotate(-90 20 20)" d="M0 0h40v74H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default LongArrow;
