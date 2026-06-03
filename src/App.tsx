import { YearContextProvider } from '@/context/YearContext';
import Home from './pages/Home';

export default function App() {
  return (
    <YearContextProvider>
      <Home />
    </YearContextProvider>
  );
}
