
import React, { useState } from 'react';
import { UserProfile, ExperienceLevel, Difficulty } from '../types';

interface OnboardingProps {
  onSubmit: (profile: UserProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onSubmit }) => {
  const [jobRole, setJobRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(ExperienceLevel.STUDENT);
  const [skills, setSkills] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MIXED);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobRole || !skills) return;
    
    onSubmit({
      jobRole,
      experienceLevel,
      skills: skills.split(',').map(s => s.trim()),
      preferredDifficulty: difficulty
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
      <div className="p-8 md:p-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Master Your Next Interview</h1>
          <p className="text-slate-500">Configure your professional profile to generate a high-fidelity evaluation dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Target Job Role</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Senior Software Engineer, Data Scientist"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Experience Level</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-white cursor-pointer"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
              >
                {Object.values(ExperienceLevel).map(lvl => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Evaluation Difficulty</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-white cursor-pointer"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              >
                {Object.values(Difficulty).map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Core Skills (comma separated)</label>
            <textarea 
              required
              rows={3}
              placeholder="React, TypeScript, AWS, System Design, Communication..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300 resize-none"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-indigo-200"
          >
            Generate Assessment Kit
          </button>
        </form>
      </div>
    </div>
  );
};
