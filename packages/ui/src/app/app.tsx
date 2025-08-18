import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes/AppRoutes';
function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
      <AppRoutes />
    </ >
  );
}

export default App;

