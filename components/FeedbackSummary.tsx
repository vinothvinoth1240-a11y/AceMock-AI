
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface FeedbackSummaryProps {
  summary: {
    strengths: string[];
    improvementAreas: string[];
    readinessScore: number;
    overallFeedback: string;
  };
  averageRating: number;
  onClose: () => void;
}

export const FeedbackSummary: React.FC<FeedbackSummaryProps> = ({ summary, averageRating, onClose }) => {
  const chartData = [
    { name: 'Completed', value: averageRating * 20 },
    { name: 'Potential', value: 100 - (averageRating * 20) }
  ];
  
  const COLORS = ['#4f46e5', '#f1f5f9'];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 md:p-12 overflow-y-auto max-h-[90vh]">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Performance Dossier</h2>
              <p className="text-slate-500">AI-Generated Readiness Assessment</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-10">
            <div className="space-y-6">
              <div className="relative h-48 w-48 mx-auto md:mx-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-indigo-600 tracking-tighter">{(averageRating * 20).toFixed(0)}%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Readiness</span>
                </div>
              </div>
              
              <div className="text-center md:text-left">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Overall Synthesis</h4>
                <p className="text-slate-700 leading-relaxed italic">
                  "{summary.overallFeedback}"
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-green-50 rounded-[2rem] border border-green-100">
                <h4 className="text-xs font-extrabold text-green-600 uppercase tracking-widest mb-4">Core Strengths</h4>
                <ul className="space-y-3">
                  {summary.strengths.map((s, i) => (
                    <li key={i} className="flex items-center text-sm font-medium text-green-800">
                      <svg className="w-4 h-4 mr-2 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100">
                <h4 className="text-xs font-extrabold text-amber-600 uppercase tracking-widest mb-4">Improvement Areas</h4>
                <ul className="space-y-3">
                  {summary.improvementAreas.map((s, i) => (
                    <li key={i} className="flex items-center text-sm font-medium text-amber-800">
                      <svg className="w-4 h-4 mr-2 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onClose}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200"
            >
              Continue Practice
            </button>
            <button 
              onClick={() => window.print()}
              className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all"
            >
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
