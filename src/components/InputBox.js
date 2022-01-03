import React from "react";
import { Calc } from "../helpers/Calculations";

class InputBox extends React.Component {
  state = {
    data: "",
    errorMessage: "",
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

    //dx values
    const dx = Calc.linspace(0, 10, 110);
    console.log(this.state.data);
    console.log(Calc.getParrays(dx, this.state.data));
  };

  render() {
    return (
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
    );
  }
}

export default InputBox;
