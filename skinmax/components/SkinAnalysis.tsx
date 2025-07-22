export type Answers = {
  oilAfterWash: boolean;
  acneHistory: boolean;
  beardIrritation: boolean;
  budget: 'low' | 'mid' | 'high';
};

export type SkinAnalysis = {
  skinType: string;
  concerns: string[];
};

export const analyzeSkin = (answers: Answers): SkinAnalysis => {
  let type = 'normal';
  const concerns: string[] = [];

  if (answers.oilAfterWash) type = 'oily';
  if (!answers.oilAfterWash && !answers.acneHistory) type = 'dry';
  if (answers.acneHistory && answers.oilAfterWash) concerns.push('acne');
  if (answers.beardIrritation) concerns.push('beard bumps');

  return { skinType: type, concerns };
};
