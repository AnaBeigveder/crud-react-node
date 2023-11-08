import Headers from './components/header/Header';
import Contact from './pages/contact';
import { GlobalStyles } from './styles/GlobalStyles';

const App = () => {
	return (
		<>
			<GlobalStyles />
			<Headers />
			<Contact />
		</>
	);
};

export default App;
