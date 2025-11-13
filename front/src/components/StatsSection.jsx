import { useEffect, useMemo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookOpen, FileText, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../styles/stats.css';
import { getReadingStatsByShelf } from '../services/stats.service';
import { setStats } from '../features/stats.slice';
import { MembershipTypes } from '../utils/membership-types';

const StatsSection = () => {
	const dispatch = useDispatch();
	const { t, i18n } = useTranslation();
	const { totalPagesRead, mostReadGenre } = useSelector((s) => s.stats);
	const { membership, maxReadings } = useSelector((s) => s.auth);
	const allReadingsByShelf = useSelector((s) => s.shelves.allReadingsByShelf);
	const [loading, setLoading] = useState(false);

	const numberLocale = i18n.language?.startsWith('es') ? 'es-UY' : 'en-US';
	const formatInt = useCallback(
		(n) => new Intl.NumberFormat(numberLocale, { maximumFractionDigits: 0 }).format(n ?? 0),
		[numberLocale]
	);

	const totalReadings = useMemo(() => {
		if (!allReadingsByShelf) return 0;
		return Object.values(allReadingsByShelf).reduce(
			(acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0),
			0
		);
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

	const plan = useMemo(() => (membership ?? '').trim().toUpperCase(), [membership]);
	const isBasic = plan === MembershipTypes.BASIC;

	const hasUploadLimit = isBasic;
	const effectiveMax = useMemo(() => {
		if (!hasUploadLimit) return null;
		const max = Number(maxReadings);
		return Number.isFinite(max) && max > 0 ? max : 0;
	}, [hasUploadLimit, maxReadings]);

	const used = Math.max(0, Number(totalReadings ?? 0));
	const usagePercent = useMemo(() => {
		if (!hasUploadLimit || !(effectiveMax > 0)) return null;
		const pct = Math.round((used / effectiveMax) * 100);
		return Math.min(100, Math.max(0, isNaN(pct) ? 0 : pct));
	}, [hasUploadLimit, used, effectiveMax]);

	useEffect(() => {
		let ignore = false;
		const fetchStats = async () => {
			try {
				setLoading(true);
				const data = await getReadingStatsByShelf();
				const stats = data?.stats;
				if (!ignore && stats) dispatch(setStats(stats));
			} catch (err) {
				console.error(t('stats.toastGenericError'), err);
			} finally {
				if (!ignore) setLoading(false);
			}
		};
		fetchStats();
		return () => {
			ignore = true;
		};
	}, [dispatch, readingsFingerprint, t]);

	const firstCard = hasUploadLimit
		? {
			icon: BookOpen,
			value: `${usagePercent ?? 0}%`,
			label: t('stats.readingsUploaded'),
			sublabel: t('stats.sublabelUsage', {
				total: formatInt(used),
				max: formatInt(effectiveMax ?? 0)
			})
		}
		: {
			icon: BookOpen,
			value: `${formatInt(used)}`,
			label: t('stats.readingsUploaded')
		};

	const topGenre = mostReadGenre?.genre ?? '—';
	const topGenreCount =
		typeof mostReadGenre?.count === 'number'
			? `${mostReadGenre.count} ${t('common.units.books', { count: mostReadGenre.count })}`
			: null;

	const stats = [
		firstCard,
		{
			icon: FileText,
			value: formatInt(totalPagesRead),
			label: t('stats.pagesRead')
		},
		{
			icon: Heart,
			value: topGenre,
			label: t('stats.mostReadGenre'),
			sublabel: topGenreCount
		}
	];

	return (
		<div className="stats-grid" aria-busy={loading ? 'true' : 'false'}>
			{stats.map((stat, index) => {
				const Icon = stat.icon;
				return (
					<div key={index} className="stat-card">
						<div className="stat-header">
							<Icon className="stat-icon" />
						</div>
						<div className="stat-body">
							<div className="stat-value">{stat.value}</div>
							<div className="stat-label">
								{stat.label}{' '}
								{stat.sublabel && <span className="stat-sublabel">{stat.sublabel}</span>}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default StatsSection;