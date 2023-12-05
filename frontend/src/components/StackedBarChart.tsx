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

interface StackedBarChartProps {
    mergedDatasets: DataPoint[]
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({ mergedDatasets }) => {
    // Extract property keys (excluding 'date')
    const propertyKeys = Object.keys(mergedDatasets[0]).filter((key) => key !== 'date')

    // Create datasets for each property
    const datasets = propertyKeys.map((property) => ({
        label: property,
        data: mergedDatasets.map((dataPoint) => dataPoint[property] as number),
        backgroundColor: generateColor(property), // Function to generate color based on property
    }))

    const data = {
        labels: mergedDatasets.map((dataPoint) => dataPoint.date.toString()),
        datasets,
    }

    const options = {
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
        maintainAspectRatio: false,
    }

    return <Bar data={data} options={options} className="max-h-80" />
}

export default StackedBarChart

// Example color generator function (you can customize this)
function generateColor(property: string): string {
    // Simple hash function for generating colors
    let hash = 0
    for (let i = 0; i < property.length; i++) {
        hash = property.charCodeAt(i) + ((hash << 5) - hash)
    }
    const color = (hash & 0x00ffffff).toString(16).toUpperCase()
    return '#' + '00000'.substring(0, 6 - color.length) + color
}
