import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import {
  ComposedChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  Text,
  Tooltip,
  Legend,
  Rectangle
} from "recharts";
import CustomLabel from "./CustomLabel";
// import CustomToolTip from "./CustomToolTip";
import CustomBar from "./CustomBar";

// styles
import "./styles";

// styled-components
import { StyledTooltip } from "./styles";

@inject("store")
@observer
export default class ResultsTable extends Component {
  render() {
    const { graphData, barColor } = this.props.store.app;

    const renderTooltip = props => {
      const { payload, label } = props;
      if (payload.length > 0) {
        // console.log(payload[3]);
        return (
          <StyledTooltip>
            <h5>{label}</h5>
            <p style={{ color: payload[3].color }}>
              {`${payload[3].name} Infection Values: ${payload[3].value}`}
            </p>
          </StyledTooltip>
        );
      }
    };

    return (
      <div>
        <Text style={{ display: "block", marginTop: "20px", fontSize: "16px" }}>
          2-Day Infection Values
        </Text>
        <ComposedChart
          width={654}
          height={320}
          data={graphData}
          margin={{ top: 0, right: 20, left: -30, bottom: 5 }}
        >
          <XAxis dataKey="dates" name="ciccio" tick={<CustomLabel />} />
          <YAxis dataKey="a2Day" name="bello" />
          <Tooltip content={renderTooltip} offset={20} />
          <Legend
            wrapperStyle={{ paddingTop: "30px" }}
            verticalAlign="bottom"
            iconSize={16}
            iconType="rect"
            payload={[
              { value: "Unfavorable", type: "rect", color: "#A3FDA1" },
              { value: "Marginal", type: "rect", color: "#FDFAB0" },
              { value: "Favorable", type: "rect", color: "#FFA0A0" }
            ]}
          />
          <Rectangle x={20} y={30} width={50} height={50} fill="red" />
          <Area
            activeDot={false}
            name="Favorable"
            type="monotone"
            stackId="1"
            dataKey="favorable"
            stroke="#FFA0A0"
            fill="#FFA0A0"
          />
          <Area
            activeDot={false}
            name="Marginal"
            type="monotone"
            stackId="2"
            dataKey="marginal"
            stroke="#FDFAB0"
            fill="#FDFAB0"
          />
          <Area
            activeDot={false}
            name="Unfavorable"
            type="monotone"
            stackId="3"
            dataKey="unfavorable"
            stroke="#A3FDA1"
            fill="#A3FDA1"
          />
          <Bar
            name="2-Day"
            dataKey="a2Day"
            shape={<CustomBar />}
            fill={barColor}
          />

        </ComposedChart>
      </div>
    );
  }
}
