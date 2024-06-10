import { useEffect, useState } from "react";
import { PieChart, ScoreChart } from "../../Entities/Chart";
import { Audit } from "../../Entities/Audit";
import { Modal } from "antd";
import { getPieChart, getScoreChart } from "../../../connections/audits-connections";
import { Pie , Bar} from "react-chartjs-2";
import { AuditInformationTable } from "../audits";
import { ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from "chart.js";

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartAudits: React.FC<{ audit: AuditInformationTable}> = ({audit})=> {

    const [pieChart, setPieChart] = useState<PieChart>();
    const [scoreChart, setScoreChart] = useState<ScoreChart>();
    const countData: { [key: string]: { [key: string]: number } } = {};

    useEffect(() => {
        const fetchData = async () => {
            await getPieChart(audit.id as number).then((data: PieChart) => {
                setPieChart(data);
            });
            await getScoreChart(audit.id as number).then((data: ScoreChart) => {
                setScoreChart(data);
            });
        }
        fetchData();
    }, [audit]);

    const dataPie = {
        labels: ["Passed", "Failed"],
        datasets: [
            {
                label: "Audit Results",
                data: [
                    (pieChart?.passed ?? 0),
                    (pieChart?.failed ?? 0)
                ],
                backgroundColor: [
                    'green',
                    'red'
                ],
                hoverOffset: 4,
            }
        ]
    }

    const optionsPie : any = {
        title: {
          display: true,
          text: 'Results audit',
          fontSize: 20,
        },
        legend: {
          display: true,
          position: 'right',
        },
      };

    //Bar chart part

    // Contar las ocurrencias de cada tipo de puntuación por etiqueta
    scoreChart?.labelsData.forEach((label, index) => {
        if (!countData[label]) {
            countData[label] = {};
        }
        if (!countData[label][scoreChart.data[index]]) {
            countData[label][scoreChart.data[index]] = 0;
        }
        countData[label][scoreChart.data[index]]++;
    });

    // Obtener el valor máximo para normalizar
    const maxCount = Math.max(...Object.values(countData).flatMap((count) => Object.values(count)));

    // Construir datasetsBar con datos normalizados
    const datasetsBar: any = Object.keys(countData).map((label) => {
        return {
            label: label,
            borderWidth: 1,
            data: scoreChart?.typePuntuacion.map((type) => (countData[label][type] ?? 0) / maxCount),
        };
    });

    const dataForChart: any = {
        labels: scoreChart?.typePuntuacion,
        datasets: datasetsBar,
    };

    // Opciones del gráfico
    const optionsBar: any = {
        title: {
            display: true,
            text: "Audit's Score Chart",
            fontSize: 20,
        },
        legend: {
            display: true,
            position: 'top',
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 1,
                },
            }],
        },
    };


    return (
        <div>
            <Pie data={dataPie} options={optionsPie} />
            <Bar data={dataForChart} options={optionsBar} />
        </div>
    );
}

export default ChartAudits;