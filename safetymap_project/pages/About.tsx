import React from "react";
import { motion } from "framer-motion";
import { Shield, Users, Database, TrendingUp, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const features = [
    {
      icon: Database,
      title: "Multiple Data Sources",
      description: "We aggregate data from official crime statistics, user surveys, and local community reviews to provide comprehensive safety insights."
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Real people sharing real experiences. Our platform is powered by travelers, residents, and local experts who contribute their safety observations."
    },
    {
      icon: TrendingUp,
      title: "Real-Time Updates",
      description: "Safety conditions change. Our platform continuously updates with new reports and data to keep you informed about current conditions."
    },
    {
      icon: Shield,
      title: "Transparent Methodology",
      description: "We believe in transparency. Our safety scores are calculated using clear, documented methodologies that anyone can understand."
    }
  ];

  const values = [
    "Transparency in data collection and scoring",
    "Community empowerment through shared knowledge",
    "Privacy protection for all contributors",
    "Objective, unbiased safety assessments",
    "Continuous improvement based on feedback"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/30">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About SafetyMap</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're building a safer world by making safety information accessible, transparent, and actionable for everyone.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            SafetyMap exists to empower people with the information they need to make informed decisions about their safety. Whether you're planning a trip, looking for a new place to live, or considering a business investment, understanding local safety conditions is crucial.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We combine official crime statistics, community reports, and advanced data analysis to create comprehensive safety maps of European cities. Our goal is to make this critical information accessible to everyone, free of charge.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-gray-100"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
          <div className="space-y-4">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-lg text-gray-700">{value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Sources</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Our safety scores are calculated using a combination of:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Official crime statistics from local police departments and government agencies</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Community-submitted safety reports and experiences</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Analysis of local news and incident reports</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Surveys from residents, travelers, and local businesses</span>
            </li>
          </ul>
          <p className="text-sm text-gray-500 mt-6 italic">
            All data is anonymized and aggregated to protect individual privacy while providing meaningful insights.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
