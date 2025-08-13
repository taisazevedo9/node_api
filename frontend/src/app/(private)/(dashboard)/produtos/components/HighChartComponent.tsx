import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
  title: {
    text: "Gráfico de Exemplo",
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  series: [
    {
      name: "Vendas",
      data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0],
    },
  ],
};

export default function HighChartComponent() {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
