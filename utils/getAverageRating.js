export const getAverageRating = (ratings) => {
  let realStars = []
  ratings.map((r) => realStars.push(r.star))
  const length = realStars.length
  const averageRatings = realStars.reduce((p, n) => p + n, 0) / length
  return averageRatings
}
