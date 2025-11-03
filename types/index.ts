export interface ExperimentResult {
  _id?: string;
  version: 'optimized' | 'feature';
  startTime: Date;
  endTime: Date;
  duration: number; // milliseconds
  confirmationCode: string;
  nasatlx: {
    mentalDemand: number;
    physicalDemand: number;
    temporalDemand: number;
    performance: number;
    effort: number;
    frustration: number;
  };
  createdAt: Date;
}

export interface StudentData {
  id: string;
  name: string;
  studentId: string;
  grade: string;
  major: string;
  email: string;
  phone: string;
  address: string;
  enrollmentYear: number;
  gpa: number;
  status: 'active' | 'graduated' | 'suspended';
}

