import Layout from './components/Layout';
import useCommandBar from './useCommandBar';

function App() {
  useCommandBar();
  return <Layout />;
}

export default App;
