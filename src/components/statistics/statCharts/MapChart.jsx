import React from 'react';
import { ComposableMap, Geographies, Geography, Annotation } from 'react-simple-maps';
import { scaleQuantize } from 'd3-scale';
import * as d3 from 'd3';
import geoJson from './regions-version-simplifiee.geojson';

const colorScale = scaleQuantize()
  .domain([0, 100])
  .range(['#91BFA8','#17A25C', "#117543", "#0C5430", "#404040", "#D4D2D2", "#ZEFZEF"]); 

const path = d3.geoPath();

const MapChart = ({votesData}) => {
  return (
    <ComposableMap projection="geoMercator" projectionConfig={{ rotate: [-5, -46.3, 0], scale: 3500 }}>
      <Geographies geography={geoJson}>
        {({ geographies }) =>
          geographies.map(geo => {
            const regionData = votesData.find(d => d.label === geo.properties.nom);
            const value = regionData ? regionData.value : 0;
            const centroid = path.centroid(geo);
            return (
              <g key={geo.rsmKey}>
                <Geography
                  geography={geo}
                  fill={colorScale(value)}
                  stroke="#000"
                  strokeWidth={0.5}
                />
                {regionData && (
                  <Annotation
                    subject={centroid}
                    dx={20}
                    dy={0}
                    connectorProps={{
                      stroke: "#fff",
                      strokeWidth: 0,
                      strokeLinecap: "round"
                    }}
                  >
                    <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#FFF">
                      {`${value}%`}
                    </text>
                  </Annotation>
                )}
              </g>
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;
