import CommonCard from '../../../components/CommonCard';
import TreemapChart from '../../../components/TreemapChart';
import { devicesByStateChartData } from '../utils/devicesByStateChartConfig';

const DevicesByStateCard = () => {
  const colors = {
    main: '170, 68, 153', // #AA4499
    groups: {
      North: '100, 143, 255', // #648FFF
      Northeast: '120, 94, 240', // #785EF0
      Southeast: '220, 38, 127', // #DC267F
      South: '254, 97, 0', // #FE6100
      'Central-West': '255, 176, 0', // #FFB000
    },
  };

  const setCellBgColor = (ctx, activeGroup, maxTotal) => {
    const treemapCell = ctx.raw;
    const cellData = treemapCell?._data;
    const isGroupedByRegion = activeGroup === 'alternate';
    const colorX = colors.main;

    if (!cellData) return `rgba(${colors.main}, 0.5)`;

    if (!isGroupedByRegion) {
      const opacity = 0.3 + (cellData.total / maxTotal) * 0.9;
      return `rgba(${colors.main}, ${opacity})`;
    }

    if (isGroupedByRegion)
      return `rgba(${colors.groups[cellData.region]}, 0.7)`;
  };

  const formatLabel = (ctx) => {
    const cellData = ctx.raw._data;

    return [cellData.abbreviation, cellData.total];
  };

  const getTooltipCallbacks = (activeGroup) => ({
    title: (ctx) => {
      const cellData = ctx[0].raw._data;
      const isGroupedByRegion = activeGroup === 'alternate';

      if (isGroupedByRegion) {
        return `Region: ${cellData.region} (Total: ${cellData.total} devices)`;
      }

      return `${cellData.children[0].name}: ${cellData.total} devices`;
    },
    label: function hideTooltipColorBox() {
      return '';
    },
    afterBody: (ctx) => {
      const cellData = ctx[0].raw._data;
      const isGroupedByRegion = activeGroup === 'alternate';

      const sumDeviceTotals = (acc, stateData) => ({
        desktops: acc.desktops + stateData.devices.desktops,
        laptops: acc.laptops + stateData.devices.laptops,
        smartphones: acc.smartphones + stateData.devices.smartphones,
        tablets: acc.tablets + stateData.devices.tablets,
      });

      const initialDeviceTotals = {
        desktops: 0,
        laptops: 0,
        smartphones: 0,
        tablets: 0,
      };

      const getRegionsTotals = (regionStatesData) => {
        return regionStatesData.reduce(sumDeviceTotals, initialDeviceTotals);
      };

      const generateTooltipBody = (devices) => {
        return [
          `• Desktops: ${devices.desktops};`,
          `• Laptops: ${devices.laptops};`,
          `• Smartphones: ${devices.smartphones};`,
          `• Tablets: ${devices.tablets};`,
        ];
      };

      if (!isGroupedByRegion) {
        const stateDevices = cellData.children[0].devices;

        return generateTooltipBody(stateDevices);
      }

      if (isGroupedByRegion) {
        const regionStatesData = cellData.children;
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

  const groups = {
    default: ['abbreviation'],
    alternate: ['region', 'abbreviation'],
  };

  const buttonText = {
    default: 'Show Regions',
    alternate: 'Hide Regions',
  };

  return (
    <CommonCard
      cardTitles={cardTitles}
      chart={
        <TreemapChart
          chartData={devicesByStateChartData}
          chartCallbacks={{ formatLabel, getTooltipCallbacks, setCellBgColor }}
          groups={groups}
          buttonText={buttonText}
          hasToggleGroupFeat={true}
        />
      }
    />
  );
};

export default DevicesByStateCard;
