import Chart from "react-google-charts";
import { useChart } from '../hooks/useChart';

export function ChartsGoogle() {
    const { dataPieChart, dataBarChart } = useChart();

    const optionsPieChart = {
        title: "Cantidad de Pedidos por Instrumento",
        pieHole: 0.4,
        is3D: false,
    };

    const optionsBarChart = {
        title: "Cantidad de instrumentos vendidos por Mes y Año",
        chartArea: { width: "50%" },
        hAxis: {
            title: "Instrumentos Vendidos",
            minValue: 0,
        },
        vAxis: {
            title: "Mes/Año",
        },
        colors: ['#de733e'], // Aquí puedes especificar los colores de las barras
    };

    return (
        <>
            <Chart
                chartType="BarChart"
                width="100%"
                height="800px"
                data={dataBarChart}
                options={optionsBarChart}
            />
            <Chart
                chartType="PieChart"
                width="100%"
                height="800px"
                data={dataPieChart}
                options={optionsPieChart}
            />
        </>
    )
}