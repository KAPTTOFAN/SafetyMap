import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import VisualGeoJsonLayer from "./VisualGeoJsonLayer";
import InteractiveGeoJsonLayer from "./InteractiveGeoJsonLayer";

// Компонент для создания кастомной панели с эффектами
const BlurredPane = () => {
  const map = useMap();
  useEffect(() => {
    // Создаем новую панель для размытого слоя
    map.createPane('blurredPane');
    const pane = map.getPane('blurredPane');
    
    // Применяем CSS фильтры для эффекта размытия и насыщенности
    pane.style.filter = 'blur(25px) saturate(1.1)'; // Немного уменьшим насыщенность
    // Важно, чтобы панель не блокировала карту
    pane.style.pointerEvents = 'none';

  }, [map]);
  return null;
};

export default function Map({ city, districts, selectedDistrict, onDistrictSelect }) {
  return (
    <MapContainer
      center={[city.latitude, city.longitude]}
      zoom={13}
      style={{ height: "100%", width: "100%", backgroundColor: '#f0f4f8' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <BlurredPane />
      
      {/* Visual Layer for blurred colors */}
      {districts && <VisualGeoJsonLayer data={districts} pane="blurredPane" />}

      {/* Interactive Layer for clicks and highlighting */}
      {districts && (
        <InteractiveGeoJsonLayer 
          data={districts} 
          selectedDistrict={selectedDistrict}
          onDistrictSelect={onDistrictSelect}
        />
      )}
    </MapContainer>
  );
}
