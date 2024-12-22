export function calculateSentimentDistribution(reviews: Review[]): Array<{ name: string; value: number; count: number }> {
  if (reviews.length === 0) {
    return [
      { name: 'Positive', value: 0, count: 0 },
      { name: 'Neutral', value: 0, count: 0 },
      { name: 'Negative', value: 0, count: 0 },
    ];
  }

  const counts = reviews.reduce((acc, review) => {
    acc[review.sentiment]++;
    return acc;
  }, { positive: 0, neutral: 0, negative: 0 });

  const total = reviews.length;
  
  return [
    { 
      name: 'Positive', 
      value: Math.round((counts.positive / total) * 100),
      count: counts.positive
    },
    { 
      name: 'Neutral', 
      value: Math.round((counts.neutral / total) * 100),
      count: counts.neutral
    },
    { 
      name: 'Negative', 
      value: Math.round((counts.negative / total) * 100),
      count: counts.negative
    },
  ];
}