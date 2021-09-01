import type { AppProps } from 'next/app';
import { Chakra } from '../utils/chakra';

const App = ({ Component, pageProps }: AppProps) => (
	<Chakra cookies={pageProps.cookies}>
		<Component {...pageProps} />
	</Chakra>
);
export default App;
