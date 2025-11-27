import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "../../../shared/store/store";
import { finishOnBoarding, loginWithEmailPassword, loginWithFacebook, loginWithGoogle, logout, toggleAppLock } from "../slice/authSlice";
import { unlockWithBiometrics } from "../../../shared/util/Biometrics";
import { useEffect, useState } from "react";
import { Alert, AppState } from "react-native";
import { useSnackbar } from "../../../shared/context/SnackbarContext";
import { LogoutParams } from "../models/logoutParam";

export const useLoginViewModel = () => {
  const dispatch = useAppDispatch();
  const { loading, error, token, user, isAppLockedEnabled, firstLaunch } = useSelector((s: RootState) => s.auth);

  const loginEmail = (email: string, password: string) =>
    dispatch(loginWithEmailPassword({ email, password })).unwrap();

  const loginGoogleVM = () => dispatch(loginWithGoogle()).unwrap();
  const loginFacebookVM = () => dispatch(loginWithFacebook()).unwrap();
  const [locked, setLocked] = useState(true);

  const { showError } = useSnackbar();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) showError(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

 

  useEffect(() => {
    if (!isAppLockedEnabled) {
      setLocked(false);
    }
    const sub = AppState.addEventListener("change", state => {
      if (state === "background" && isAppLockedEnabled) {
        setLocked(true);
      }
    });
    return () => sub.remove();
  }, [isAppLockedEnabled]);


  const unlockApp = async () => {
    const res = await unlockWithBiometrics();
    if (res.success) {
      setLocked(false);
      return res;
    }
    return res;
  };



  const completeOnBoarding = () => {
    dispatch(finishOnBoarding());
  };



  const toggleAppLockSecurely = async () => {
    const res = await unlockWithBiometrics();
    if (!res.success) return false;
    console.log("Successs ---> : ", res.success);
    if (res.success) {
      const newValue = !isAppLockedEnabled;
      dispatch(toggleAppLock(newValue))
      return true;
    }
    return false;
  }





  const handleLogout = ({ callBack }: LogoutParams = {}) => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
          callBack?.();
        },
      },
    ]);
  };


  return {
    loading,
    error,
    user,
    token,
    isAppLockedEnabled,
    firstLaunch,
    locked,
    open,
    setOpen,
    unlockApp,
    loginEmail,
    loginGoogleVM,
    loginFacebookVM,
    completeOnBoarding,
    handleLogout,
    toggleAppLockSecurely
  };
};
