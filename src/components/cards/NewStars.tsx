import { Prisma } from '@prisma/client'
import type { ChartData } from 'chart.js'
import * as React from 'react'

import BarWithPercentLine from '@/components/charts/BarWithPercentLine'

type Props = {
  data: Prisma.JsonObject
}

const NewStars = ({ data }: Props) => {
  const star_data = {
    labels: data.quarter,
    datasets: [
      {
        label: 'New stars',
        data: data.new_stars,
        yAxisID: 'y1',
        type: 'bar' as const,
      },
      {
        label: 'New stars (% of GitHub)',
        data: (data.fraction_of_sitewide_stars as number[]).map((x) => x * 100),
        yAxisID: 'y2',
        type: 'line' as const,
      },
    ],
  }
  return <BarWithPercentLine data={star_data as ChartData} />
}

export default NewStars
