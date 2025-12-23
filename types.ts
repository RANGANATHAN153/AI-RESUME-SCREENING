
export interface Candidate {
  Resume_ID: number;
  Name: string;
  Skills: string;
  ExperienceYears: number;
  Education: string;
  Certifications: string;
  JobRole: string;
  RecruiterDecision: 'Hire' | 'Reject';
  SalaryExpectation: number;
  ProjectsCount: number;
  AIScore: number;
}

export type ViewType = 'dashboard' | 'candidates' | 'ai-analyst' | 'predictor';

export interface AnalysisResponse {
  summary: string;
  recommendations: string[];
  topSkills: string[];
}
