import ShelfList from './ShelfList.jsx';
import StatsSection from './StatsSection';
import '../styles/dashboard.css';
import Navbar from './Navbar.jsx';

const Dashboard = () => {
	return (
		<>
			<Navbar />
			<div className='dashboard-container'>
				<h1 className='dashboard-title'>Mi Biblioteca</h1>
				<StatsSection />
				<ShelfList />
				{/* <Plan /> */}
			</div>
		</>
	);
};

export default Dashboard;