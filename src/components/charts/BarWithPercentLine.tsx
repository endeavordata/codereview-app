import type { ChartData, ChartOptions } from 'chart.js'
import { Chart as ChartJS, registerables } from 'chart.js'
import * as React from 'react'
import { Chart } from 'react-chartjs-2'

ChartJS.register(...registerables)

type Props = {
  data: ChartData
}

const BarWithPercentLine = ({ data }: Props) => {
  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y1: {
        beginAtZero: true,
        display: true,
        position: 'left' as const,
      },
      y2: {
        beginAtZero: true,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: (value: string | number) => `${value}%`,
        },
      },
    },
  }
  return <Chart type='bar' data={data} options={options} />
}

export default BarWithPercentLine
