import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookOpen, FileText, Heart } from 'lucide-react';
import '../styles/stats.css';
import { getReadingStatsByShelf } from '../services/stats.service';
import { setStats } from '../features/stats.slice';
import { MembershipTypes } from '../utils/membership-types';

const formatInt = (n) => new Intl.NumberFormat('es-UY', { maximumFractionDigits: 0 }).format(n ?? 0);

const StatsSection = () => {
	const dispatch = useDispatch();
	const { totalPagesRead, mostReadGenre } = useSelector((s) => s.stats);
	const { membership, maxReadings } = useSelector((s) => s.auth);
	const allReadingsByShelf = useSelector((s) => s.shelves.allReadingsByShelf);
	const [loading, setLoading] = useState(false);

	// Total de Readings subidas
	const totalReadings = useMemo(() => {
		if (!allReadingsByShelf) return 0;
		return Object.values(allReadingsByShelf).reduce((acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0), 0);
	}, [allReadingsByShelf]);

	const readingsFingerprint = useMemo(() => {
		if (!allReadingsByShelf) return '0';
		const parts = [];
		for (const arr of Object.values(allReadingsByShelf)) {
			if (!Array.isArray(arr)) continue;
			for (const r of arr) parts.push(`${r._id}:${r.status}`);
		}
		return parts.sort().join('|');
	}, [allReadingsByShelf]);

	// Membership:
	const isLimitedPlan = useMemo(() => {
		const plan = membership?.toUpperCase?.() ?? '';
		return plan === MembershipTypes.BASIC || plan === MembershipTypes.PREMIUM;
	}, [membership]);

	const usagePercent = useMemo(() => {
		if (!isLimitedPlan || !maxReadings) return null;
		const pct = Math.min(100, Math.round((totalReadings / maxReadings) * 100));
		return isNaN(pct) ? 0 : pct;
	}, [isLimitedPlan, totalReadings, maxReadings]);

	// Cantidad de páginas lídas y
	// género más leído
	useEffect(() => {
		let ignore = false;
		const fetchStats = async () => {
			try {
				setLoading(true);
				const data = await getReadingStatsByShelf(); // devuelve { message, stats }
				if (!ignore && data?.stats) dispatch(setStats(data.stats));
			} catch (err) {
				console.error('No se pudieron obtener las estadísticas de las lecturas:', err);
			} finally {
				if (!ignore) setLoading(false);
			}
		};
		fetchStats();
		return () => { ignore = true; };
	}, [dispatch, readingsFingerprint]);

	// Mostrar cantidad de Readings subidas 
	// según membership
	const firstCard = isLimitedPlan
		? {
			icon: BookOpen,
			value: `${usagePercent ?? 0}%`,
			label: 'lecturas subidas',
			sublabel: `(${totalReadings}/${maxReadings || 0})`,
		}
		: {
			icon: BookOpen,
			value: `${formatInt(totalReadings)}`,
			label: 'lecturas subidas',
		};
	const topGenre = mostReadGenre?.genre ?? '—';
	const topGenreCount =
		typeof mostReadGenre?.count === 'number'
			? `${mostReadGenre.count} libro${mostReadGenre.count === 1 ? '' : 's'}`
			: null;

	const stats = [
		firstCard,
		{
			icon: FileText,
			value: formatInt(totalPagesRead),
			label: 'páginas leídas',
		},
		{
			icon: Heart,
			value: topGenre,
			label: 'género más leído',
			sublabel: topGenreCount,
		},
	];

	return (
		<div className='stats-grid' aria-busy={loading ? 'true' : 'false'}>
			{stats.map((stat, index) => {
				const Icon = stat.icon;
				return (
					<div key={index} className='stat-card'>
						<div className='stat-header'>
							<Icon className='stat-icon' />
						</div>
						<div className='stat-body'>
							<div className='stat-value'>{stat.value}</div>
							<div className='stat-label'>
								{stat.label}{' '}
								{stat.sublabel && <span className='stat-sublabel'>{stat.sublabel}</span>}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default StatsSection;