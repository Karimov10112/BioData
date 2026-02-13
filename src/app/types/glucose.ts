export interface GlucoseReading {
  id: string;
  value: number;
  timestamp: Date;
  status: 'low' | 'normal' | 'high';
}

export function analyzeGlucose(value: number): 'low' | 'normal' | 'high' {
  if (value < 70) return 'low';
  if (value > 140) return 'high';
  return 'normal';
}
