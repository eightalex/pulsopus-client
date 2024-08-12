import { AxiosInstance } from 'axios';
import sessionManager from '@/api/SessionManager.ts';
import { APP_URL } from "@/config.ts";
import { QUERY_PARAM_TARGET, QUERY_PARAM_TOKEN } from "@/constants/routes.ts";
import { IAuthCredential, IAuthReturnData } from "@/interfaces/IAuthStore.ts";

export class AuthService {
	constructor(private readonly restInstance: AxiosInstance) {}

	public redirectApp(redirect?: string) {
		const params = {} as { [QUERY_PARAM_TARGET]?: string, [QUERY_PARAM_TOKEN]?: string };
		if(sessionManager.token) {
			params[QUERY_PARAM_TOKEN] = sessionManager.token;
		}
		if(redirect) {
			params[QUERY_PARAM_TARGET] = redirect;
		}
		const query = new URLSearchParams(params).toString();
		let url = APP_URL;
		if(query) url = url.concat(`?${query}`);
		window.location.replace(url);
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

	public async onRefreshToken():  Promise<void> {
		await this.restInstance.post('/auth/refresh');
	}

	public async onLogout():  Promise<void> {
		return this.restInstance
			.post('/auth/logout')
			.then(({ data }) => data);
	}

	public async onRequestAccess(recipient: string, credential: IAuthCredential):  Promise<void> {
		await this.restInstance
			.post<IAuthReturnData>('/auth/request-access', { recipient, ...credential });
	}
}
