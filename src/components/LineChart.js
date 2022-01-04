import React from "react";
import { Chart } from "react-chartjs-2";
import { Calc } from "../helpers/Calculations";

class LineChart extends React.Component {
  ASPECT_RATIO = 1.3;
  DX = Calc.linspace(0, 1, 100);

  getData(fileData) {
    return Calc.getParrays(this.DX, fileData);
  }

  render() {
    return (
      <div className="chart">
        <Chart
          type="line"
          data={{
            labels: this.DX,
            datasets: [
              {
                label: "My First Dataset",
                data: this.getData(this.props.fileData)[2],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          }}
          options={{ aspectRatio: this.ASPECT_RATIO }}
        />
      </div>
    );
  }
}

export default LineChart;
