import React from "react";
import { Scatter } from "react-chartjs-2";

class ScatterChart extends React.Component {
  ASPECT_RATIO = 1.3;

  /**
   * Returns an object to append to the datasets array.
   */
  rowData(Ycoords, Xcoord, label, color) {
    let data = [];
    //Iterates through the array and adds every item to the data array.
    Ycoords.forEach((Ycoord) => {
      data.push({ x: Xcoord, y: Ycoord });
    });
    return {
      label: label,
      data: data,
      backgroundColor: color,
    };
  }

  /**
   * Takes data in the initial form and returns a dataset object ready to plot.
   */
  getDatasets(fileData) {
    let datasets = [];
    let rowNumber = 1;
    Object.keys(fileData).forEach((key) => {
      datasets.push(
        this.rowData(
          fileData[key],
          rowNumber,
          key,
          "rgb(160," + 30 * rowNumber + ",30)"
        )
      );
      rowNumber++;
    });
    return datasets;
  }

  render() {
    return (
      <div className="chart">
        <Scatter
          data={{
            datasets: this.getDatasets(this.props.fileData),
          }}
          options={{
            aspectRatio: this.ASPECT_RATIO,
            pointRadius: 2,
            scales: {
              x: {
                title: {
                  text: "Treatment-response subgroup",
                  display: true,
                },
                type: "linear",
                position: "bottom",
              },
              y: {
                title: {
                  text: "Measured administration effectiveness",
                  display: true,
                },
              },
            },
          }}
        />
      </div>
    );
  }
}

export default ScatterChart;
