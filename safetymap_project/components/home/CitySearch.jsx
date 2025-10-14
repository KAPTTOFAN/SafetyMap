
import React, { useState, useEffect } from "react";
import { City } from "@/entities/City";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, TrendingUp, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { uniqBy } from "lodash";

export default function CitySearch() {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCities();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowDropdown(true);
    } else {
      setFilteredCities(cities.slice(0, 6));
      setShowDropdown(false);
    }
  }, [searchTerm, cities]);

  const loadCities = async () => {
    const data = await City.list("-overall_safety_score", 20);
    const uniqueCities = uniqBy(data, 'name'); // Удаляем дубликаты
    setCities(uniqueCities);
    setFilteredCities(uniqueCities.slice(0, 6));
  };

  const handleCitySelect = (city) => {
    navigate(createPageUrl("City") + `?city=${encodeURIComponent(city.name)}`);
  };

  const getSafetyColor = (score) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getSafetyBg = (score) => {
    if (score >= 80) return "bg-emerald-50";
    if (score >= 60) return "bg-yellow-50";
    return "bg-red-50";
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Explore City Safety
        </h2>

        {/* Search Bar */}
        <div className="relative mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for a city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              className="pl-12 pr-4 py-6 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-all shadow-lg"
            />
          </div>

          {/* Dropdown */}
          <AnimatePresence>
            {showDropdown && filteredCities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
              >
                {filteredCities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => handleCitySelect(city)}
                    className="w-full px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <MapPin className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">{city.name}</div>
                        <div className="text-sm text-gray-500">{city.country}</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSafetyBg(city.overall_safety_score)} ${getSafetyColor(city.overall_safety_score)}`}>
                      {city.overall_safety_score}/100
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Popular Cities Grid */}
        {!searchTerm && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Popular Cities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCities.map((city) => (
                <motion.button
                  key={city.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCitySelect(city)}
                  className="bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all text-left"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{city.name}</h4>
                      <p className="text-sm text-gray-500">{city.country}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-lg text-sm font-bold ${getSafetyBg(city.overall_safety_score)} ${getSafetyColor(city.overall_safety_score)}`}>
                      {city.overall_safety_score}
                    </div>
                  </div>
                  {city.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{city.description}</p>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
