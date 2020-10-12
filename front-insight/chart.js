google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

const drawChart = () => {
  const jsonData = $.ajax({
    url: 'http://localhost:3030/performance-score',
    dataType: "json",
    async: false
    })
    .responseJSON;
  const data = new google.visualization.DataTable();
  data.addColumn('date', 'Time of Day');
  data.addColumn('number', 'Performance score');

  data.addRows([
    ...jsonData.map(({ score, date_performance }) => ([ new Date(date_performance), score ]))
  ]);
  const TooltipFormatter = new google.visualization.DateFormat({ pattern: 'dd MMM yyyy HH:mm:ss' });
  TooltipFormatter.format(data, 0);

  const options = {
    title: 'Performance score depending on date',
    width: 900,
    height: 500,
    hAxis: {
      format: 'YYYY-MM-dd HH:mm:ss',
      gridlines: { count: 15 }
    },
    vAxis: {
      gridlines: { color: 'none' },
      minValue: 0
    }
  };

  const chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}