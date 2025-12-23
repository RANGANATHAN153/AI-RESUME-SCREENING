
import React, { useState } from 'react';
import { predictDecision } from '../services/geminiService';
import { Target, Info, Sparkles, Send } from 'lucide-react';

const Predictor: React.FC = () => {
  const [formData, setFormData] = useState({
    JobRole: 'Data Scientist',
    Skills: '',
    ExperienceYears: 5,
    Education: 'B.Sc',
    ProjectsCount: 5,
    SalaryExpectation: 80000
  });

  const [result, setResult] = useState<{ decision: string; confidence: number; reasoning: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await predictDecision(formData);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
            <Target size={24} />
          </div>
          <h2 className="text-2xl font-bold">Predictive Hiring Model</h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Target Job Role</label>
            <select 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.JobRole}
              onChange={(e) => setFormData({...formData, JobRole: e.target.value})}
            >
              <option>Data Scientist</option>
              <option>AI Researcher</option>
              <option>Software Engineer</option>
              <option>Cybersecurity Analyst</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Technical Skills (Comma Separated)</label>
            <input 
              type="text"
              placeholder="e.g. Python, PyTorch, React"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.Skills}
              onChange={(e) => setFormData({...formData, Skills: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Experience Years</label>
            <input 
              type="number"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.ExperienceYears}
              onChange={(e) => setFormData({...formData, ExperienceYears: parseInt(e.target.value)})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Education Level</label>
            <select 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.Education}
              onChange={(e) => setFormData({...formData, Education: e.target.value})}
            >
              <option>B.Sc</option>
              <option>B.Tech</option>
              <option>M.Tech</option>
              <option>MBA</option>
              <option>PhD</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Projects Completed</label>
            <input 
              type="number"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.ProjectsCount}
              onChange={(e) => setFormData({...formData, ProjectsCount: parseInt(e.target.value)})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Salary Expectation ($)</label>
            <input 
              type="number"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.SalaryExpectation}
              onChange={(e) => setFormData({...formData, SalaryExpectation: parseInt(e.target.value)})}
            />
          </div>

          <div className="md:col-span-2 pt-4">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send size={20} />}
              Generate AI Decision Prediction
            </button>
          </div>
        </form>
      </div>

      {result && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
               <span className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-2">Verdict</span>
               <div className={`text-4xl font-black mb-4 ${result.decision === 'Hire' ? 'text-green-600' : 'text-red-600'}`}>
                 {result.decision}
               </div>
               <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                 <div 
                   className="bg-indigo-600 h-full transition-all duration-1000" 
                   style={{ width: `${result.confidence * 100}%` }}
                 />
               </div>
               <span className="text-slate-400 text-xs mt-2 font-medium">Confidence Score: {Math.round(result.confidence * 100)}%</span>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 font-bold">
                <Sparkles size={20} />
                <span>AI Reasoning Breakdown</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {result.reasoning}
              </p>
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3">
                <Info size={18} className="text-amber-600 shrink-0" />
                <p className="text-xs text-amber-800 italic">
                  Note: This prediction is based on high-performance dataset analysis and should complement, not replace, human interview assessment.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Predictor;
