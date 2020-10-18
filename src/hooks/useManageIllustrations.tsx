import React, { createContext, useContext, useState } from "react";

interface ManageIllustrationsContextData {
  onBoarding: boolean;
  setOnBoarding: React.Dispatch<React.SetStateAction<boolean>>;
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  signUpSuccess: boolean;
  setSignUpSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  forgotPassword: boolean;
  setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
  forgotPasswordSuccess: boolean;
  setForgotPasswordSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  home: boolean;
  setHome: React.Dispatch<React.SetStateAction<boolean>>;
  profile: boolean;
  setProfile: React.Dispatch<React.SetStateAction<boolean>>;
  teacherSignUp: boolean;
  setTeacherSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const ManageIllustrationsContext = createContext<
  ManageIllustrationsContextData
>({} as ManageIllustrationsContextData);

const ManageIllustrationsProvider: React.FC = ({ children }) => {
  const [onBoarding, setOnBoarding] = useState(false);
  const [login, setLogin] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [home, setHome] = useState(false);
  const [profile, setProfile] = useState(false);
  const [teacherSignUp, setTeacherSignUp] = useState(false);

  return (
    <ManageIllustrationsContext.Provider
      value={{
        onBoarding,
        setOnBoarding,
        login,
        setLogin,
        signUpSuccess,
        setSignUpSuccess,
        forgotPassword,
        setForgotPassword,
        forgotPasswordSuccess,
        setForgotPasswordSuccess,
        home,
        setHome,
        profile,
        setProfile,
        teacherSignUp,
        setTeacherSignUp,
      }}
    >
      {children}
    </ManageIllustrationsContext.Provider>
  );
};

function useManageIllustrations(): ManageIllustrationsContextData {
  return useContext(ManageIllustrationsContext);
}

export { ManageIllustrationsProvider, useManageIllustrations };
