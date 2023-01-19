import { google } from '@google-cloud/vision/build/protos/protos'

export const getVertices = (boundings: google.cloud.vision.v1.IEntityAnnotation[]) => {
  return boundings.map((bounding: google.cloud.vision.v1.IEntityAnnotation) => {
    const { boundingPoly } = bounding
    if (!boundingPoly)
      return {
        vertices: []
      }
    return {
      vertices: boundingPoly.vertices
    }
  })
}
