import AbstractSmartComponent from '../components/abstract-smart-component.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {TYPES, ONE_HOUR_IN_MS} from '../сonst.js';
import {getStringWithFirstCapitalLetter} from '../utils/common.js';

const BAR_HEIGHT = 55;

const renderTimeSpendChart = (timeCtx, events) => {
  const typesTimeSpend = {};
  events.forEach((event) => {
    const inc = typesTimeSpend[event.type] ? parseInt(typesTimeSpend[event.type], 10) : 0;
    typesTimeSpend[event.type] = inc + (event.time.end.getTime() - event.time.start.getTime());
  });

  const chartsLabels = [];
  const chartsData = [];
  Object.entries(typesTimeSpend).sort(function (a, b) {
    return b[1] - a[1];
  }).forEach((type) => {
    chartsLabels.push(type[0].toUpperCase());
    chartsData.push(Math.round(type[1] / ONE_HOUR_IN_MS));
  });

  timeCtx.height = BAR_HEIGHT * chartsLabels.length;

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartsLabels,
      datasets: [{
        data: chartsData,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 50,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `TIME SPENT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (transportCtx, events) => {
  const typesTransportUsage = {};
  events.forEach((event) => {
    if (TYPES.transfer.includes(getStringWithFirstCapitalLetter(event.type))) {
      const inc = typesTransportUsage[event.type] ? parseInt(typesTransportUsage[event.type], 10) : 0;
      typesTransportUsage[event.type] = inc + 1;
    }
  });

  const chartsLabels = [];
  const chartsData = [];
  Object.entries(typesTransportUsage).sort(function (a, b) {
    return b[1] - a[1];
  }).forEach((type) => {
    chartsLabels.push(type[0].toUpperCase());
    chartsData.push(type[1]);
  });

  transportCtx.height = BAR_HEIGHT * chartsLabels.length;

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartsLabels,
      datasets: [{
        data: chartsData,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 50,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderMoneyChart = (moneyCtx, events) => {
  const typesMoneySpend = {};
  events.forEach((event) => {
    const inc = typesMoneySpend[event.type] ? parseInt(typesMoneySpend[event.type], 10) : 0;
    typesMoneySpend[event.type] = inc + event.price;
  });

  const chartsLabels = [];
  const chartsData = [];
  Object.entries(typesMoneySpend).sort(function (a, b) {
    return b[1] - a[1];
  }).forEach((type) => {
    chartsLabels.push(type[0].toUpperCase());
    chartsData.push(type[1]);
  });

  moneyCtx.height = BAR_HEIGHT * chartsLabels.length;

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartsLabels,
      datasets: [{
        data: chartsData,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 50,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const getStatsTemplate = () => {
  return (
    `<section class="statistics visually-hidden">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

class Stats extends AbstractSmartComponent {
  constructor(eventsModel) {
    super();

    this._eventsModel = eventsModel;
    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;
  }

  getTemplate() {
    return getStatsTemplate();
  }

  recoveryListeners() {

  }

  show() {
    this.rerender();
    super.show();
  }

  rerender() {
    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeCtx = element.querySelector(`.statistics__chart--time`);
    this._moneyChart = renderMoneyChart(moneyCtx, this._eventsModel.getEventsAll());
    this._transportChart = renderTransportChart(transportCtx, this._eventsModel.getEventsAll());
    this._timeChart = renderTimeSpendChart(timeCtx, this._eventsModel.getEventsAll());
  }
}

export default Stats;
