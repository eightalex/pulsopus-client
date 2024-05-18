import { useEffect } from "react";
import ReactDOM from 'react-dom/client';

import { VERSION } from '@/config.ts';
import Root from '@/root';

import App from './App.tsx';

export const AppComponent = () => {
	useEffect(() => {
		alert(`dev client build: v${VERSION}`);
	}, []);

	return (
		<Root>
			<App/>
		</Root>
	);
};

ReactDOM
	.createRoot(document.getElementById('root')!)
	.render(<AppComponent/>);
