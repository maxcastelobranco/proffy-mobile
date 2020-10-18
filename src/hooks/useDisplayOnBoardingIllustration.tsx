import React, { createContext, useContext, useState } from "react";

interface DisplayOnBoardingIllustrationContextData {
  shouldDisplayIllustration: boolean;
  setShouldDisplayIllustration: React.Dispatch<React.SetStateAction<boolean>>;
}

const DisplayOnBoardingIllustrationContext = createContext<
  DisplayOnBoardingIllustrationContextData
>({} as DisplayOnBoardingIllustrationContextData);

const DisplayOnBoardingIllustrationProvider: React.FC = ({ children }) => {
  const [shouldDisplayIllustration, setShouldDisplayIllustration] = useState(
    true
  );

  return (
    <DisplayOnBoardingIllustrationContext.Provider
      value={{ shouldDisplayIllustration, setShouldDisplayIllustration }}
    >
      {children}
    </DisplayOnBoardingIllustrationContext.Provider>
  );
};

function useDisplayOnBoardingIllustration(): DisplayOnBoardingIllustrationContextData {
  return useContext(DisplayOnBoardingIllustrationContext);
}

export {
  DisplayOnBoardingIllustrationProvider,
  useDisplayOnBoardingIllustration,
};
