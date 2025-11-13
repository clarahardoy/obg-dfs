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
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Libros leídos por género',
        },
    },
};

export function Graph() {
    const booksByGenre = useSelector((state) => state.stats.booksByGenre || []);

    if (!booksByGenre.length) {
        return <p>No tenés libros terminados con género asignado todavía.</p>;
    }

    const labels = booksByGenre.map((item) => item.genre);
    const counts = booksByGenre.map((item) => item.count);

    const data = {
        labels,
        datasets: [
            {
                label: 'Cantidad de libros',
                data: counts,
                backgroundColor: 'rgba(184, 64, 101, 0.5)',
                borderColor: '#b84065',
                borderWidth: 1,
                borderRadius: 8,
            },
        ],
    };

    return <Bar options={options} data={data} />;
}