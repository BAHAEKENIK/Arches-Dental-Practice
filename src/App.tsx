import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './providers/ThemeProvider';
import { LanguageProvider } from './providers/LanguageProvider';
import Home from './pages/Home/Home';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Home />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;