// components/types.ts
export interface Answer {
  id: number;
  title_answer: string;
  result_answer?: boolean; // facultatif
}

export interface Question {
  id: number;
  question_title: string;
  module_id?: number;
  question_level?: string;
  question_duration?: number;
}
