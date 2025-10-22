import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import './styles/styles.css';
import './styles/form.css';
import './styles/login.css';
import './styles/register.css';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/login" replace />} />
			<Route path="/login" element={
				<section className="login-section">
					<Login />
				</section>
			} />
			<Route path="/register" element={
				<section className="register-section">
					<Register />
				</section>
			} />
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
};

export default App;