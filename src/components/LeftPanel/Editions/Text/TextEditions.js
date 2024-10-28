import React, { Component } from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import clean from '../../../../assets/6.webp'; // Corrected path
import simpleminimal from '../../../../assets/3.jpg'; // Corrected path
import uthmani from '../../../../assets/2.jpeg'; // Corrected path
import tajweed from '../../../../assets/tajweed.png'; // Corrected path
import wordbyword from '../../../../assets/4.jpg'; // Corrected path
import child from '../../../../assets/1.jpeg'; // Corrected path

class TextEditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEdition: null,
      isSmallScreen: false, // Track if the screen is small
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({   });
  };

  onEditionChangeHandler = (selectedOption) => {
    this.setState({ selectedEdition: selectedOption });
    this.props.dispatch({ type: "EDITION", edition: selectedOption.value });
  };

  render() {
    const { editionList } = this.props;
    const { selectedEdition, isSmallScreen } = this.state;

    if (!editionList || !editionList.editionList) {
      return <ReactLoading color="rgb(8,124,128)" type="spinningBubbles" />;
    }

    const images = [clean, simpleminimal, uthmani, tajweed, wordbyword, child]; // Example array of image paths

    return (
      <div className="editions">
        <h5>Editions</h5>

        <div className="edition-images d-flex justify-content-between">
          {editionList.editionList
            .filter((_, index) => ![1, 2, 3, 4, 7, 9, 11, 12].includes(index)) // Exclude specific indexes
            .map((edition, index) => {
              // Limit the label length to 7 characters on small screens
              const truncatedLabel = edition.label.length > 7
                ? edition.label.slice(0, 7) + "."
                : edition.label;

              return (
                <div
                  key={edition.value}
                  onClick={() => this.onEditionChangeHandler(edition)}
                  className="edition-item"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    className="rounded-circle images"
                    src={images[index % images.length]}
                    alt={images[index % images.length]}
                  />
                  <p className="pt-2 text-center">
                    {truncatedLabel} {/* Show truncated or full label */}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editionList: state.editionList,
    edition: state.edition,
  };
};

export default connect(mapStateToProps)(TextEditions);
