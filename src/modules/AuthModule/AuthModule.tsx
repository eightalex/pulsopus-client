import { memo, ReactElement, useCallback } from 'react';

import { Dialog } from "@/components/Dialog";
import { EAuthStage } from "@/constants/EAuth.ts";
import { useDispatch, useSelector } from "@/hooks";
import { EPopupType } from "@/interfaces/IPopupStore.ts";
import { actions as authActions,selectAuthStage } from "@/stores/auth";
import { actions as popupActions, getAuthPopupState } from "@/stores/popup";

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
	const isOpen = useSelector(getAuthPopupState);
	const stage = useSelector(selectAuthStage);

	const handleClose = useCallback(() => {
		dispatch(authActions.resetStage());
		dispatch(popupActions.setClosePopup(EPopupType.AUTH));
	}, [dispatch]);

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
