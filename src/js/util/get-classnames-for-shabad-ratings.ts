export const getClassnamesForShabadRatings = (avgScore: number): string => {
  console.log(avgScore, "avg score...")
  if (avgScore >= 80) {
    return 'Excellent'
  } else if (avgScore >= 40) {
    return 'Good';
  }
  return 'Poor'
}