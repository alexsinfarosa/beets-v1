import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { format } from "date-fns";

// styled-components
import { CenterText } from "./styles";

@inject("store")
@observer
export default class ResultsHeader extends Component {
  render() {
    const {
      diseaseR,
      stationR,
      startDateR,
      endDateR
    } = this.props.store.app;

    return (
      <div>
        <CenterText>
          <h4 style={{ letterSpacing: "1px" }}>
            {diseaseR}
            {" "}
            Predictions for
            {" "}
            {stationR.name}
          </h4>
        </CenterText>
        <CenterText>
          <h5 style={{ letterSpacing: "1px" }}>
            {format(startDateR, "MM/DD/YYYY")}
            {" "}
            through
            {" "}
            {format(endDateR, "MM/DD/YYYY")}
          </h5>
        </CenterText>
      </div>
    );
  }
}
