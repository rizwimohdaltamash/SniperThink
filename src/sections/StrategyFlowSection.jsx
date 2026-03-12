import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { strategySteps } from "../data/strategySteps.jsx";
import LeadForm from "../components/LeadForm";

/* ───────────────── Step Card ───────────────── */
const StepCard = ({ step, index, onInterestClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex items-center gap-6 md:gap-12 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col`}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -60 : 60 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        whileHover={{ y: -6, scale: 1.02 }}
        className="glass-card bg-white p-6 md:p-8 flex-1 group cursor-pointer relative overflow-hidden shadow-xl shadow-brand-900/5 hover:shadow-2xl hover:shadow-brand-900/10 transition-shadow duration-500"
      >
        {/* Glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{
            boxShadow: `inset 0 0 60px ${step.color.glow}, 0 0 40px ${step.color.glow}`,
          }}
        />

        <div className="relative z-10">
          {/* Icon + Step Number */}
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`w-14 h-14 rounded-xl ${step.color.bg} ${step.color.border} border flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 ${step.color.text}`}
            >
              {step.icon}
            </div>
            <div>
              <span className={`text-xs font-semibold uppercase tracking-widest ${step.color.text}`}>
                Step {step.id}
              </span>
              <h3 className="text-xl font-bold text-slate-800">{step.title}</h3>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            {step.description}
          </p>

          {/* Progress bar */}
          <motion.div
            className="mt-6 h-1 rounded-full bg-slate-200 overflow-hidden mb-6"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className={`h-full rounded-full bg-gradient-to-r ${step.color.gradient}`}
            />
          </motion.div>

          {/* Interaction Button */}
          <button
            onClick={() => onInterestClick(step.title)}
            className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-300 ${step.color.text} border-${step.color.text.split('-')[1]}-500/30 hover:bg-${step.color.text.split('-')[1]}-500/10 hover:border-${step.color.text.split('-')[1]}-500 focus:outline-none focus:ring-2 focus:ring-${step.color.text.split('-')[1]}-500/50`}
          >
            I'm Interested
          </button>
        </div>
      </motion.div>

      {/* Center Timeline Node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
        className="hidden md:flex flex-shrink-0 w-16 h-16 items-center justify-center relative"
      >
        {/* Outer ring */}
        <div
          className={`absolute inset-0 rounded-full ${step.color.bg} ${step.color.border} border animate-pulse-glow`}
        />
        {/* Inner circle */}
        <div
          className={`w-10 h-10 rounded-full bg-gradient-to-br ${step.color.gradient} flex items-center justify-center shadow-lg z-10`}
          style={{ boxShadow: `0 0 30px ${step.color.glow.replace('0.4', '0.2')}` }}
        >
          <span className="text-white font-bold text-sm">{step.id}</span>
        </div>
      </motion.div>

      {/* Empty space for zigzag layout */}
      <div className="hidden md:block flex-1" />
    </div>
  );
};

/* ───────────────── Main Section ───────────────── */
const StrategyFlowSection = () => {
  const [activeStep, setActiveStep] = useState(null);
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Timeline fill progress — maps the section scroll to 0-100% height
  const timelineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section
      id="strategy"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Richer Background — subtle gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-brand-50/30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-100/20 rounded-full blur-3xl pointer-events-none" />

      {/* Parallax Background Glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-600/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            The SniperThink{" "}
            <span className="gradient-text">Strategy Flow</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">
            Five precision-engineered stages that transform raw data into
            decisive strategic action.
          </p>
        </motion.div>

        {/* Strategy Flow Timeline with scroll-linked vertical line */}
        <div className="relative" ref={timelineRef}>
          {/* ── Vertical Timeline Track (background) ── */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-slate-200/60 rounded-full" />

          {/* ── Vertical Timeline Fill (scroll-linked) ── */}
          <motion.div
            style={{ height: timelineHeight }}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-0.5 bg-gradient-to-b from-brand-500 via-emerald-500 to-teal-500 rounded-full origin-top shadow-sm shadow-brand-500/30"
          />

          {/* Step Cards */}
          <div className="space-y-12 md:space-y-16 relative z-10">
            {strategySteps.map((step, index) => (
              <StepCard 
                key={step.id}
                step={step} 
                index={index} 
                onInterestClick={(title) => setActiveStep(title)}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mt-20"
        >
          <div className="glass-card inline-flex items-center gap-4 px-8 py-5">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse-glow" />
            <span className="text-slate-700 font-medium">
              Ready to transform your strategy?
            </span>
            <button className="btn-primary text-sm !px-6 !py-2">
              Get Started →
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal Overlay for LeadForm */}
      <AnimatePresence>
        {activeStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveStep(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm"
            >
              <button
                onClick={() => setActiveStep(null)}
                className="absolute -top-4 -right-4 w-8 h-8 bg-slate-800 text-slate-400 hover:text-white rounded-full flex items-center justify-center transition shadow-lg z-10"
              >
                ✕
              </button>
              <LeadForm 
                selectedStep={activeStep} 
                onClose={() => setActiveStep(null)} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default StrategyFlowSection;
