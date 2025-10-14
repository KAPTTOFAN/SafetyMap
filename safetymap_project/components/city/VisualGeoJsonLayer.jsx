import React, { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

// This component is purely for the visual blurred effect
export default function VisualGeoJsonLayer({ data, pane }) {
  const map = useMap();
  const geoJsonLayerRef = useRef(null);

  const style = (feature) => {
    return {
      fillColor: feature.properties.color,
      weight: 0,
      fillOpacity: 0.35,
    };
  };

  useEffect(() => {
    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.remove();
    }

    if (data && data.features && data.features.length > 0) {
      geoJsonLayerRef.current = L.geoJSON(data, { 
        style: style,
        pane: pane
      });
      
      geoJsonLayerRef.current.addTo(map);
    }
  }, [data, map, pane]);

  return null;
}
