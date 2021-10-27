import { Task } from './Task';
import { Grade } from './Grade';

export interface Subject {
  _id: string;
  label: string;
  name: string;
  startDate: Date;
  endDate: Date;
  exams: number;
  abscences: number;
  tasks: Task[];
  grades: Grade[];
}
