import Root from '@/root';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

export const AppComponent = () => (
	<Root>
		<App/>
	</Root>
);

ReactDOM
	.createRoot(document.getElementById('root')!)
	.render(<AppComponent/>);
