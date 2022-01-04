import React from "react";
import ScatterChart from "./ScatterChart";
import LineChart from "./LineChart";

class InputBox extends React.Component {
  state = {
    data: {},
    errorMessage: "",
    displayCharts: false,
  };

  handleFileInput = (event) => {
    //Read file content
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = (e) => {
      //Try to parse file as Json object
      try {
        this.setState({ data: JSON.parse(e.target.result) });
      } catch (err) {
        this.setState({ errorMessage: "Not the right file format" });
      }
    };
  };

  handleSubmission = () => {
    //Plot graphs here!
    this.setState({ displayCharts: true });
  };

  render() {
    return (
      <>
        <div className="card">
          <p>Enter data as a .txt file here</p>
          <input
            onChange={this.handleFileInput}
            type="file"
            id="inputFile"
            accept=".txt, .json"
          />
          <p>{this.state.errorMessage}</p>
          <button
            onClick={this.handleSubmission}
            id="submitButton"
            className="button"
          >
            submit
          </button>
        </div>
        {this.state.displayCharts ? (
          <div className="flex_container">
            <ScatterChart fileData={this.state.data} />
            <LineChart fileData={this.state.data} />
          </div>
        ) : null}
      </>
    );
  }
}

export default InputBox;
