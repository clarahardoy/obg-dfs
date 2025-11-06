import { BookOpen, FileText, Heart } from 'lucide-react';
import '../styles/stats.css';
const StatsSection = () => {
	const stats = [
		{
			icon: BookOpen,
			value: '98%',
			label: 'Cantidad de documentos',
			sublabel: '(9/10)',
		},
		{
			icon: FileText,
			value: '6,123',
			label: 'páginas leídas',
		},
		{
			icon: Heart,
			value: 'Romance',
			label: 'género más leído',
		},
	];

	return (
		<div className='stats-grid'>
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
								{stat.sublabel && (
									<span className='stat-sublabel'>{stat.sublabel}</span>
								)}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default StatsSection;