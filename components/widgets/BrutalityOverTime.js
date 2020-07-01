import React, { useState } from "react";
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryBrushContainer,
  VictoryLine,
  VictoryAxis,
} from "victory";
import { COLORS } from "styles/constants";

function transformData(data) {
  return data.map(function (d) {
    return { x: new Date(d.month), y: d.count };
  });
}

const BrutalityOverTime = ({ data }) => {
  const [zoomDomain, setZoomDomain] = useState({
    x: [new Date("2019-09"), new Date("2019-12")],
  });

  return (
    <div>
      <VictoryChart
        width={500}
        height={470}
        scale={{ x: "time" }}
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={setZoomDomain}
          />
        }
      >
        <VictoryLine
          style={{
            data: { stroke: COLORS.accent },
          }}
          data={transformData(data)}
        />
        <VictoryAxis
          label="Span of Time"
          style={{
            axisLabel: {
              fontSize: 10,
              padding: 30,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          label="Number of Shootings"
          style={{
            axisLabel: {
              fontSize: 10,
              padding: 30,
            },
          }}
        />
      </VictoryChart>
      <VictoryChart
        padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
        width={500}
        height={150}
        scale={{ x: "time" }}
        containerComponent={
          <VictoryBrushContainer
            brushDimension="x"
            brushDomain={zoomDomain}
            onBrushDomainChange={setZoomDomain}
          />
        }
      >
        <VictoryAxis tickFormat={(x) => new Date(x).getFullYear()} />
        <VictoryLine
          style={{
            data: { stroke: COLORS.accent },
          }}
          data={transformData(data)}
        />
        <VictoryAxis
          dependentAxis
          label="# of Shootings"
          style={{
            axisLabel: {
              fontSize: 10,
              padding: 30,
            },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default BrutalityOverTime;
