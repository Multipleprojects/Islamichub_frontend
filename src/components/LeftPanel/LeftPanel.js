import React, { Component } from "react";
//import Chapter from "./Chapter/Chapter";
import Surah from "./Surah/Surah";
import Verse from "./Verse/Verse";
import Reciter from "./Reciter/Reciter";
import TextEditions from "./Editions/Text/TextEditions";
import Translations from "./Editions/Translations/Translations";
// import { Tabs, TabPanel, TabList, Tab } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./LeftPanel.css";
import Search from "./Search/Search";
import { connect } from "react-redux";

class LeftPanel extends Component {
  render() {
    return (
      <div className='container'>
        <h4 className="underline mb-4">Quran e Kareem</h4>
        
        <Reciter />

      
            <Translations />
        
      
        <TextEditions />
        <div className="d-flex justify-content-between m-auto pt-4 pb-2 gap-4">
    
        <Surah />
        <Verse />
    </div>
      </div>
    );
  }
}

const mapStatesToProps = state => {
  return {
    settings: state.settings,
  };
};

export default connect(mapStatesToProps)(LeftPanel);
