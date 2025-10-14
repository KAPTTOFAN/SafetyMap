import React, { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function InteractiveGeoJsonLayer({ data, selectedDistrict, onDistrictSelect }) {
  const map = useMap();
  const layerRef = useRef(null);
  const featureMapRef = useRef(new Map()); // Для связи ID района с его слоем на карте

  const getSafetyColorClass = (score) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const defaultStyle = { weight: 0, fillOpacity: 0 };
  const highlightStyle = {
    weight: 3,
    color: '#3B82F6',
    dashArray: '4',
    fillOpacity: 0.1,
  };

  // Эффект для создания слоя (срабатывает один раз при загрузке данных)
  useEffect(() => {
    if (!data) return;

    // Очищаем предыдущий слой, если он был
    if (layerRef.current) {
      layerRef.current.remove();
      featureMapRef.current.clear();
    }

    layerRef.current = L.geoJSON(data, {
      style: defaultStyle, // Изначально все районы невидимы, но кликабельны
      onEachFeature: (feature, layer) => {
        featureMapRef.current.set(feature.properties.id, layer); // Сохраняем слой для будущего доступа

        const score = feature.properties.average_safety_score || 'N/A';
        const popupContent = `
          <div class="font-sans p-1">
            <h3 class="font-bold text-lg mb-1">${feature.properties.name}</h3>
            <div class="flex items-center gap-2">
              <span class="text-gray-600">Оценка безопасности:</span>
              <span class="font-bold text-xl ${getSafetyColorClass(score)}">${score}</span>
            </div>
          </div>`;
        layer.bindPopup(popupContent);

        layer.on('click', (e) => {
          L.DomEvent.stopPropagation(e);
          onDistrictSelect(feature.properties); // Обновляем состояние в родительском компоненте
        });
      },
    }).addTo(map);

  }, [data, map]);

  // Эффект для управления выделением (срабатывает при изменении selectedDistrict)
  useEffect(() => {
    if (!layerRef.current) return;

    // Сбрасываем стиль для всех слоев
    featureMapRef.current.forEach(layer => {
      layer.setStyle(defaultStyle);
    });

    // Если выбран район, применяем к нему стиль выделения и открываем плашку
    if (selectedDistrict) {
      const selectedLayer = featureMapRef.current.get(selectedDistrict.id);
      if (selectedLayer) {
        selectedLayer.setStyle(highlightStyle);
        if (!selectedLayer.isPopupOpen()) {
          selectedLayer.openPopup();
        }
      }
    }
  }, [selectedDistrict]);

  // Эффект для снятия выделения при клике на карту
  useEffect(() => {
    const onMapClick = () => {
      if (selectedDistrict) {
        onDistrictSelect(null);
      }
    };
    map.on('click', onMapClick);
    return () => map.off('click', onMapClick);
  }, [map, onDistrictSelect, selectedDistrict]);

  return null;
}
