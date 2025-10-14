import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function SafetyFilters({ filters, setFilters }) {
  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-gray-100">
      <CardContent className="p-2 sm:p-4">
        <div className="flex flex-row gap-2 sm:gap-4">
          <div className="flex-1">
            <label className="text-xs font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              <span className="hidden sm:inline">Time of Day</span>
            </label>
            <Select
              value={filters.timeOfDay}
              onValueChange={(value) => setFilters({ ...filters, timeOfDay: value })}
            >
              <SelectTrigger className="text-sm h-9">
                <SelectValue placeholder="Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All times</SelectItem>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="afternoon">Afternoon</SelectItem>
                <SelectItem value="evening">Evening</SelectItem>
                <SelectItem value="night">Night</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="text-xs font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              <span className="hidden sm:inline">Location Type</span>
            </label>
            <Select
              value={filters.locationType}
              onValueChange={(value) => setFilters({ ...filters, locationType: value })}
            >
              <SelectTrigger className="text-sm h-9">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>
                <SelectItem value="street">Street</SelectItem>
                <SelectItem value="park">Park</SelectItem>
                <SelectItem value="metro">Metro/Transit</SelectItem>
                <SelectItem value="bar">Bars/Nightlife</SelectItem>
 
