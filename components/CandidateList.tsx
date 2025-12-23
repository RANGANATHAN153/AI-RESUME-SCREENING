
import React, { useState, useMemo } from 'react';
import { Candidate } from '../types';
import { Search, Filter, ArrowUpRight } from 'lucide-react';

interface CandidateListProps {
  candidates: Candidate[];
}

const CandidateList: React.FC<CandidateListProps> = ({ candidates }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      const matchesSearch = c.Name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           c.Skills.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'All' || c.JobRole === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [candidates, searchTerm, roleFilter]);

  const roles = ['All', ...Array.from(new Set(candidates.map(c => c.JobRole)))];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search by name or skill..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="text-slate-400" size={18} />
          <select
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Candidate</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Job Role</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">AI Score</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Exp.</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCandidates.map((c) => (
              <tr key={c.Resume_ID} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-800">{c.Name}</div>
                  <div className="text-xs text-slate-500 line-clamp-1">{c.Skills}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{c.JobRole}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className={`text-sm font-bold ${c.AIScore > 80 ? 'text-green-600' : c.AIScore > 50 ? 'text-amber-600' : 'text-red-600'}`}>
                    {c.AIScore}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {c.ExperienceYears} yrs
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    c.RecruiterDecision === 'Hire' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {c.RecruiterDecision}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-indigo-600 hover:text-indigo-800 p-2 hover:bg-indigo-50 rounded-lg transition-all">
                    <ArrowUpRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredCandidates.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-slate-400">No candidates found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default CandidateList;
