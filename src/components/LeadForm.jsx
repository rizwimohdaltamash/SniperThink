import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitInterest } from "../services/api";
import { FiCheckCircle } from "react-icons/fi";

const LeadForm = ({ selectedStep = "General Inquiry", onClose }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      await submitInterest(formData.name, formData.email, selectedStep);
      setStatus("success");
      // Auto-close after 3 seconds on success
      if (onClose) {
        setTimeout(() => onClose(), 3000);
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err.response?.data?.error || "Submission failed. Please try again."
      );
    }
  };

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-2xl w-full max-w-sm relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-6 text-center"
          >
            <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-4">
              <FiCheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Request Received!</h3>
            <p className="text-slate-600 text-sm">
              We'll be in touch with {formData.name} regarding the{" "}
              <span className="text-brand-600 font-medium">{selectedStep}</span>.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-slate-800 mb-1">I'm Interested</h3>
            <p className="text-xs text-slate-600 mb-4 bg-slate-50 border border-slate-100 py-1 px-2 rounded-md inline-block">
              Focus: <span className="text-brand-600 font-medium">{selectedStep}</span>
            </p>

            {status === "error" && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 rounded-lg">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={status === "loading"}
                className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-lg text-sm text-slate-800 px-3 py-2 outline-none transition disabled:opacity-50"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={status === "loading"}
                className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-lg text-sm text-slate-800 px-3 py-2 outline-none transition disabled:opacity-50"
                placeholder="john@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-medium py-2 rounded-lg text-sm shadow-md transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Submit Request</span>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeadForm;
