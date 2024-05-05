import { memo, ReactElement, useCallback } from 'react';
import { EAuthStage } from "@/constants/EAuth.ts";
import { Dialog } from "@/components/Dialog";
import { Login } from "./login/Login.tsx";
import { Unauthorized } from "./unauthorized/Unauthorized.tsx";
import { UnauthorizedSent } from "@/modules/AuthModule/unauthorized/UnauthorizedSent.tsx";
import { useSelector } from "@/hooks";
import { getAuthPopupState } from "@/stores/popup";

const STAGE_MODULES: Record<keyof typeof EAuthStage, ReactElement> = {
	[EAuthStage.SIGN_STAGE]: <Login/>,
	[EAuthStage.UNAUTHORIZED_STAGE]: <Unauthorized/>,
	[EAuthStage.UNAUTHORIZED_SENT_STAGE]: <UnauthorizedSent/>,
	[EAuthStage.FORGOT_PASSWORD_STAGE]: <div>{EAuthStage.FORGOT_PASSWORD_STAGE}</div>,
};

const AuthModule = memo(() => {
	const isOpen = useSelector(getAuthPopupState);
	console.log('isOpen', isOpen);
	// const {
	// 	rootStore: {
	// 		modalsStore: {
	// 			userAuth: { isOpen, onClose },
	// 		},
	// 		authStore: { resetAuthState, stage },
	// 	},
	// } = useStores();

	// const handleClose = useCallback(() => {
	// 	onClose();
	// 	resetAuthState();
	// }, [onClose, resetAuthState]);

	const handleClose = useCallback(() => {

	}, []);

	const isOpen = false;

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			// hideClose={stage === EAuthStage.SIGN_STAGE}
			maxWidth='sm'
			fullWidth
		>
			{/*{isOpen && stage && STAGE_MODULES[stage]}*/}
		</Dialog>
	);
});

export default AuthModule;
