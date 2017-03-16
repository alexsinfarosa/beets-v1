import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { observable, action } from "mobx";
import ResultsGraph from "./ResultsGraph";
import _ from "lodash";
import { format, isBefore, subDays } from "date-fns";

// styles
import "./results.css";

// styled-components
import { Low, Caution, High } from "./styles";

@inject("store")
@observer
export default class ResultsTable extends Component {
  @observable isGraphDisplayed = false;
  @action setIsGraphDisplayed = d => this.isGraphDisplayed = d;
  @observable currentYear = format(new Date(), "YYYY");

  handleGraphClick = () => {
    this.setIsGraphDisplayed(!this.isGraphDisplayed);
  };

  render() {
    const {
      dates,
      stationR,
      endDateR,
      DICV,
      A2Day,
      A14Day,
      A21Day,
      season
    } = this.props.store.app;

    const months = dates.map(date => {
      if (isBefore(subDays(date, 1), endDateR)) {
        return (
          <th className="months before" key={date}>{format(date, "MMM D")}</th>
        );
      } else {
        return (
          <th className="months after" key={date}>{format(date, "MMM D")}</th>
        );
      }
    });

    let HeaderTable = null;
    if (this.currentYear === format(endDateR, "YYYY")) {
      HeaderTable = (
        <th className="after" colSpan="5">
          {" "}5 Days forecasts
          <a
            target="_blank"
            href={
              `http://forecast.weather.gov/MapClick.php?textField1=${stationR.lat}&textField2=${stationR.lon}`
            }
            className="forecast-details"
          >
            Forecast Details
          </a>
        </th>
      );
    } else {
      HeaderTable = (
        <th className="after" colSpan="5">
          {" "}Ensuing 5 Days
        </th>
      );
    }

    const daily = DICV.map((e, i) => {
      if (e < 6) {
        return <Low key={i}>{e}</Low>;
      } else if (e === 6) {
        return <Caution key={i}>{e}</Caution>;
      }
      return <High key={i}>{e}</High>;
    });

    const displayA2Day = A2Day.map((e, i) => <td key={i}>{e}</td>);

    const dailyInfectionRisk = DICV.map((e, i) => {
      if (e < 6) {
        return <Low key={i}>Low</Low>;
      } else if (e === 6) {
        return <Caution key={i}>Caution</Caution>;
      }
      return <High key={i}>High</High>;
    });

    const displayA14Day = A14Day.map((e, i) => <td key={i}>{e}</td>);
    const displayA21Day = A21Day.map((e, i) => <td key={i}>{e}</td>);
    const displaySeason = season.map((e, i) => <td key={i}>{e}</td>);

    return (
      <table>
        <thead>
          <tr>
            <th rowSpan="2" />
            <th className="before">Past</th>
            <th className="before">Past</th>
            <th className="before">Current</th>
            {HeaderTable}
          </tr>
          <tr>
            {/* <th /> */}
            {_.takeRight(months, 8)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th><small>Daily <br />Infection Values</small></th>
            {_.takeRight(daily, 8)}
          </tr>
          <tr>
            <th><small>Daily <br /> Infection Level</small></th>
            {_.takeRight(dailyInfectionRisk, 8)}
          </tr>
          <tr>
            <th><small>2-Day <br /> Total Infection Values</small></th>
            {_.takeRight(displayA2Day, 8)}
          </tr>
          <tr>
            <th><small>14-Day <br />Accum. Infection Values</small></th>
            {_.takeRight(displayA14Day, 8)}
          </tr>
          <tr>
            <th><small>21-Day <br /> Accum. Infection Values</small></th>
            {_.takeRight(displayA21Day, 8)}
          </tr>
          <tr>
            <th><small>Season <br /> Total Infection Values</small></th>
            {_.takeRight(displaySeason, 8)}
          </tr>
          <tr>
            <td colSpan="9" className="has-text-centered graph">
              <a className="graph-link" onClick={this.handleGraphClick}>
                {this.isGraphDisplayed ? "Hide" : "Show"}
                {" "}
                Accumulated Degree-Days Graph
              </a>

              {this.isGraphDisplayed && <ResultsGraph />}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
