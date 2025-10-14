import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MessageSquare, X } from "lucide-react";
import { motion } from "framer-motion";

export default function ReportForm({ cityName, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    district: "",
    latitude: 0,
    longitude: 0,
    safety_score: 75,
    time_of_day: "afternoon",
    location_type: "street",
    user_review: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Report Your Experience
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="district">District/Neighborhood</Label>
              <Input
                id="district"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                placeholder="e.g. City Center"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="0.000001"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="0.000001"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="safety_score">Safety Score (0-100)</Label>
              <Input
                id="safety_score"
                type="number"
                min="0"
                max="100"
                value={formData.safety_score}
                onChange={(e) => setFormData({ ...formData, safety_score: parseInt(e.target.value) })}
                required
              />
            </div>

            <div>
              <Label htmlFor="time_of_day">Time of Day</Label>
              <Select
                value={formData.time_of_day}
                onValueChange={(value) => setFormData({ ...formData, time_of_day: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="night">Night</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location_type">Location Type</Label>
              <Select
                value={formData.location_type}
                onValueChange={(value) => setFormData({ ...formData, location_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="street">Street</SelectItem>
                  <SelectItem value="park">Park</SelectItem>
                  <SelectItem value="metro">Metro/Transit</SelectItem>
                  <SelectItem value="bar">Bars/Nightlife</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="tourist">Tourist Areas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="review">Your Experience</Label>
              <Textarea
                id="review"
                value={formData.user_review}
                onChange={(e) => setFormData({ ...formData, user_review: e.target.value })}
                placeholder="Share your safety experience in this area..."
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Submit Report
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
