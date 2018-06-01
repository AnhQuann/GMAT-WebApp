export const QUESTION_DIFFICULTIES = [
  {
    value: 0,
    text: "Easy"
  },
  {
    value: 1,
    text: "Medium"
  },
  {
    value: 2,
    text: "Hard"
  },
  {
    value: 3,
    text: "Very hard"
  },
]

export const VERBAL_QUESTION_TYPES = [
  "SC", "CR", "RC"
]

export const VERBAL_QUESTION_DESCRIPTIONS = {
  "SC": "Sentence correction",
  "CR": "Critical reasoning",
  "RC": "Reading comprehension"  
}

export const CHOICE_LETTERS = [
  "A", "B", "C", "D", "E"
]

export const DEFAULT_QUESTION_DETAIL_VALUE = {
  stem: "",
  choices: ["", "", "", "", ""],
  rightChoice: 0,
  explanation: "",
  difficulty: 0,
};

export const DEFAULT_QUESTION_VALUE = {
  type: "SC",
  stimulus: "",
  details: [DEFAULT_QUESTION_DETAIL_VALUE],
}

export const ROLE_LECTURER = "lecture";
export const ROLE_STUDENT = "student";

export * from './urls';
