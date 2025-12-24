import React, { useState } from 'react';
import { InterviewData, UserProfile, InterviewQuestion } from '../types';
import { QuestionCard } from './QuestionCard';
import { FeedbackSummary } from './FeedbackSummary';

interface InterviewDashboardProps {
  data: InterviewData;
  profile: UserProfile;
  onRestart: () => void;
}

export const InterviewDashboard: React.FC<InterviewDashboardProps> = ({ data, profile, onRestart }) => {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [showSummary, setShowSummary] = useState(false);

  const handleRate = (id: string, rating: number) => {
    setRatings(prev => ({ ...prev, [id]: rating }));
  };

  const completedCount = Object.keys(ratings).length;
  const progressPercent = (completedCount / data.questions.length) * 100;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">{profile.jobRole} Evaluation</h2>
          <p className="text-slate-500 mt-1">Generated Assessment Kit for {profile.experienceLevel} Level</p>
        </div>
        <div className="w-full md:w-64 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Evaluation Progress</span>
            <span className="text-xs font-bold text-indigo-600">{completedCount}/{data.questions.length}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {data.questions.map((q, idx) => (
            <QuestionCard 
              key={q.id} 
              question={q} 
              index={idx + 1} 
              rating={ratings[q.id]}
              onRate={(rating) => handleRate(q.id, rating)}
            />
          ))}
          
          <div className="bg-indigo-50 border-2 border-indigo-100 p-8 rounded-3xl flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Ready for your assessment?</h3>
            <p className="text-slate-600 mb-6 max-w-md">Once you've self-evaluated all questions, generate your final performance summary and readiness report.</p>
            <button 
              disabled={completedCount === 0}
              onClick={() => setShowSummary(true)}
              className={`px-8 py-3 rounded-xl font-bold transition-all shadow-md ${
                completedCount > 0 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Finish & View Analysis
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <span className="mr-2">📋</span> Assessment Insights
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-tight">Focus Categories</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Array.from(new Set(data.questions.map(q => q.category))).map(cat => (
                    <span key={cat} className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 shadow-sm">{cat}</span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-tight">Difficulty Matrix</span>
                <div className="flex space-x-4 mt-2">
                  <div className="flex flex-col items-center">
                    <span className="text-green-600 font-bold text-lg">{data.questions.filter(q => q.difficulty === 'Easy').length}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Easy</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-amber-600 font-bold text-lg">{data.questions.filter(q => q.difficulty === 'Medium' || q.difficulty === 'Mixed').length}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Med</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-red-600 font-bold text-lg">{data.questions.filter(q => q.difficulty === 'Hard').length}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Hard</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button 
                  onClick={onRestart}
                  className="w-full text-slate-400 hover:text-red-500 text-sm font-medium transition-colors py-2"
                >
                  Discard and Restart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSummary && (
        <FeedbackSummary 
          summary={data.summary} 
          onClose={() => setShowSummary(false)} 
          // Fix: Explicitly type reduce parameters to resolve "unknown" arithmetic operation errors
          averageRating={Object.values(ratings).reduce((a: number, b: number) => a + b, 0) / completedCount || 0}
        />
      )}
    </div>
  );
};