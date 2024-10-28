import React, { Component } from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import Select from "react-select";
import "./Surah.css";
class Surah extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // Any initialization logic can go here
  }
  onSurahChangeHandler = (event) => {
    let selectedSurah = this.props.surahList.surahList.find(
      (element) => element.value === event.value
    );
    this.props.dispatch({
      type: "SELECTEDSURAH",
      selectedSurah: selectedSurah,
    });
    this.props.dispatch({ type: "SURAH", surah: selectedSurah.value });
    this.props.dispatch({ type: "AYAHRANGE", verseRange: [0, 0] });
  };

  render() {
    if (!this.props.surahList.surahList)
      return <ReactLoading color="#3594a3" type="spinningBubbles" />;

    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        borderColor: "rgb(8,124,128)",
        backgroundColor: "white",
        boxShadow: state.isFocused ? "0 0 0 1px rgb(8,124,128)" : null,
        "&:hover": {
          borderColor: "rgb(8,124,128)",
        },
        fontWeight: "normal", // Ensure text is not bold
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: "white",
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused
          ? "rgb(8,124,128)"
          : "white",
        color: state.isFocused ? "white" : "black",
        fontWeight: "normal", // Ensure text is not bold
      }),
      singleValue: (provided) => ({
        ...provided,
        color: "black",
        fontWeight: "normal", // Ensure text is not bold
      }),
      placeholder: (provided) => ({
        ...provided,
        color: "black",
        fontWeight: "normal", // Ensure text is not bold
      }),
    };

    return (
      <div className="Surah w-50">
        <Select
          options={this.props.surahList.surahList}
          onChange={this.onSurahChangeHandler}
          className="surahName"
          placeholder="Select Surah"
          defaultValue={this.props.surahList.surahList[0]}
          value={this.props.surahList.surahList.find(
            (element) => element.value === this.props.surah.surah
          )}
          styles={customStyles} // Apply custom styles here
        />
      </div>
    );
  }
}

const mapStatesToProps = (state) => {
  return {
    surahList: state.surahList,
    surah: state.surah,
    selectedSurah: state.selectedSurah,
    verseRange: state.verseRange,
  };
};

export default connect(mapStatesToProps)(Surah);
