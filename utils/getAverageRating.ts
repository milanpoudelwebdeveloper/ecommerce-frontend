interface IAverageRating {
  star: Number
  postedBy: string
  _id: string
}

export const getAverageRating = (ratings: IAverageRating[]) => {
  let realStars: Number[] = []
  ratings.map((r: IAverageRating) => realStars.push(r.star))
  const length = realStars.length
  const averageRatings = realStars.reduce((p: any, n: any) => p + n, 0) / length
  return averageRatings
}
