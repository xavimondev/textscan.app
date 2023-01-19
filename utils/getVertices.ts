export const getVertices = (boundings: any) => {
  return boundings.map((bounding: any) => {
    const {
      boundingPoly: { vertices }
    } = bounding
    return {
      vertices
    }
  })
}
