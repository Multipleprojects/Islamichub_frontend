import React, { Component } from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import { fetchSurah } from "../../../scripts/surah";
import {IoClose, IoMenu} from "react-icons/io5"

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  fetchSurah = nextProps => {
    fetchSurah(this.props, nextProps)
      .then(surah => {
        this.setState({
          surah: surah
        });
      })
      .catch(error => {
        console.log("error in topjs call", error);
      });
  };

  componentDidMount() {
    this.fetchSurah();
  }

  componentDidUpdate(nextProps) {
    if (this.props.surah.surah !== nextProps.surah.surah) {
      this.setState({
        surah: null
      });
      this.fetchSurah(this.props);
    }
  }

  handleSettings = () => {
    this.props.dispatch({
      type: "SHOWSETTINGS",
      settings: !this.props.settings.settings
    });
  }

  render() {
    if (!this.state.surah) return <ReactLoading color="#3594a3" type="cylon" />;
    //console.log(this.state.surah.name);
    return (
      <div className="row mt-2">
        <div className="col-md-12 mobile-block justify-content-between align-items-center">
          <h4 className="text-left settings" onClick={this.handleSettings}>{this.props.settings.settings ? <IoClose/>  : <IoMenu />}</h4>
          <h4 className="text-right surahName">
          <span className="ayaat">{this.state.surah.revelationType}{" - "}
            {this.state.surah.numberOfAyahs}</span>{" - "}{this.state.surah.name}
          </h4>
        </div>
        <div className="col-md-4 mobile-none">
          <h4 className="text-left surahName">
            {this.state.surah.englishName}{" - "}<span className="ayaat">{this.state.surah.revelationType}{" - "}
            {this.state.surah.numberOfAyahs}</span>
          </h4>
          
        </div>
        <div className="col-md-4 mobile-none">
          <h3 className="text-center bismillah">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </h3>
        </div>
        <div className="col-md-4 mobile-none">
          <h4 className="text-right surahName">
            {this.state.surah.name}
          </h4>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = state => {
  return {
    surah: state.surah,
    edition: state.edition,
    chapter: state.chapter,
    translation: state.translation,
    verseRange: state.verseRange,
    settings: state.settings,
  };
};

export default connect(mapStatesToProps)(Top);
