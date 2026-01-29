
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Achievement {
  value: string;
  label: string;
}

export interface Memory {
  url: string;
  caption?: string;
}

export interface Tribute {
  name: string;
  relation: string;
  message: string;
}

export interface Milestone {
  year: string;
  title: string;
  desc: string;
}
