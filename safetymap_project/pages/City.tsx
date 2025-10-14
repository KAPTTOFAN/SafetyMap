
import React, { useState, useEffect, useCallback } from "react";
import { City } from "@/entities/City";
import { District } from "@/entities/District";
import { SafetyReport } from "@/entities/SafetyReport";
import { Button } from "@/components/ui/button";
import { MapPin, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";

import SafetyFilters from "../components/city/SafetyFilters";
import ReportForm from "../components/city/ReportForm";
import Map from "../components/city/Map";

// --- Логика генерации цвета ---
const colorCache = {};
const localStorageKey = 'districtColorCache';

// Загрузка кэша из localStorage при первоначальной загрузке
try {
  const cachedColors = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
  Object.assign(colorCache, cachedColors);
} catch (e) {
  console.error("Не удалось загрузить кэш цветов из localStorage", e);
}

const saveCache = () => {
  try {
    localStorage.setItem(localStorageKey, JSON.stringify(colorCache));
  } catch (e) {
    console.error("Не удалось сохранить кэш цветов в localStorage", e);
  }
};

const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Преобразование в 32-битное целое число
  }
  return Math.abs(hash);
};

const getDeterministicColor = (id) => {
  if (colorCache[id]) {
    return colorCache[id];
  }

  const hash = simpleHash(id.toString());
  
  // Четкая палитра оттенков: Красный, Оранжевый, Желтый, Зеленый
  const hues = [0, 30, 55, 120];
  
  // Выбираем базовый оттенок
  const baseHue = hues[hash % hues.length];
  
  // Добавляем небольшую вариацию для разнообразия
  const hue = baseHue + (hash % 10) - 5;

  const saturation = 75 + (hash % 20); // Насыщенные, сочные цвета
  const lightness = 65 + (hash % 10); // Светлые, пастельные тона
  
  const color = `hsl(${hue < 0 ? hue + 360 : hue}, ${saturation}%, ${lightness}%)`;
  colorCache[id] = color;
  saveCache();
  
  return color;
};
// --- Конец логики генерации цвета ---

export default function CityPage() {
  const [city, setCity] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null); // State for selected district
  const [filters, setFilters] = useState({
    timeOfDay: "all",
    locationType: "all",
  });
  const [showReportForm, setShowReportForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadCityData = useCallback(async () => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const cityName = urlParams.get("city");
    
    if (cityName) {
      const cities = await City.filter({ name: cityName });
      if (cities.length > 0) {
        setCity(cities[0]);
        
        const cityDistricts = await District.filter({ city_name: cityName });
        
        const districtsWithColors = {
          type: "FeatureCollection",
          features: cityDistricts.map(district => ({
            type: "Feature",
            properties: {
              ...district,
              color: getDeterministicColor(district.id)
            },
            geometry: district.geometry
          }))
        };
        
        setDistricts(districtsWithColors);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCityData();
  }, [loadCityData]);


  const handleReportSubmit = async (reportData) => {
    await SafetyReport.create({ ...reportData, city_name: city.name });
    setShowReportForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка данных о городе...</p>
        </div>
      </div>
    );
  }

  if (!city) {
    return <div className="p-8 text-center text-red-500">Не удалось найти данные для этого города.</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{city.name}</h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{city.country}</span>
                  {city.population && <span>{(city.population / 1000000).toFixed(1)}M человек</span>}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6 border border-gray-100">
                  <div className="text-sm text-gray-600 mb-1">Общий балл безопасности</div>
                  <div className="text-4xl font-bold text-gray-900">{city.overall_safety_score}<span className="text-2xl text-gray-400">/100</span></div>
                </div>
                <Button onClick={() => setShowReportForm(true)} className="bg-blue-600 hover:bg-blue-700 h-auto py-4">
                  <MessageSquare className="w-5 h-5 mr-2" /> Сообщить о впечатлениях
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-full relative">
        <div className="absolute top-4 left-4 z-[1000] w-full max-w-sm">
           <SafetyFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className="h-[calc(100vh-200px)]">
          <Map 
            city={city} 
            districts={districts}
            selectedDistrict={selectedDistrict}
            onDistrictSelect={setSelectedDistrict}
          />
        </div>

        {showReportForm && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-[1001] flex items-center justify-center">
             <ReportForm
              cityName={city.name}
              onSubmit={handleReportSubmit}
              onCancel={() => setShowReportForm(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
