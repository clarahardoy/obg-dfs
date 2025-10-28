import ShelfList from './ShelfList';
import StatsSection from './StatsSection';
import '../styles/dashboard.css';

const Dashboard = () => {
	return (
		<section className='dashboard-section'>
			{/* <Navbar /> */}
			<div className='dashboard-container'>
				<h1 className='dashboard-title'>Mi Biblioteca</h1>
				<StatsSection />
				<ShelfList />
				{/* <Plan /> */}
			</div>
		</section>
	);
};

export default Dashboard;
