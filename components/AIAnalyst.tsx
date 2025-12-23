
import React, { useState, useEffect } from 'react';
import { Candidate, AnalysisResponse } from '../types';
import { getGeminiAnalysis } from '../services/geminiService';
import { Brain, Sparkles, AlertCircle, CheckCircle2, ListFilter } from 'lucide-react';

interface AIAnalystProps {
  candidates: Candidate[];
}

const AIAnalyst: React.FC<AIAnalystProps> = ({ candidates }) => {
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getGeminiAnalysis(candidates);
      setAnalysis(result);
    } catch (err: any) {
      console.error(err);
      setError("Analysis failed. Please ensure your Gemini API key is active.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-2xl text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-300" />
            <h2 className="text-2xl font-bold">Real-time Data Science Engine</h2>
          </div>
          <p className="text-indigo-100 max-w-lg">
            Leveraging Gemini 3 to identify hidden patterns, evaluate technical debt in the candidate pool, 
            and recommend optimized hiring strategies based on the current data.
          </p>
        </div>
        <button 
          onClick={runAnalysis}
          disabled={loading}
          className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-50 transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-indigo-700 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Brain className="w-5 h-5" />
          )}
          Re-run Analysis
        </button>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          <div className="h-64 bg-slate-200 rounded-2xl"></div>
          <div className="h-64 bg-slate-200 rounded-2xl"></div>
          <div className="h-64 bg-slate-200 rounded-2xl"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-center gap-4 text-red-700">
          <AlertCircle size={24} />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Executive Summary */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="text-indigo-600" />
              Executive Summary
            </h3>
            <div className="text-slate-600 leading-relaxed text-lg">
              {analysis.summary}
            </div>
          </div>

          {/* Strategic Recommendations */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <ListFilter className="text-indigo-600" />
              Strategic Recommendations
            </h3>
            <ul className="space-y-4">
              {analysis.recommendations.map((rec, i) => (
                <li key={i} className="flex gap-3 text-slate-600">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Skill Hotspots */}
          <div className="lg:col-span-3 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
             <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Brain className="text-indigo-600" />
              Top Hiring Skill Hotspots
            </h3>
            <div className="flex flex-wrap gap-3">
              {analysis.topSkills.map((skill, i) => (
                <span key={i} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAnalyst;
