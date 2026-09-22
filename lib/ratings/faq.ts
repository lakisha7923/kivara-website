export type RatingFaqItem = {
  id: string;
  question: string;
  paragraphs: string[];
  bullets?: string[];
  numbered?: string[];
  closing?: string;
};

export const professionalRatingFaqItems: RatingFaqItem[] = [
  {
    id: "what-is",
    question: "What is my Professional Rating?",
    paragraphs: [
      "Your Professional Rating reflects feedback from facilities after you complete assignments through Kivara Healthcare.",
      "Facilities may rate their experience based on factors such as professionalism, communication, punctuality, quality of work, and overall experience.",
    ],
  },
  {
    id: "how-calculated",
    question: "How is my rating calculated?",
    paragraphs: [
      "Your rating is calculated from ratings submitted by facilities through Kivara.",
      "Ratings may be displayed as an overall star rating, such as:",
      "4.8 / 5.0 ⭐",
      "Your rating is based on the ratings you receive from completed assignments.",
    ],
  },
  {
    id: "who-can-rate",
    question: "Who can rate me?",
    paragraphs: [
      "Facilities that have worked with you through Kivara may be eligible to submit a rating after a completed assignment.",
      "Professionals cannot rate themselves.",
    ],
  },
  {
    id: "before-shift",
    question: "Can a facility rate me before I work a shift?",
    paragraphs: [
      "Ratings should be based on an actual completed Kivara assignment.",
      "A facility should not be able to submit a rating for a professional they have not worked with.",
    ],
  },
  {
    id: "facilities-change",
    question: "Can facilities change my rating?",
    paragraphs: [
      "Facilities should not be able to directly change your overall rating.",
      "A facility may be able to submit or update its own feedback according to Kivara's rating rules.",
    ],
  },
  {
    id: "self-change",
    question: "Can I change my own rating?",
    paragraphs: [
      "No.",
      "Professionals cannot edit, delete, or manually change their ratings.",
    ],
  },
  {
    id: "multiple",
    question: "Can one facility give me multiple ratings?",
    paragraphs: [
      "Ratings should be connected to actual completed assignments.",
      "Kivara may limit or manage multiple ratings from the same facility so that the rating accurately represents your work history.",
    ],
  },
  {
    id: "low-rating",
    question: "What happens if I receive a low rating?",
    paragraphs: [
      "A single low rating does not necessarily represent your overall performance.",
      "Your overall rating is based on the ratings you receive through Kivara and may change as you complete additional assignments and receive additional feedback.",
    ],
  },
  {
    id: "improve",
    question: "Can my rating improve?",
    paragraphs: [
      "Yes.",
      "As you successfully complete additional assignments and receive positive feedback, your overall rating may improve.",
    ],
  },
  {
    id: "vs-reliability",
    question: "Does my rating affect my Reliability Score?",
    paragraphs: [
      "Your Professional Rating and Reliability Score are separate.",
      "Reliability Score is based primarily on verified shift activity, such as completed shifts, attendance, cancellations, and no-shows.",
      "Professional Rating reflects feedback from facilities about their experience working with you.",
      "One does not automatically determine the other.",
    ],
  },
  {
    id: "get-shifts",
    question: "Does my rating affect my ability to get shifts?",
    paragraphs: [
      "Facilities may consider your Professional Rating when reviewing professionals for assignments.",
      "However, your rating is only one part of your professional profile.",
      "Facilities may also consider:",
    ],
    bullets: [
      "Required certifications",
      "Experience",
      "Skills",
      "Availability",
      "Reliability Score",
      "Application information",
      "Other qualifications",
    ],
  },
  {
    id: "unfair",
    question: "What if I believe a rating is unfair or incorrect?",
    paragraphs: [
      "If you believe a rating contains inaccurate information, violates Kivara's rating policies, or was submitted in error, contact Kivara Healthcare support.",
      "Kivara may review the rating and the available assignment information.",
    ],
  },
  {
    id: "dispute",
    question: "Can I dispute a rating?",
    paragraphs: [
      "You may contact Kivara Healthcare support to request a review of a rating.",
      "A request for review does not automatically mean that the rating will be removed or changed.",
      "Kivara will review the available information and determine whether the rating violates applicable rating rules or contains an error.",
    ],
  },
  {
    id: "who-sees",
    question: "Will facilities see every rating I receive?",
    paragraphs: [
      "Kivara may display your overall rating and other appropriate rating information to facilities using the platform.",
      "Kivara may limit or protect certain information according to its privacy policies and platform rules.",
    ],
  },
  {
    id: "name-shown",
    question: "Will my name be shown with a facility's review?",
    paragraphs: [
      "Kivara may determine how rating information is displayed to protect both professionals and facilities while providing useful information to users.",
    ],
  },
  {
    id: "new",
    question: "What happens if I am new to Kivara?",
    paragraphs: [
      "If you have not completed enough assignments to establish a meaningful rating, Kivara may display:",
      "New to Kivara",
      "or",
      "Not enough ratings yet",
      "This is different from having a low rating.",
    ],
  },
  {
    id: "entire-career",
    question: "Is my rating based on my entire healthcare career?",
    paragraphs: [
      "No.",
      "Your Kivara Professional Rating reflects feedback from assignments completed through Kivara.",
      "It does not represent your entire employment history or your overall ability as a healthcare professional.",
    ],
  },
  {
    id: "credentials",
    question: "Does my rating replace my credentials?",
    paragraphs: [
      "No.",
      "Your rating does not replace your:",
    ],
    bullets: [
      "CNA certification",
      "Medication Aide certification",
      "Nursing license",
      "Other professional credentials",
      "Education",
      "Work experience",
      "Skills",
    ],
    closing:
      "Facilities may consider your complete professional profile when reviewing you for assignments.",
  },
  {
    id: "good-ratings",
    question: "What can I do to receive good ratings?",
    paragraphs: [
      "The best way to build a strong professional reputation is to:",
    ],
    numbered: [
      "Provide professional and respectful care.",
      "Communicate clearly with the facility.",
      "Arrive prepared and on time.",
      "Follow facility policies and procedures.",
      "Complete your assigned shift.",
      "Communicate promptly if an unexpected problem occurs.",
      "Maintain the required credentials and qualifications.",
    ],
  },
  {
    id: "retaliation",
    question: "Can a facility retaliate against me with a rating?",
    paragraphs: [
      "Kivara does not intend for ratings to be used to retaliate against professionals.",
      "Ratings should reflect the facility's genuine experience with a completed assignment.",
      "If you believe a rating was submitted as retaliation, harassment, discrimination, or for another inappropriate reason, contact Kivara Healthcare support for review.",
    ],
  },
  {
    id: "inappropriate",
    question: "Can ratings contain inappropriate or offensive comments?",
    paragraphs: [
      "Kivara may establish rules regarding inappropriate, abusive, discriminatory, threatening, or unrelated rating content.",
      "Professionals may report ratings or comments that violate Kivara's policies.",
    ],
  },
  {
    id: "why",
    question: "Why does Kivara use ratings?",
    paragraphs: [
      "Ratings are intended to provide useful feedback about professionals' experiences working through the Kivara platform.",
      "They also give professionals an opportunity to build a positive reputation based on their completed assignments.",
    ],
  },
];

export const professionalRatingFaqRemember = {
  title: "Remember",
  paragraphs: [
    "Your Professional Rating is only one part of your Kivara profile.",
    "Your Reliability Score, certifications, experience, skills, availability, and qualifications are also important.",
  ],
  tagline:
    "Every completed assignment is an opportunity to build your professional reputation.",
};

export type ProfessionalRatingSummary =
  | {
      status: "ready";
      average: number;
      maxStars: 5;
      ratingCount: number;
      caption: string;
    }
  | {
      status: "insufficient";
      message: "New to Kivara" | "Not enough ratings yet";
    };

/**
 * Demo Professional Rating for the sample CNA.
 * Kept separate from Reliability Score — never derived from it.
 */
export const mockProfessionalRating: ProfessionalRatingSummary = {
  status: "ready",
  average: 4.8,
  maxStars: 5,
  ratingCount: 18,
  caption: "Facility feedback",
};

/** Example empty state for professionals without enough ratings. */
export const mockProfessionalRatingEmpty: ProfessionalRatingSummary = {
  status: "insufficient",
  message: "Not enough ratings yet",
};
