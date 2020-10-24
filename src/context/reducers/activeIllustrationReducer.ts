type IllustrationNames =
  | "onBoardingIllustration"
  | "loginIllustration"
  | "signUpSuccessIllustration"
  | "forgotPasswordIllustration"
  | "forgotPasswordSuccessIllustration"
  | "homeIllustration"
  | "profileIllustration"
  | "teacherSignUpIllustration";

export type ActiveIllustrationState = {
  name: IllustrationNames;
};

export type ActiveIllustrationAction = {
  type: "UPDATE_ACTIVE_ILLUSTRATION";
  payload: {
    name: IllustrationNames;
  };
};

export const activeIllustrationReducer = (
  state: ActiveIllustrationState,
  action: ActiveIllustrationAction
): ActiveIllustrationState => {
  const {
    type,
    payload: { name },
  } = action;

  switch (type) {
    case "UPDATE_ACTIVE_ILLUSTRATION":
      return {
        name,
      };
    default:
      return state;
  }
};
