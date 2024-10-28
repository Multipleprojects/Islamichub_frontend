import React, { Component } from "react";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import Verse from "./Verse/Verse";
import Translation from "./Translation/Translation";
import Scrollbar from "react-scrollbars-custom";
import { fetchTranslation } from "../../scripts/translation";
import { fetchSurah } from "../../scripts/surah";
import { adjustScrollbar, scrollAayat } from "../../scripts/scrollbar";

class Quran extends Component {
  scrollBar = null;
  constructor(props) {
    super(props);
    this.state = { searchResult: false, translation: null, lastSeenAyah: 0 };
  }

  fetchTrans = nextProps => {
    this.setState({
      translation: null
    });
    fetchTranslation(this.props, nextProps).then(translation => {
      this.setState({
        translation: translation
      });
    });
  };

  fetchSurah = nextProps => {
    fetchSurah(this.props, nextProps).then(surah => {
      this.setState({
        surah: surah
      });
    });
  };

  componentDidMount() {
    this.fetchSurah();
    if (this.props.translation.translation !== null) {
      this.fetchTrans();
    }
    //console.log(window, ' wind');
    let lastseen = Number(localStorage.getItem("lastSeenAyah"));
    if(lastseen){
      this.setState({lastSeenAyah : lastseen})
    }
  }

  
  styles = {
    mainDiv: {
      height: window.innerHeight - 108 + "px",
      direction: "rtl",
      scrollbarGutter: "stable", 
    }
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return typeof this._scrollBar !== "undefined" && this._scrollBar !== null
      ? (this.scrollBar = this._scrollBar)
      : this.scrollBar;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //console.log("I am in update", snapshot);

    if (this.props !== prevProps) {
      this.fetchSurah(this.props);
      this.fetchTrans(this.props);
    }

    if (snapshot !== null) {
      adjustScrollbar(this.scrollBar, this.props, prevProps);
    }
    if(typeof this._scrollBar !== "undefined" && this._scrollBar !== null){
      const storedAyah = localStorage.getItem('lastSeenAyah');
      if(storedAyah){
        scrollAayat(this._scrollBar, storedAyah)
      }
    }

  }

  //TODO: fetch Translation again on verse Range selection

  render() {
    if (!this.state.surah) return <ReactLoading color="rgb(8,124,128)" type="cylon" />;

    if (this.state.searchResult) {
      if (!this.state.searchResults) {
        return <ReactLoading color="rgb(8,124,128)" type="cylon" />;
      } else {
        return (
          <Scrollbar
            style={this.styles.mainDiv}
            rtl={true}
            noScrollX={true}
            scrollTop={0}
            ref={scrollBar => {this._scrollBar = scrollBar}}
          >
            <div> Total Results Found: {this.state.searchResults.count}</div>
            {this.state.searchResults.matches.map(match => {
              return <div>{match.text}</div>;
            })}
          </Scrollbar>
        );
      }
    }

    return (
      <Scrollbar
        style={this.styles.mainDiv}
        rtl={true}
        noScrollX={true}
        scrollTop={0}
        ref={scrollBar => {this._scrollBar = scrollBar}}
      >
        {this.state.surah.ayahs.map((ayah, index) => {
          return (
            <div key={"versecontainer_".concat(ayah.number)} className={`${Number(this.props.highlight.highlight.toString().split(".")[0]) === ayah.number || this.state.lastSeenAyah === index+1 ? 'highlight' : ""}`}>
              <Verse
                ayah={ayah}
                key={"verse_".concat(ayah.number)}
                surah={this.state.surah.number}
              />
              {this.state.translation ? (
                <Translation
                  ayah={this.state.translation.ayahs[index]}
                  language={this.state.translation.edition.language}
                  key={"trans_".concat(ayah.number)}
                />
              ) : this.props.translation.translation === null ? null : (
                <ReactLoading type="bars" color="rgb(8,124,128)ue" />
              )}
            </div>
          );
        })}
      </Scrollbar>
    );
  }
}

const mapStateToProps = state => {
  //console.log("state in Quran", state);
  return {
    surah: state.surah,
    edition: state.edition,
    chapter: state.chapter,
    translation: state.translation,
    verseRange: state.verseRange,
    highlight: state.highlight,
    searchText: state.searchText
  };
};
export default connect(mapStateToProps)(Quran);
