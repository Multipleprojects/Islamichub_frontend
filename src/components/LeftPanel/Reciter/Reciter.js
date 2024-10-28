import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";

// Corrected import paths (after moving images to src/assets/)
import simpleminimal from '../../../assets/11.jpg'; 
import uthmani from '../../../assets/12.jpg'; 
import tajweed from '../../../assets/13.jpg'; 
import wordbyword from '../../../assets/14.png'; 
import alfasay from '../../../assets/16.jpeg';
import child from '../../../assets/15.jpg'; 

class Reciter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSmallScreen: false, // Add state for small screen detection
    };
  }

  componentDidMount() {
    // Add event listener to detect screen resizing
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    // Clean up event listener when component unmounts
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    // Update state based on screen size
    this.setState({ isSmallScreen: window.innerWidth <= 750 });
  };

  onReciterChangeHandler = (event) => {
    this.props.dispatch({ type: "AUDIO", audio: event.value });
  };

  render() {
    if (!this.props.reciterList.reciterList) return <p>Loading Audios list ...</p>;

    const { isSmallScreen } = this.state; // Get the screen size from state

    // Custom styles for the Select component
    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        borderColor: "rgb(8,124,128)",
        backgroundColor: "white",
        boxShadow: state.isFocused ? "0 0 0 1px rgb(8,124,128)" : null,
        "&:hover": {
          borderColor: "rgb(8,124,128)",
        },
        fontWeight: "normal",
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: "white",
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? "rgb(8,124,128)" : "white",
        color: state.isFocused ? "white" : "black",
        fontWeight: "normal",
      }),
      singleValue: (provided) => ({
        ...provided,
        color: "black",
        fontWeight: "normal",
      }),
      placeholder: (provided) => ({
        ...provided,
        color: "black",
        fontWeight: "normal",
      }),
    };

    const images = [
      simpleminimal,
      uthmani,
      tajweed,
      wordbyword,
      alfasay,
      child,
    ]; // Example array of image paths

    return (
      <div className="mt-3">
        <h5>Reciter</h5>
        <div className="d-flex justify-content-between">
          {/* Display additional reciter options from index 1 to 6 */}
          {this.props.reciterList.reciterList.slice(1, 6).map((val, index) => (
            <div
              key={val.value}
              className="reciter-item text-center"
              onClick={() => this.onReciterChangeHandler({ value: val.value })}
              style={{ cursor: "pointer" }}
            >
              {/* Parent div to wrap img and p */}
              <img
                className="rounded-circle images"
                src={images[index % images.length]} // Rotate through images array
                alt={val.label}
              />
              <p className="pt-2">
                {isSmallScreen && val.label.length > 5
                  ? val.label.slice(0, 6)+"."
                  : val.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStatesToProps = (state) => {
  return {
    audio: state.audio,
    reciterList: state.reciterList,
  };
};

export default connect(mapStatesToProps)(Reciter);
