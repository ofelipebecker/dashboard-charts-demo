import {
  type Devices,
  type DevicesByStateData,
  devicesByStateData,
} from './devicesByStateData.ts';
import type { TooltipItem } from 'chart.js';
import {
  type TreemapDataPoint,
  type TreemapScriptableContext,
} from 'chartjs-chart-treemap';

export type DevicesByStateChartData = Omit<DevicesByStateData, 'devices'> & {
  total: number;
  devices: Omit<DevicesByStateData['devices'], 'total'>;
};

type TreemapDataPointWithData = TreemapDataPoint & {
  _data?: DevicesByStateChartData & {
    children?: TreemapDataPointWithData[];
    label?: string;
    path?: string;
  };
};

const colors = {
  main: '170, 68, 153', // #AA4499
  regions: {
    North: '100, 143, 255', // #648FFF
    Northeast: '120, 94, 240', // #785EF0
    Southeast: '220, 38, 127', // #DC267F
    South: '254, 97, 0', // #FE6100
    'Central-West': '255, 176, 0', // #FFB000
  },
};

export const devicesByStateChartData = devicesByStateData.map((state) => ({
  name: state.name,
  abbreviation: state.abbreviation,
  region: state.region,
  total: state.devices.total,
  devices: {
    desktops: state.devices.desktops,
    laptops: state.devices.laptops,
    smartphones: state.devices.smartphones,
    tablets: state.devices.tablets,
  },
}));

const maxTotal = Math.max(
  ...devicesByStateChartData.map((state) => state.total)
);

export const devicesByStateChartCallbacks = {
  setCellBgColor: (
    ctx: TreemapScriptableContext,
    activeGroup: 'default' | 'alternate'
  ) => {
    const treemapCell = ctx.raw as TreemapDataPointWithData;
    const cellData = treemapCell?._data;
    const isGroupedByRegion = activeGroup === 'alternate';

    if (!cellData) return `rgba(${colors.main}, 0.5)`;

    if (!isGroupedByRegion) {
      const opacity = 0.3 + (cellData.total / maxTotal) * 0.9;
      return `rgba(${colors.main}, ${opacity})`;
    }

    if (isGroupedByRegion)
      return `rgba(${colors.regions[cellData.region]}, 0.7)`;
  },
  formatLabel: (ctx: TreemapScriptableContext) => {
    const treemapCell = ctx.raw as TreemapDataPointWithData;
    const cellData = treemapCell?._data;

    if (!cellData) return ['', 0];

    return [cellData.abbreviation, cellData.total];
  },
  getTooltipCallbacks: (activeGroup: 'default' | 'alternate') => ({
    title: (ctx: TooltipItem<'treemap'>[]) => {
      const treemapCell = ctx[0].raw as TreemapDataPointWithData;
      const cellData = treemapCell._data;
      if (!cellData) return '';

      const isGroupedByRegion = activeGroup === 'alternate';

      if (isGroupedByRegion) {
        return `Region: ${cellData.region} (Total: ${cellData.total} devices)`;
      }

      const firstChild = cellData.children?.[0]?._data;

      if (!firstChild) return '';

      return `${firstChild.name}: ${cellData.total} devices`;
    },
    label: function hideTooltipColorBox() {
      return '';
    },
    afterBody: (ctx: TooltipItem<'treemap'>[]) => {
      const treemapCell = ctx[0].raw as TreemapDataPointWithData;
      const cellData = treemapCell._data;
      if (!cellData) return [];

      const isGroupedByRegion = activeGroup === 'alternate';

      const sumDeviceTotals = (
        acc: Omit<Devices, 'total'>,
        stateData: DevicesByStateChartData
      ) => ({
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

      const getRegionsTotals = (
        regionStatesData: DevicesByStateChartData[]
      ) => {
        return regionStatesData.reduce(sumDeviceTotals, initialDeviceTotals);
      };

      const generateTooltipBody = (devices: Omit<Devices, 'total'>) => {
        return [
          `• Desktops: ${devices.desktops};`,
          `• Laptops: ${devices.laptops};`,
          `• Smartphones: ${devices.smartphones};`,
          `• Tablets: ${devices.tablets};`,
        ];
      };

      if (!isGroupedByRegion) {
        const firstChild = cellData.children?.[0]?._data;
        const stateDevices = firstChild?.devices ?? initialDeviceTotals;

        return generateTooltipBody(stateDevices);
      }
    },
  }),
};
