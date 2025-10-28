import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import './styles/styles.css';
import './styles/form.css';
import './styles/login.css';
import './styles/register.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	return (
		<Provider store={store}>
			<ToastContainer autoClose={2000} pauseOnHover={false} />
			<Routes>
				<Route path='/' element={<Navigate to='/login' replace />} />
				<Route
					path='/login'
					element={
						<section className='login-section'>
							<Login />
						</section>
					}
				/>
				<Route
					path='/register'
					element={
						<section className='register-section'>
							<Register />
						</section>
					}
				/>
				<Route path="/dashboard" element={<ProtectedRoute />}>
					<Route path='/dashboard' element={<Dashboard />} />
				</Route>
				<Route path='*' element={<Navigate to='/login' replace />} />
			</Routes>
		</Provider>
	);
};

export default App;
