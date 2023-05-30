import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart = (props) => {
    
  const series = [{
    data: props.data
  }]

  const options = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: 'CandleStick Chart',
      align: 'center'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="candlestick" height={350} />
    </div>
  );
};

export default Chart;
