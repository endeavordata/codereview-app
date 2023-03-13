import { PrismaClient, RepositorySegmentReport } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

type Props = {
  report: RepositorySegmentReport;
};

const Report = ({ report }: Props) => {
  return (
    <Layout>
      <Seo templateTitle='Report' />
      <main>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <h1 className='mt-4'>Report</h1>
          <div>
            <ul>
              {report.month.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Report;

const prisma = new PrismaClient();

export const getStaticPaths: GetStaticPaths = async () => {
  const reports = await prisma.repositorySegmentReport.findMany();
  const paths = reports.map((report) => ({
    params: { slug: report.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as { slug: string };
  const report = await prisma.repositorySegmentReport.findUnique({
    where: { slug: params.slug },
  });
  return { props: { report } };
};
