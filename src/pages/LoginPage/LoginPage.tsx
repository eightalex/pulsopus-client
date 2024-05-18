import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { QUERY_REDIRECT } from "@/constants/routes.ts";
import { useDispatch } from "@/hooks";
import { EPopupType } from "@/interfaces/IPopupStore.ts";
import HomePage from "@/pages/HomePage";
import { actions as authActions } from "@/stores/auth";
import { actions as popupActions } from "@/stores/popup";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleMount = useCallback(() => {
        const redirect = decodeURIComponent(searchParams.get(QUERY_REDIRECT) || '');
        if(redirect) {
            dispatch(authActions.setRedirect(redirect));
        }
        setSearchParams({});
        dispatch(popupActions.setOpenPopup(EPopupType.AUTH));
    }, [dispatch, searchParams, setSearchParams]);

    useEffect(() => {
        handleMount();
    }, [handleMount]);

    return <HomePage/>;
};

export default LoginPage;