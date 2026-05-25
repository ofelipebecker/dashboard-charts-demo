import { devicesByStateData } from './devicesByStateData.ts';
import type { TooltipItem } from 'chart.js';
import {
  type TreemapDataPoint,
  type TreemapScriptableContext,
} from 'chartjs-chart-treemap';

type Devices = {
  desktops: number;
  laptops: number;
  smartphones: number;
  tablets: number;
};

type Region = 'North' | 'Northeast' | 'Southeast' | 'South' | 'Central-West';

export type DevicesByStateData = {
  name: string;
  abbreviation: string;
  region: Region;
  total: number;
  devices: Devices;
};

type DeviceDataCollection = DevicesByStateData & {
  children?: DevicesByStateData[];
  label?: string;
  path?: string;
};

type TreemapDataPointWithData = TreemapDataPoint & {
  _data?: DeviceDataCollection;
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

export const devicesByStateChartData: DevicesByStateData[] =
  devicesByStateData.map((state) => ({
    name: state.name,
    abbreviation: state.abbreviation,
    region: state.region as Region,
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

export const devicesByStateChartGroupingConfig = {
  buttonText: {
    default: 'Show Regions',
    alternate: 'Hide Regions',
  },
  groups: {
    default: ['abbreviation'],
    alternate: ['region', 'abbreviation'],
  },
};

export type DevicesByStateChartGroupingConfig =
  typeof devicesByStateChartGroupingConfig;

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

      const firstChild = cellData.children?.[0];

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
        acc: Devices,
        stateData: DevicesByStateData
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

      const getRegionsTotals = (regionStatesData: DevicesByStateData[]) => {
        return regionStatesData.reduce(sumDeviceTotals, initialDeviceTotals);
      };

      const generateTooltipBody = (devices: Devices) => {
        return [
          `• Desktops: ${devices.desktops};`,
          `• Laptops: ${devices.laptops};`,
          `• Smartphones: ${devices.smartphones};`,
          `• Tablets: ${devices.tablets};`,
        ];
      };

      if (!isGroupedByRegion) {
        const firstChild = cellData.children?.[0];
        const stateDevices = firstChild?.devices ?? initialDeviceTotals;

        return generateTooltipBody(stateDevices);
      }

      if (isGroupedByRegion) {
        const regionStatesData = cellData.children ?? [];

        const regionDevices = getRegionsTotals(regionStatesData);
        return generateTooltipBody(regionDevices);
      }
    },
  }),
};

export type DevicesByStateChartCallbacks = typeof devicesByStateChartCallbacks;
