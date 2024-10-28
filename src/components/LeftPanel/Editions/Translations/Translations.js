import React, { Component } from "react";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import "./Translations.css";
// Corrected import paths (after moving images to src/assets/)
import english1 from '../../../../assets/ahmadali.jpeg'; 
import english2 from '../../../../assets/ahmadraza.jpeg'; 
import english3 from '../../../../assets/arberry.jpg'; 
import english4 from '../../../../assets/asad.jpg'; 
import english5 from '../../../../assets/dariyabadi.png'; 
import urdu1 from '../../../../assets/ahmadali.jpeg'; 
import urdu2 from '../../../../assets/jalandhri.jpg';
import urdu3 from '../../../../assets/allamajawadi.png'; 
import urdu4 from '../../../../assets/ahmadraza.jpeg';
import urdu5 from '../../../../assets/tahir.jpeg';

class Translations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSmallScreen: false, // Track if the screen is small
    };
  }

  // Function to handle screen resizing
  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({ isSmallScreen: window.innerWidth <= 750 });
  };

  // Function to handle translation selection
  onTranslationChangeHandler = (selectedOption) => {
    this.props.dispatch({
      type: "TRANSLATION",
      translation: selectedOption ? selectedOption.value : null,
    });
  };

  render() {
    const { translationList } = this.props;
    const { isSmallScreen } = this.state; // Get the small screen state

    if (!translationList.translationList)
      return <ReactLoading color="#087C80" type="spinningBubbles" />;

    // Filter translation list to include only Urdu and English
    const filteredTranslationList = translationList.translationList
      .map((group) => ({
        ...group,
        options: group.options.filter(
          (translation) =>
            translation.value.startsWith("ur.") || translation.value.startsWith("en.")
        ),
      }))
      .filter((group) => group.options.length > 0); // Exclude empty groups

    // Image arrays for English and Urdu translations
    const englishImages = [english1, english2, english3, english4, english5];
    const urduImages = [urdu1, urdu2, urdu3, urdu4, urdu5];

    return (
      <div className="Translations">
        <h5>Translations</h5>
        {filteredTranslationList.map((group, groupIndex) => (
          <div key={group.label} className="translation-group mb-4">
            {/* Group header */}
            <h6>{group.label}</h6>
            
            {/* Display each option with an associated image */}
            <div className="d-flex justify-content-between">
              {group.options.slice(0, 5).map((translation, index) => {
                // Assign English or Urdu images based on the language
                const isUrdu = translation.value.startsWith("ur.");
                const images = isUrdu ? urduImages : englishImages;

                // Limit the label length if on a small screen
                const truncatedLabel = isSmallScreen && translation.label.length > 5 
                  ? translation.label.slice(0, 6) + "." 
                  : translation.label;

                return (
                  <div
                    key={translation.value}
                    className="translation-item text-center"
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      className="rounded-circle images"
                      src={images[index % images.length]} // Assign an image
                      alt={translation.label}
                      onClick={() => this.onTranslationChangeHandler(translation)}
                    />
                    <p className="pt-2" onClick={() => this.onTranslationChangeHandler(translation)}>
                      {truncatedLabel} {/* Show truncated or full label */}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStatesToProps = (state) => {
  return {
    translationList: state.translationList,
    translation: state.translation,
  };
};

export default connect(mapStatesToProps)(Translations);
