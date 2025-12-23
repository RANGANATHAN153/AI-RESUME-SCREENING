
import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis, Legend 
} from 'recharts';
import { Candidate } from '../types';

interface DashboardProps {
  candidates: Candidate[];
}

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const Dashboard: React.FC<DashboardProps> = ({ candidates }) => {
  const roleDistribution = useMemo(() => {
    const roles: Record<string, number> = {};
    candidates.forEach(c => {
      roles[c.JobRole] = (roles[c.JobRole] || 0) + 1;
    });
    return Object.entries(roles).map(([name, value]) => ({ name, value }));
  }, [candidates]);

  const educationStats = useMemo(() => {
    const edu: Record<string, number> = {};
    candidates.forEach(c => {
      edu[c.Education] = (edu[c.Education] || 0) + 1;
    });
    return Object.entries(edu).map(([name, value]) => ({ name, value }));
  }, [candidates]);

  const expVsScore = useMemo(() => {
    return candidates.map(c => ({
      exp: c.ExperienceYears,
      score: c.AIScore,
      name: c.Name
    }));
  }, [candidates]);

  const stats = useMemo(() => {
    const total = candidates.length;
    const hires = candidates.filter(c => c.RecruiterDecision === 'Hire').length;
    const avgScore = candidates.reduce((acc, curr) => acc + curr.AIScore, 0) / total;
    const avgSalary = candidates.reduce((acc, curr) => acc + curr.SalaryExpectation, 0) / total;
    
    return { total, hires, avgScore: avgScore.toFixed(1), avgSalary: Math.round(avgSalary).toLocaleString() };
  }, [candidates]);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Pool', value: stats.total, color: 'indigo' },
          { label: 'Hire Rate', value: `${Math.round((stats.hires / stats.total) * 100)}%`, color: 'emerald' },
          { label: 'Avg AI Score', value: stats.avgScore, color: 'amber' },
          { label: 'Avg Salary', value: `$${stats.avgSalary}`, color: 'violet' }
        ].map((s, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-transform hover:scale-[1.02]">
            <p className="text-slate-500 text-sm font-medium mb-1">{s.label}</p>
            <h3 className="text-3xl font-bold text-slate-800">{s.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Role Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Job Role Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roleDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#4f46e5" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Education Pie */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Education Breakdown</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={educationStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {educationStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Experience vs AI Score */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold mb-6">Correlation: Experience (Years) vs. AI Competency Score</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis type="number" dataKey="exp" name="Experience" unit="yrs" />
                <YAxis type="number" dataKey="score" name="AI Score" />
                <ZAxis type="number" range={[50, 400]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Candidates" data={expVsScore} fill="#4f46e5" opacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
