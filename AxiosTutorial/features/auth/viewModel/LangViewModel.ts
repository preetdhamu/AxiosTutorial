import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../shared/store/store";
import { useEffect, useState } from "react";
import { useSnackbar } from "../../../shared/context/SnackbarContext";
import i18n, { getDeviceLang } from "../../../shared/i18n/i18n";
import { setLangauage } from "../slice/langSlice";

export const useLangViewModel = () => {
    const dispatch = useAppDispatch();
    const { selectedAppLanguage } = useSelector((s: RootState) => s.lang);

    const [error, setError] = useState("");

    const { showError } = useSnackbar();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (error) showError(error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);


    useEffect(() => {
        try {
            const lang = selectedAppLanguage ?? getDeviceLang();
            if (i18n.language !== lang) {
                i18n.changeLanguage(lang);
            }
        } catch (e: any) {
            setError(e)
        }
    }, [selectedAppLanguage]);





    const changeLanguage = async (lang: string) => {
        try {
            dispatch(setLangauage(lang));
            if (lang !== null) {
                await i18n.changeLanguage(lang);
            }
            setOpen(false);
        }
        catch (e: any) {
            setError(e)
        }
    }


    const followDeviceLanguage = () => {
        dispatch(setLangauage(null));  
        setOpen(false);
    };


    return {
        selectedAppLanguage,
        open,
        setOpen,
        changeLanguage,
        followDeviceLanguage
    };
};
