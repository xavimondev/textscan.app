import { NextApiRequest, NextApiResponse } from 'next'
import Vision from '@google-cloud/vision'
import { getVertices } from 'utils/getVertices'

const vision = new Vision.ImageAnnotatorClient({
  credentials: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLIENT_PRIVATE_KEY
  },
  projectId: process.env.GOOGLE_CLIENT_PROJECT_ID
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { imageBase64 } = req.body
  try {
    const request = {
      image: {
        content: Buffer.from(imageBase64.split('base64,')[1], 'base64')
      }
    }

    const [textDetections] = await vision.textDetection(request)
    const annotations = textDetections.textAnnotations
    if (annotations && annotations.length > 0) {
      const [firstAnnotation, ...boundings] = annotations
      const { description } = firstAnnotation
      return res.status(200).json({ ok: true, vertices: getVertices(boundings), text: description })
    }
    return res.status(200).json({ ok: false, msg: 'This image does not have text' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ ok: false, msg: 'Failed to get text from image' })
  }
}
