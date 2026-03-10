import CommonCard from '../../../components/CommonCard';
import TreemapChart from '../../../components/TreemapChart';
import { devicesByStateChartConfig } from '../utils/devicesByStateChartConfig';

const regionColors = {
  North: '100, 143, 255',
  Northeast: '120, 94, 240',
  Southeast: '220, 38, 127',
  South: '254, 97, 0',
  'Central-West': '255, 176, 0',
};

const getBackgroundColor = (ctx, activeGroup, maxTotal) => {
  if (!ctx.raw || !ctx.raw._data) return `rgba(220, 38, 127, 0.5)`;

  const item = ctx.raw._data;

  if (activeGroup === 'alternate') {
    if (item.region && !item.name) {
      return `rgba(${regionColors[item.region]}, 0.7)`;
    } else {
      const opacity = 0.3 + (item.total / maxTotal) * 0.4;
      return `rgba(${regionColors[item.region]}, ${opacity})`;
    }
  } else {
    const opacity = 0.3 + (item.total / maxTotal) * 0.9;
    return `rgba(220, 38, 127, ${opacity})`;
  }
};

const getLabelFormatter = (ctx, activeGroup) => {
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
  label: () => '',
  afterBody: (ctx) => {
    const item = ctx[0].raw._data;

    if (activeGroup === 'alternate') {
      const children = item.children;
      const totals = children.reduce(
        (acc, state) => ({
          desktops: acc.desktops + state.devices.desktops,
          laptops: acc.laptops + state.devices.laptops,
          smartphones: acc.smartphones + state.devices.smartphones,
          tablets: acc.tablets + state.devices.tablets,
        }),
        { desktops: 0, laptops: 0, smartphones: 0, tablets: 0 },
      );

      return [
        `• Desktops: ${totals.desktops};`,
        `• Laptops: ${totals.laptops};`,
        `• Smartphones: ${totals.smartphones};`,
        `• Tablets: ${totals.tablets};`,
      ];
    } else {
      const state = item.children[0];
      return [
        `• Desktops: ${state.devices.desktops};`,
        `• Laptops: ${state.devices.laptops};`,
        `• Smartphones: ${state.devices.smartphones};`,
        `• Tablets: ${state.devices.tablets};`,
      ];
    }
  },
});

const DevicesByStateCard = () => {
  const subtitle =
    'Demo: Device distribution of a hypothetical company across Brazilian states and regions.';

  return (
    <CommonCard
      title='Devices by State | Brazil'
      subtitle={subtitle}
      chart={
        <TreemapChart
          chartConfig={devicesByStateChartConfig}
          groups={{
            default: ['abbreviation'],
            alternate: ['region', 'abbreviation'],
          }}
          getBackgroundColor={getBackgroundColor}
          getLabelFormatter={getLabelFormatter}
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
