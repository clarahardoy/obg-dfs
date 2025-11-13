import { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../styles/graph.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: { display: false },
    },
    scales: {
        x: { grid: { display: false } },
        y: { grid: { color: '#e3e3e3' } },
    }
};

export function Graph() {
    const { t } = useTranslation();
    const booksByGenre = useSelector((state) => state.stats.booksByGenre);
    const [isExpanded, setIsExpanded] = useState(true);

    if (!booksByGenre.length) {
        return null;
    }

    const labels = booksByGenre.map((i) => i.genre);
    const counts = booksByGenre.map((i) => i.count);

    const data = {
        labels,
        datasets: [
            {
                label: t('graph.datasetLabel'),
                data: counts,
                backgroundColor: 'rgba(184, 64, 101, 0.5)',
                borderColor: '#b84065',
                borderWidth: 1,
                borderRadius: 8,
                maxBarThickness: 60,
            },
        ],
    };

    const toggleExpanded = () => setIsExpanded((prev) => !prev);

    return (
        <div>
            <h2 className='shelf-list-title stats-title'>
                {t('graph.header')}
            </h2>
            <section className="graph-card" role="region" aria-labelledby="graph-title">
                <div
                    className="graph-card__header"
                    onClick={toggleExpanded}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="graph-card__header-left">
                        {isExpanded ? (
                            <ChevronUp className="graph-card__chevron" />
                        ) : (
                            <ChevronDown className="graph-card__chevron" />
                        )}
                        <BarChart3 className="graph-card__icon" aria-hidden />
                        <h2 id="graph-title" className="graph-card__title">
                            {t('graph.title')}
                        </h2>
                    </div>
                </div>

                {isExpanded && (
                    <div className="graph-card__body">
                        <div className="graph-card__canvas-wrapper">
                            <Bar options={options} data={data} className="graph-card__canvas" />
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}