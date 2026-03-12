import React from "react";
import { FiDatabase, FiBarChart2, FiBell, FiCpu, FiFileText } from "react-icons/fi";

export const strategySteps = [
  {
    id: 1,
    title: "Data Integration",
    description:
      "Seamlessly connect and unify data from multiple sources — CRMs, ERPs, cloud platforms, and custom APIs — into a single intelligent data layer.",
    icon: <FiDatabase />,
    color: {
      gradient: "from-brand-600 to-emerald-500",
      bg: "bg-brand-50",
      border: "border-brand-200",
      text: "text-brand-600",
      glow: "rgba(16, 185, 129, 0.4)",
    },
  },
  {
    id: 2,
    title: "KPI Monitoring",
    description:
      "Track mission-critical KPIs in real-time with dynamic dashboards. Get instant visibility into performance trends and operational health.",
    icon: <FiBarChart2 />,
    color: {
      gradient: "from-emerald-500 to-teal-400",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-600",
      glow: "rgba(20, 184, 166, 0.4)",
    },
  },
  {
    id: 3,
    title: "Smart Alerts",
    description:
      "AI-driven anomaly detection delivers instant alerts when metrics deviate from expected patterns — so you act before problems escalate.",
    icon: <FiBell />,
    color: {
      gradient: "from-teal-500 to-cyan-500",
      bg: "bg-teal-50",
      border: "border-teal-200",
      text: "text-teal-600",
      glow: "rgba(6, 182, 212, 0.4)",
    },
  },
  {
    id: 4,
    title: "AI Predictions",
    description:
      "Leverage advanced machine learning models to forecast trends, anticipate market shifts, and uncover hidden opportunities before competitors.",
    icon: <FiCpu />,
    color: {
      gradient: "from-cyan-500 to-blue-500",
      bg: "bg-cyan-50",
      border: "border-cyan-200",
      text: "text-cyan-600",
      glow: "rgba(59, 130, 246, 0.4)",
    },
  },
  {
    id: 5,
    title: "Strategic Reports",
    description:
      "Generate comprehensive, executive-ready reports with actionable insights — beautifully formatted and shareable across your organization.",
    icon: <FiFileText />,
    color: {
      gradient: "from-blue-600 to-brand-500",
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600",
      glow: "rgba(16, 185, 129, 0.4)",
    },
  },
];
