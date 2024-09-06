import { memo, ReactElement, useCallback, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { Dialog } from "@/components/Dialog";
import { EAuthStage } from "@/constants/EAuth.ts";
import { QUERY_PARAM_LOGIN, QUERY_PARAM_TARGET } from "@/constants/routes.ts";
import { useDispatch, useSelector } from "@/hooks";
import {
	actions as authActions,
	selectAuthStage,
	selectIsAuthorized,
} from "@/stores/auth";
import { getAuthPopupState, setStateAuthPopup } from "@/stores/popup";

import { RequestAccess, RequestAccessError, RequestAccessSuccess } from "./RequestAccess";
import { SignIn, SignInEmail } from "./SignIn";

const STAGE_MODULES: Record<keyof typeof EAuthStage, ReactElement> = {
	[EAuthStage.AUTH_STAGE_SIGN]: <SignIn/>,
	[EAuthStage.AUTH_STAGE_SIGN_EMAIL]: <SignInEmail/>,
	[EAuthStage.AUTH_STAGE_REQUEST_ACCESS]: <RequestAccess/>,
	[EAuthStage.AUTH_STAGE_REQUEST_ACCESS_SUCCESS]: <RequestAccessSuccess/>,
	[EAuthStage.AUTH_STAGE_REQUEST_ACCESS_ERROR]: <RequestAccessError/>,
};

const AuthModule = memo(() => {
	const dispatch = useDispatch();
	const location = useLocation();
	const isOpen = useSelector(getAuthPopupState);
	const isAuth = useSelector(selectIsAuthorized);
	const stage = useSelector(selectAuthStage);
	const [searchParams] = useSearchParams();

	const handleClose = useCallback(() => {
		dispatch(authActions.resetStage());
		dispatch(setStateAuthPopup(false));
	}, [dispatch]);

	const handleClearAuthSearchParams = useCallback(() => {
		let newUrl = location.pathname;
		if(location.search.length) {
			[QUERY_PARAM_LOGIN, QUERY_PARAM_TARGET].forEach((k) => {
				searchParams.has(k) && searchParams.delete(k);
			});
			const newParams = {} as Record<string, string>;
			for (const [key, value] of searchParams.entries()) {
				newParams[key] = value;
			}
			const query = new URLSearchParams(newParams).toString();
			if(query) {
				newUrl = newUrl.concat(`?${query}`);
			}
		}
		// window.history.replaceState for prevent re-render
		window.history.replaceState(window.history.state, '', newUrl);
	}, [location.pathname, location.search.length, searchParams]);

	const handleSearchLoginParams = useCallback(()  => {
		if(searchParams.has(QUERY_PARAM_LOGIN) && !isOpen && !isAuth) {
			dispatch(setStateAuthPopup());
		}

		const redirectTarget = decodeURIComponent(searchParams.get(QUERY_PARAM_TARGET) || '');
		if(redirectTarget) {
			dispatch(authActions.setRedirect(redirectTarget));
		}

		handleClearAuthSearchParams();
	}, [isAuth, searchParams, isOpen, handleClearAuthSearchParams, dispatch]);

	useEffect(() => {
		handleSearchLoginParams();
	}, [handleSearchLoginParams]);

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			hideClose={stage !== EAuthStage.AUTH_STAGE_REQUEST_ACCESS}
			maxWidth={[EAuthStage.AUTH_STAGE_SIGN, EAuthStage.AUTH_STAGE_SIGN_EMAIL, EAuthStage.AUTH_STAGE_REQUEST_ACCESS].includes(stage) ? 'xs' : 'sm'}
			fullWidth
		>
			{isOpen && stage && STAGE_MODULES[stage]}
		</Dialog>
	);
});

export default AuthModule;
