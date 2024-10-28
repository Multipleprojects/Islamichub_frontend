// src/components/Main/Main.js
import React, { Component } from "react";
import LeftPanel from "./components/LeftPanel/LeftPanel";
import RightPanel from "./components/RightPanel/RightPanel";
import { connect } from "react-redux";
import {
  fetchSurahs,
  fetchRecitations,
  fetchTextEditions,
  fetchTranslations,
} from "./scripts/scripts";
import './App.css'
class Main extends Component {
  styles = {
    marginLeft: 0,
    marginRight: 0,
  };

  componentDidMount() {
    fetchSurahs(this.props);
    fetchTranslations(this.props);
    fetchTextEditions(this.props);
    fetchRecitations(this.props);
  }

  render() {
    return (
      <div className="mt-4" style={this.styles}>
       
        <div className="">
          <LeftPanel />
        </div>
        <div className="">
          <RightPanel />
        </div>
      </div>
    );
  }
}

export default connect()(Main);
