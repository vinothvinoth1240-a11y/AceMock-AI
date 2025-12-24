
import React, { useState } from 'react';
import { InterviewQuestion } from '../types';

interface QuestionCardProps {
  question: InterviewQuestion;
  index: number;
  rating?: number;
  onRate: (rating: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, index, rating, onRate }) => {
  const [expanded, setExpanded] = useState(false);

  const getDifficultyColor = (diff: string) => {
    switch(diff) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className={`bg-white rounded-3xl border ${rating ? 'border-indigo-100 ring-1 ring-indigo-50 shadow-md shadow-indigo-100/20' : 'border-slate-200 shadow-sm'} overflow-hidden transition-all duration-300`}>
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold">{index}</span>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-indigo-100 bg-indigo-50 text-indigo-600">
              {question.category}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => onRate(star)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
                  (rating || 0) >= star 
                    ? 'bg-amber-400 text-white shadow-sm' 
                    : 'bg-slate-50 text-slate-300 hover:bg-slate-100'
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 leading-tight mb-6">
          {question.question}
        </h3>

        <div className="flex justify-between items-center">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-indigo-600 hover:text-indigo-700 font-bold text-sm flex items-center group transition-colors"
          >
            {expanded ? 'Hide Evaluation Metrics' : 'Show Evaluation Metrics'}
            <svg 
              className={`ml-1 w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {rating && (
            <span className="text-xs font-bold text-green-600 flex items-center animate-in zoom-in">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Rated
            </span>
          )}
        </div>

        {expanded && (
          <div className="mt-8 space-y-6 animate-in slide-in-from-top-4 duration-300 border-t border-slate-50 pt-6">
            <div>
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">Expected Key Points</h4>
              <ul className="space-y-2">
                {question.expectedKeyPoints.map((point, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 mr-3 shrink-0"></span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest mb-3">Sample Ideal Answer</h4>
              <p className="text-sm text-slate-700 leading-relaxed italic">
                "{question.sampleAnswer}"
              </p>
            </div>
            
            <div className="flex items-center p-3 bg-indigo-50 rounded-xl text-indigo-700 text-xs font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Self-Rating Scale: 1 (Needs Work) to 5 (Expert Performance)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
