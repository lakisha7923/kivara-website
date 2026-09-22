export type ReliabilityFaqItem = {
  id: string;
  question: string;
  paragraphs: string[];
  bullets?: string[];
  numbered?: string[];
  closing?: string;
};

export const RELIABILITY_SCORE_RANGE = "0–100";

export const reliabilityFaqItems: ReliabilityFaqItem[] = [
  {
    id: "what-is",
    question: "What is the Reliability Score?",
    paragraphs: [
      `Your Reliability Score is a score from ${RELIABILITY_SCORE_RANGE} that reflects your reliability when completing shifts through Kivara Healthcare.`,
      "It is designed to help facilities understand your history of successfully completing assignments, arriving on time, and following through on accepted shifts.",
    ],
  },
  {
    id: "how-calculated",
    question: "How is my Reliability Score calculated?",
    paragraphs: [
      "Your score is calculated using your activity and shift history on Kivara. Factors may include:",
      "Your score is based on your actual Kivara activity rather than information you enter yourself.",
    ],
    bullets: [
      "Completed shifts",
      "On-time attendance",
      "Late cancellations",
      "No-shows",
      "Shift attendance history",
      "Other verified shift-related activity",
    ],
  },
  {
    id: "accepting",
    question: "Does accepting a shift affect my Reliability Score?",
    paragraphs: [
      "Accepting a shift by itself does not automatically increase your score.",
      "Once you accept a shift, it is important to follow through with the assignment. Completing the shift as scheduled can contribute positively to your reliability history.",
    ],
  },
  {
    id: "cancel",
    question: "What happens if I cancel a shift?",
    paragraphs: [
      "Cancellations may affect your Reliability Score depending on when and why the cancellation occurs.",
      "A cancellation made well in advance may be treated differently from a last-minute cancellation.",
      "If you cannot work a shift you accepted, notify the facility as soon as possible.",
    ],
  },
  {
    id: "no-show",
    question: "What is considered a no-show?",
    paragraphs: [
      "A no-show generally means you accepted a shift but did not report for the assignment and did not properly notify the facility.",
      "No-shows can have a significant negative effect on your Reliability Score.",
    ],
  },
  {
    id: "go-down",
    question: "Can my Reliability Score go down?",
    paragraphs: [
      "Yes.",
      "Your score can change when new shift activity is recorded. For example, late cancellations or no-shows may negatively affect your score.",
    ],
  },
  {
    id: "improve",
    question: "Can my Reliability Score improve?",
    paragraphs: [
      "Yes.",
      "Your score is not necessarily permanent.",
      "Consistently completing assignments, arriving on time, and maintaining a reliable attendance record can help improve your score over time.",
    ],
  },
  {
    id: "apply",
    question: "Does my Reliability Score affect my ability to apply for jobs?",
    paragraphs: [
      "Your Reliability Score may be visible to facilities when they review professionals for staffing opportunities.",
      "Facilities may consider a professional's Reliability Score along with other information, such as qualifications, certifications, experience, availability, and application information.",
      "A Reliability Score is only one part of your professional profile.",
    ],
  },
  {
    id: "facilities-change",
    question: "Can facilities change my Reliability Score?",
    paragraphs: [
      "No.",
      "Facilities do not manually choose or edit your Reliability Score.",
      "The score is calculated by Kivara using information recorded through the platform.",
    ],
  },
  {
    id: "incorrect",
    question: "What if a facility records something incorrectly?",
    paragraphs: [
      "If you believe your shift record contains an error—for example, you were marked as a no-show even though you worked the shift—you should contact Kivara Healthcare support.",
      "Kivara can review the available shift information and determine whether a correction is appropriate.",
    ],
  },
  {
    id: "emergency",
    question: "What if I had an emergency?",
    paragraphs: [
      "We understand that emergencies can happen.",
      "If an unexpected emergency prevents you from working an accepted shift, notify the facility as soon as possible and provide any information that may help explain the situation.",
      "Kivara may review disputed or unusual circumstances when appropriate.",
    ],
  },
  {
    id: "entire-history",
    question: "Does my score show my entire work history?",
    paragraphs: [
      "No.",
      "Your Reliability Score reflects your activity on Kivara. It does not represent your entire employment history or your overall ability as a healthcare professional.",
    ],
  },
  {
    id: "forever",
    question: "Will my score stay the same forever?",
    paragraphs: [
      "No.",
      "Your Reliability Score can change as you complete additional shifts and your Kivara activity changes.",
    ],
  },
  {
    id: "why-changed",
    question: "Can I see why my score changed?",
    paragraphs: [
      "Kivara may provide information about the activity that contributed to changes in your Reliability Score.",
      "If you have questions about a particular change, contact Kivara Healthcare support.",
    ],
  },
  {
    id: "good-score",
    question: "What is considered a good Reliability Score?",
    paragraphs: [
      "The Reliability Score is intended to provide a simple view of your Kivara shift history.",
      "Rather than focusing only on a number, professionals should focus on:",
    ],
    bullets: [
      "Showing up for accepted shifts",
      "Arriving on time",
      "Communicating with facilities",
      "Avoiding unnecessary cancellations",
      "Completing assignments professionally",
    ],
  },
  {
    id: "replace-credentials",
    question: "Does my Reliability Score replace my credentials or experience?",
    paragraphs: [
      "No.",
      "Your Reliability Score does not replace your:",
    ],
    bullets: [
      "CNA certification",
      "Medication Aide certification",
      "Nursing license",
      "Other professional credentials",
      "Work experience",
      "Skills",
      "Education",
      "References",
    ],
    closing:
      "Facilities may consider all relevant information when reviewing professionals.",
  },
  {
    id: "maintain",
    question: "How can I maintain a strong Reliability Score?",
    paragraphs: ["The best way to maintain a strong score is to:"],
    numbered: [
      "Only accept shifts you are reasonably able to work.",
      "Arrive on time.",
      "Complete accepted assignments.",
      "Communicate with the facility as soon as possible if an issue occurs.",
      "Avoid last-minute cancellations when possible.",
      "Never simply fail to report for an accepted shift.",
    ],
  },
  {
    id: "punish",
    question: "Is the Reliability Score meant to punish professionals?",
    paragraphs: [
      "No.",
      "The purpose of the Reliability Score is to provide facilities and professionals with a clearer picture of shift reliability on Kivara.",
      "It is also intended to give professionals an opportunity to build a positive track record through consistent, dependable work.",
    ],
  },
  {
    id: "who-sees",
    question: "Who can see my Reliability Score?",
    paragraphs: [
      "Your Reliability Score may be displayed as part of your professional profile and may be visible to facilities using Kivara to evaluate staffing candidates.",
      "Kivara may limit access to this information according to its privacy policies and platform settings.",
    ],
  },
  {
    id: "few-shifts",
    question: "What if I have only completed a few shifts?",
    paragraphs: [
      "Your score may be based on a limited amount of information when you are new to Kivara.",
      "As you complete more shifts, your reliability history can provide a more complete picture of your activity.",
    ],
  },
];

export const reliabilityFaqRemember = {
  title: "Remember",
  paragraphs: [
    "Your Reliability Score is one part of your Kivara professional profile.",
    "Your certifications, experience, skills, professionalism, availability, and work history are also important.",
    "Your Professional Rating is separate and is based on facility feedback after completed assignments.",
  ],
  tagline: "Show up. Communicate. Complete your shifts. Build your reputation.",
};

export type ReliabilityScoreSummary =
  | {
      status: "ready";
      value: number;
      max: 100;
      label: string;
      completedShifts: number;
      onTimeShifts: number;
      noShows: number;
    }
  | {
      status: "insufficient";
      message: "Not enough shift history";
    };

/**
 * Demo Reliability Score for the sample CNA.
 * Based only on verified shift activity — never derived from star ratings.
 */
export const mockReliabilityScore: ReliabilityScoreSummary = {
  status: "ready",
  value: 95,
  max: 100,
  label: "Strong",
  completedShifts: 24,
  onTimeShifts: 23,
  noShows: 0,
};

/** Example empty state when shift history is too limited to score. */
export const mockReliabilityScoreEmpty: ReliabilityScoreSummary = {
  status: "insufficient",
  message: "Not enough shift history",
};
