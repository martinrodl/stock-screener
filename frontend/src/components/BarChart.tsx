import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface DataPoint {
    [key: string]: number | string
}

const colors = ['#36A2EB', '#4BC0C0', '#FFCE56', '#FF6384']

interface BarChartProps {
    mergedDatasets: DataPoint[]
    maxValue?: number // Optional prop for setting a maximum value
}

const BarChart: React.FC<BarChartProps> = ({ mergedDatasets, maxValue }) => {
    // Function to cap values at the maxValue
    const capValue = (value: number) =>
        maxValue !== undefined && value > maxValue ? maxValue : value

    // Extract property keys (excluding 'date')
    const propertyKeys = Object.keys(mergedDatasets[0]).filter((key) => key !== 'date')

    // Create datasets for each property, capping values if maxValue is set
    const datasets = propertyKeys.map((property, index) => ({
        label: property,
        data: mergedDatasets.map((dataPoint) => capValue(dataPoint[property] as number)),
        backgroundColor: colors[index % colors.length],
        borderColor: colors[index % colors.length],
        borderWidth: 1,
    }))

    const data = {
        labels: mergedDatasets.map((dataPoint) => dataPoint.date.toString()),
        datasets,
    }

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        maintainAspectRatio: false,
    }

    return <Bar data={data} options={options} />
}

export default BarChart
