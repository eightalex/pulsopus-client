import { AxiosInstance } from 'axios';
import sessionManager from '@/api/SessionManager.ts';
import { APP_URL } from "@/config.ts";
import { QUERY_REDIRECT, QUERY_TOKEN } from "@/constants/routes.ts";
import { IAuthCredential, IAuthReturnData } from "@/interfaces/IAuthStore.ts";

export class AuthService {
	constructor(private readonly restInstance: AxiosInstance) {}

	public redirectApp(redirect?: string) {
		if(!sessionManager.token) return;
		const params = {} as { [QUERY_TOKEN]?: string, [QUERY_REDIRECT]?: string };
		params[QUERY_TOKEN] = sessionManager.token;
		if(redirect) {
			params[QUERY_REDIRECT] = redirect;
		}
		const query = new URLSearchParams(params).toString();
		if(!query) return;
		window.location.replace(`${APP_URL}?${query}`);
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

	public async onRequestAccess(recipient: string, credential: IAuthCredential):  Promise<void> {
		await this.restInstance
			.post<IAuthReturnData>('/auth/request-access', { recipient, ...credential });
	}
}
