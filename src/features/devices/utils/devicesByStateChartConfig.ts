import {
  type DevicesByStateData,
  devicesByStateData,
} from './devicesByStateData.ts';
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
};
