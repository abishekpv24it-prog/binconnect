export const moderateText = async (text) => {
  try {
    const response = await fetch(
      `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${process.env.REACT_APP_PERSPECTIVE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment: { text },
          requestedAttributes: {
            TOXICITY: {},
            SEVERE_TOXICITY: {},
            PROFANITY: {},
            THREAT: {}
          }
        })
      }
    );
    
    const data = await response.json();
    
    // Check if any score is above threshold (0.7 = 70%)
    const scores = data.attributeScores;
    const isToxic = scores.TOXICITY.summaryScore.value > 0.7;
    const isSevere = scores.SEVERE_TOXICITY.summaryScore.value > 0.7;
    const isProfane = scores.PROFANITY.summaryScore.value > 0.7;
    const isThreat = scores.THREAT.summaryScore.value > 0.7;
    
    // Return true if content is clean (below all thresholds)
    return !isToxic && !isSevere && !isProfane && !isThreat;
    
  } catch (error) {
    console.error('Moderation failed:', error);
    // Allow submission if API fails (to prevent blocking users)
    return true;
  }
};
