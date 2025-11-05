import ShelfList from './ShelfList.jsx';
import StatsSection from './StatsSection';
import '../styles/dashboard.css';
import Navbar from './Navbar.jsx';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
	const { t } = useTranslation();
	return (
		<>
			<Navbar />
			<div className='dashboard-container'>
				<h1 className='dashboard-title'>{t('dashboard.dashboardTitle')}</h1>
				<StatsSection />
				<ShelfList />
				{/* <Plan /> */}
			</div>
		</>
	);
};

export default Dashboard;