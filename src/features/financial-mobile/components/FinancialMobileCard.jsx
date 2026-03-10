import LineChart from '../../../components/LineChart';
import TabsCard from '../../../components/TabsCard';
import { costsByTypeChartConfig } from '../utils/costsByTypeChartConfig';

const FinancialMobileCard = () => {
  const financialCharts = [
    {
      eventKey: 'costs',
      title: 'Costs by Type',
      renderChart: (period) => (
        <LineChart period={period} chartConfig={costsByTypeChartConfig} />
      ),
    },
  ];

  return (
    <TabsCard
      title={
        <>
          <b>Financial</b> | Mobile
        </>
      }
      charts={financialCharts}
    />
  );
};

export default FinancialMobileCard;
