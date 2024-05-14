import { memo, ReactElement, useCallback } from 'react';

import { Dialog } from "@/components/Dialog";
import { EAuthStage } from "@/constants/EAuth.ts";
import { useDispatch, useSelector } from "@/hooks";
import { EPopupType } from "@/interfaces/IPopupStore.ts";
import { actions as authActions,selectAuthStage } from "@/stores/auth";
import { actions as popupActions, getAuthPopupState } from "@/stores/popup";

import { Login } from "./login/Login.tsx";
import { Unauthorized } from "./unauthorized/Unauthorized.tsx";
import { UnauthorizedSentError } from "./unauthorized/UnauthorizedSentError.tsx";
import { UnauthorizedSentSuccess } from "./unauthorized/UnauthorizedSentSuccess.tsx";

const STAGE_MODULES: Record<keyof typeof EAuthStage, ReactElement> = {
	[EAuthStage.SIGN_STAGE]: <Login/>,
	[EAuthStage.REQUEST_ACCESS_STAGE]: <Unauthorized/>,
	[EAuthStage.REQUEST_ACCESS_SUCCESS_STAGE]: <UnauthorizedSentSuccess/>,
	[EAuthStage.REQUEST_ACCESS_ERROR_STAGE]: <UnauthorizedSentError/>,
	[EAuthStage.FORGOT_PASSWORD_STAGE]: <div>{EAuthStage.FORGOT_PASSWORD_STAGE}</div>,
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
			hideClose={stage !== EAuthStage.REQUEST_ACCESS_STAGE}
			maxWidth={[EAuthStage.SIGN_STAGE, EAuthStage.REQUEST_ACCESS_STAGE].includes(stage) ? 'xs' : 'sm'}
			fullWidth
		>
			{isOpen && stage && STAGE_MODULES[stage]}
		</Dialog>
	);
});

export default AuthModule;
