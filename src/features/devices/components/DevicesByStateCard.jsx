import CommonCard from '../../../components/CommonCard';
import TreemapChart from '../../../components/TreemapChart';
import { devicesByStateChartConfig } from '../utils/devicesByStateChartConfig';

const DevicesByStateCard = () => {
  const regionColors = {
    North: '100, 143, 255',
    Northeast: '120, 94, 240',
    Southeast: '220, 38, 127',
    South: '254, 97, 0',
    'Central-West': '255, 176, 0',
  };

  const getBackgroundColor = (ctx, activeGroup, maxTotal) => {
    const treemapCell = ctx.raw;
    const cellData = treemapCell?._data;

    if (!cellData) return `rgba(220, 38, 127, 0.5)`;

    if (activeGroup === 'default') {
      const opacity = 0.3 + (cellData.total / maxTotal) * 0.9;
      return `rgba(220, 38, 127, ${opacity})`;
    }

    if (activeGroup === 'alternate') {
      if (cellData.region && !cellData.name) {
        return `rgba(${regionColors[cellData.region]}, 0.7)`;
      } else {
        const opacity = 0.3 + (cellData.total / maxTotal) * 0.4;
        return `rgba(${regionColors[cellData.region]}, ${opacity})`;
      }
    }
  };

  const formatLabel = (ctx, activeGroup) => {
    const item = ctx.raw._data;

    if (activeGroup === 'alternate' && item.region && !item.abbreviation) {
      return [item.region, item.total];
    }

    return [item.abbreviation, item.total];
  };

  const getTooltipCallbacks = (activeGroup) => ({
    title: (ctx) => {
      const item = ctx[0].raw._data;

      if (activeGroup === 'alternate' && item.region) {
        return `Region: ${item.region} (Total: ${item.total} devices)`;
      }

      return `${item.children[0].name}: ${item.total} devices`;
    },
    label: function suppressTooltipLabel() {
      return '';
    },
    afterBody: (ctx) => {
      const item = ctx[0].raw._data;

      const getRegionsTotals = (regionStatesData) => {
        return regionStatesData.reduce(
          (acc, stateData) => ({
            desktops: acc.desktops + stateData.devices.desktops,
            laptops: acc.laptops + stateData.devices.laptops,
            smartphones: acc.smartphones + stateData.devices.smartphones,
            tablets: acc.tablets + stateData.devices.tablets,
          }),
          { desktops: 0, laptops: 0, smartphones: 0, tablets: 0 }
        );
      };

      const generateTooltipBody = (devices) => {
        return [
          `• Desktops: ${devices.desktops};`,
          `• Laptops: ${devices.laptops};`,
          `• Smartphones: ${devices.smartphones};`,
          `• Tablets: ${devices.tablets};`,
        ];
      };

      if (activeGroup === 'default') {
        const stateDevices = item.children[0].devices;

        return generateTooltipBody(stateDevices);
      }

      if (activeGroup === 'alternate') {
        const regionStatesData = item.children;
        const regionDevices = getRegionsTotals(regionStatesData);

        return generateTooltipBody(regionDevices);
      }
    },
  });

  const cardTitles = {
    main: 'Devices by State | Brazil',
    secondary:
      'Demo: Device distribution of a hypothetical company across Brazilian states and regions.',
  };

  return (
    <CommonCard
      cardTitles={cardTitles}
      chart={
        <TreemapChart
          chartConfig={devicesByStateChartConfig}
          formatLabel={formatLabel}
          groups={{
            default: ['abbreviation'],
            alternate: ['region', 'abbreviation'],
          }}
          getBackgroundColor={getBackgroundColor}
          getTooltipCallbacks={getTooltipCallbacks}
          buttonText={{
            default: 'Show Regions',
            alternate: 'Hide Regions',
          }}
          showToggle={true}
        />
      }
    />
  );
};

export default DevicesByStateCard;
