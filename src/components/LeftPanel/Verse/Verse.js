import React, { Component } from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import Select from "react-select";
import "./Verse.css";

class Verse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verseRange: this.props.verseRange.verseRange,
    };
  }

  componentDidMount() {
    this.fetchSurah();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.selectedSurah.selectedSurah !==
      nextProps.selectedSurah.selectedSurah
    ) {
      this.fetchSurah(nextProps);
    }
  }

  fetchSurah(nextProps) {
    let selectedSurah = this.props.selectedSurah.selectedSurah;
    if (nextProps) {
      selectedSurah = nextProps.selectedSurah.selectedSurah;
    }

    const totalAyahs = [...Array(selectedSurah.numberOfAyahs).keys()];

    // Add the default "Verse" option at the beginning of the options array
    const verseOptions = [{ value: 0, label: "Select Verse" }, ...totalAyahs.map((ayah) => {
      return { value: ayah + 1, label: ayah + 1 };
    })];

    this.setState({
      verseOptions: verseOptions,
    });
  }

  onVerseFromChangeHandler = (event) => {
    let verseRange = this.state.verseOptions.length;
    if (this.state.verseRange[1] !== 0) {
      verseRange = this.state.verseRange[1];
    }

    // Only update the range if a valid verse is selected (not "Verse")
    if (event.value !== 0) {
      this.setState({
        verseRange: [event.value, verseRange],
      });
      this.props.dispatch({
        type: "AYAHRANGE",
        verseRange: [event.value, verseRange],
      });
    }
  };

  customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: "rgb(8,124,128)",
      backgroundColor: "white",
 padding:'0.2rem',
      boxShadow: state.isFocused ? "0 0 0 1px rgb(8,124,128)" : null,
      "&:hover": {
        borderColor: "rgb(8,124,128)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "rgb(8,124,128)" : "white",
      color: state.isFocused ? "white" : "black",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  render() {
    if (!this.props.surahList.surahList)
      return <ReactLoading color="#3594a3" type="spinningBubbles" />;

    if (!this.state.verseOptions)
      return <ReactLoading type="bars" />;

    return (
      <div className="versee ">
        <div className="row">
          <div className="col-md-12">
            <Select
              options={this.state.verseOptions}
              placeholder="Select a verse"
              onChange={this.onVerseFromChangeHandler}
              value={
                this.props.verseRange.verseRange[0] === 0
                  ? this.state.verseOptions[0] // Show "Verse" when value is 0
                  : this.state.verseOptions.find((element) => {
                      return (
                        element.value === this.props.verseRange.verseRange[0]
                      );
                    })
              }
              styles={this.customStyles}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    surahList: state.surahList,
    surah: state.surah,
    verseRange: state.verseRange,
    selectedSurah: state.selectedSurah,
  };
};

export default connect(mapStateToProps)(Verse);
