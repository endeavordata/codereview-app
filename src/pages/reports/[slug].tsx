import { PrismaClient, RepositorySegmentReport } from '@prisma/client'
import { Chart as ChartJS, registerables } from 'chart.js'
import { GetStaticPaths, GetStaticProps } from 'next'
import * as React from 'react'
import { Chart } from 'react-chartjs-2'

import Layout from '@/components/layout/Layout'
import Seo from '@/components/Seo'

ChartJS.register(...registerables)

type Props = {
  report: RepositorySegmentReport
}

const Report = ({ report }: Props) => {
  const star_data = {
    labels: report.quarter,
    datasets: [
      {
        label: 'New stars',
        data: report.new_stars,
        yAxisID: 'y1',
        type: 'bar' as const,
      },
      {
        label: 'New stars (% of GitHub)',
        data: report.fraction_of_sitewide_stars.map((x) => x * 100),
        yAxisID: 'y2',
        type: 'line' as const,
      },
    ],
  }
  const commit_data = {
    labels: report.quarter,
    datasets: [
      {
        label: 'Active committers',
        data: report.committers,
        yAxisID: 'y1',
        type: 'bar' as const,
      },
      {
        label: 'Active committers (% of GitHub)',
        data: report.fraction_of_sitewide_committers.map((x) => x * 100),
        yAxisID: 'y2',
        type: 'line' as const,
      },
    ],
  }
  const options = {
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
      },
    },
  }

  return (
    <Layout>
      <Seo templateTitle='Report' />
      <main>
        <div className='mx-auto flex max-w-full lg:max-w-7xl'>
          <div className='hidden w-40 flex-none p-4 lg:block'>
            <span>Contents</span>
          </div>
          <div className='w-full flex-grow bg-gray-400 p-4'>
            <div className='flex flex-col bg-blue-400'>
              <div>
                <h3>Stargazers</h3>
                <Chart type='bar' data={star_data} options={options} />
              </div>
              <div>
                <h3>Commit activity</h3>
                <Chart type='bar' data={commit_data} options={options} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Report

const prisma = new PrismaClient()

export const getStaticPaths: GetStaticPaths = async () => {
  const reports = await prisma.repositorySegmentReport.findMany()
  const paths = reports.map((report) => ({
    params: { slug: report.slug },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as { slug: string }
  const report = await prisma.repositorySegmentReport.findUnique({
    where: { slug: params.slug },
  })
  return { props: { report } }
}
