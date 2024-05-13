import { AxiosInstance } from 'axios';
import sessionManager from '@/api/SessionManager.ts';
import { APP_URL } from "@/config.ts";
import { IAuthCredential, IAuthReturnData } from "@/interfaces/IAuthStore.ts";

export class AuthService {
	constructor(private readonly restInstance: AxiosInstance) {}

	public redirectApp(redirect?: string) {
		if(!sessionManager.token) return;
		const redirectPath = `${APP_URL}?token=${sessionManager.token}`;
		if(redirect) {
			redirectPath.concat(`?${redirect}`);
		}
		window.location.replace(redirectPath);
	}

	public async onAuthorize():  Promise<IAuthReturnData> {
		return this.restInstance
			.post<IAuthReturnData>('/auth/token')
			.then(({ data }) => data);
	}

	public async onLogin(credential: IAuthCredential):  Promise<IAuthReturnData> {
		return this.restInstance
			.post<IAuthReturnData>('/auth/login', credential)
			.then(({ data }) => data);
	}
}
