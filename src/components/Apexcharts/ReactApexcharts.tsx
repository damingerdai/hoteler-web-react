/* eslint-disable react/no-unused-prop-types, consistent-return */
import * as React from 'react';
import { useEffect, useRef, useImperativeHandle } from 'react';
import ApexCharts from 'apexcharts';
import { ChartType } from './ApexTypes';

declare global {
  interface Window {
    ApexCharts: typeof ApexCharts;
  }
}

// window.ApexCharts = ApexCharts;

interface ApexChartsProps {
  as?: React.ElementType;
  width?: string | number;
  height?: string | number;
  type: ChartType;
  options?: ApexCharts.ApexOptions;
  series: ApexCharts.ApexOptions['series']
}

export const Chart = React.forwardRef<HTMLElement, ApexChartsProps>((props, ref) => {
  const { as, ...rest } = props;
  const chartRef = useRef<React.MutableRefObject<HTMLElement>>(null);
  const el = React.createElement(as || 'div', { ref: chartRef });

  useEffect(() => {
    if (!chartRef || !chartRef.current) {
      return;
    }
    const config = {
      type: rest.type,
      width: rest.width,
      height: rest.height,
      series: rest.series,
      ...rest.options,
    };
    const chart = new ApexCharts(chartRef.current, config);
    chart.render();
    return () => {
      chart.destroy();
    };
  }, [chartRef, rest]);

  useImperativeHandle(ref, () => chartRef.current as unknown as HTMLElement);

  return el;
});

Chart.displayName = 'Chart';
