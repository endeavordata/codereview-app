import { Prisma } from '@prisma/client'
import type { ChartData } from 'chart.js'
import * as React from 'react'

import BarWithPercentLine from '@/components/charts/BarWithPercentLine'

type Props = {
  data: Prisma.JsonObject
}

const ActiveCommitters = ({ data }: Props) => {
  const commit_data = {
    labels: data.quarter,
    datasets: [
      {
        label: 'Active committers',
        data: data.committers,
        yAxisID: 'y1',
        type: 'bar' as const,
      },
      {
        label: 'Active committers (% of GitHub)',
        data: (data.fraction_of_sitewide_committers as number[]).map(
          (x) => x * 100
        ),
        yAxisID: 'y2',
        type: 'line' as const,
      },
    ],
  }
  return <BarWithPercentLine data={commit_data as ChartData} />
}

export default ActiveCommitters
