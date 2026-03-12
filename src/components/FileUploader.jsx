import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { uploadFile, getJobStatus } from "../services/api";
import { FiUploadCloud, FiFileText, FiCheckCircle } from "react-icons/fi";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle, uploading, processing, complete, error
  const [progress, setProgress] = useState(0);
  const [jobId, setJobId] = useState(null);
  const [result, setResult] = useState(null);
  const [errorMSG, setErrorMSG] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setStatus("idle");
      setProgress(0);
      setResult(null);
      setErrorMSG("");
    }
  };

  const pollJobStatus = async (id) => {
    try {
      const res = await getJobStatus(id);
      if (res.success) {
        const jobState = res.data.state;
        const jobProgress = res.data.progress || 0;
        
        setProgress(jobProgress);

        if (jobState === "completed") {
          setStatus("complete");
          setResult({
            wordCount: res.data.wordCount || 0,
            paragraphCount: res.data.paragraphCount || 0,
            topKeywords: res.data.topKeywords || [],
          });
        } else if (jobState === "failed") {
          setStatus("error");
          setErrorMSG(res.data.failedReason || "Processing failed in background.");
        } else {
          // Still waiting or active
          setTimeout(() => pollJobStatus(id), 2000);
        }
      }
    } catch (error) {
      console.error("Polling error", error);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    setProgress(10);
    setErrorMSG("");

    try {
      const res = await uploadFile(file);
      if (res.success) {
        setStatus("processing");
        setJobId(res.data.jobId);
        pollJobStatus(res.data.jobId);
      } else {
        throw new Error(res.error || "Upload failed");
      }
    } catch (err) {
      setStatus("error");
      setErrorMSG(err.response?.data?.error || err.message || "An error occurred");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-10 glass-card bg-white border border-slate-100 shadow-2xl shadow-brand-900/5 hover:shadow-brand-900/10 transition-shadow duration-500">
      <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
        Data Integration Hub
      </h3>

      {/* Upload Area */}
      <div 
        onClick={() => status === "idle" && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300
          ${file ? "border-brand-500/50 bg-brand-500/5" : "border-brand-500/30 hover:border-brand-500/50 hover:bg-brand-50/30 cursor-pointer"}`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden"
          accept=".pdf,.txt,.csv,.json"
          disabled={status !== "idle"}
        />

        {file ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center">
              <FiFileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-800 font-medium">{file.name}</p>
              <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            {status === "idle" && (
              <button 
                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                className="text-xs text-red-500 hover:text-red-600 mt-2 font-medium"
              >
                Remove
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center mb-2 shadow-sm">
              <FiUploadCloud className="w-6 h-6" />
            </div>
            <p className="text-gray-300">Click to browse or drag and drop</p>
            <p className="text-xs text-gray-500">Supports PDF, TXT, CSV, JSON up to 10MB</p>
          </div>
        )}
      </div>

      {/* Action Button */}
      {file && status === "idle" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex justify-center">
          <button onClick={handleUpload} className="btn-primary w-full max-w-xs">
            Upload & Process Data
          </button>
        </motion.div>
      )}

      {/* Progress tracking */}
      {status !== "idle" && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-500 font-medium">
              {status === "uploading" && "Uploading securely..."}
              {status === "processing" && "AI Processing data..."}
              {status === "complete" && "Processing Complete!"}
              {status === "error" && <span className="text-red-500">Error Occurred</span>}
            </span>
            <span className="text-brand-600 font-bold">{progress}%</span>
          </div>
          
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <motion.div 
              className={`h-full ${status === "error" ? "bg-red-500" : "bg-gradient-to-r from-brand-600 to-brand-400"}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {status === "error" && (
            <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {errorMSG}
            </div>
          )}
        </motion.div>
      )}

      {/* Results */}
      {status === "complete" && result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-left">
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
            <h4 className="text-sm font-semibold text-brand-600 mb-4 uppercase tracking-wider flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Extraction Analytics
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-center shadow-sm">
                <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-medium">Word Count</p>
                <p className="text-2xl text-slate-800 font-bold">{result.wordCount.toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-center shadow-sm">
                <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-medium">Paragraphs</p>
                <p className="text-2xl text-slate-800 font-bold">{result.paragraphCount.toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-center col-span-2 md:col-span-1 shadow-sm">
                <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-medium">Keywords</p>
                <p className="text-2xl text-brand-600 font-bold">{result.topKeywords.length}</p>
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-600 mb-3 uppercase tracking-wider font-semibold">Most Frequent Subjects</p>
              <div className="flex flex-wrap gap-2">
                {result.topKeywords.length > 0 ? (
                  result.topKeywords.map((word, i) => (
                    <span key={i} className="px-3 py-1 bg-brand-50 text-brand-700 border border-brand-200 rounded-full text-sm font-medium shadow-sm">
                      {word}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">No significant keywords identified.</span>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => {
                  setFile(null);
                  setStatus("idle");
                }}
                className="text-sm text-brand-600 hover:text-brand-700 transition-colors font-semibold flex items-center gap-2"
              >
                Upload Another Document →
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FileUploader;
