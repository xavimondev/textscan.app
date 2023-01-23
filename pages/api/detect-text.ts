import { NextApiRequest, NextApiResponse } from 'next'
import path from 'node:path'
import Vision from '@google-cloud/vision'
import { getVertices } from 'utils/getVertices'

const KEY_PATH = path.join(process.cwd(), 'keys')
const vision = new Vision.ImageAnnotatorClient({
  keyFilename: `${KEY_PATH}/apikey.json`
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { imageUrl } = req.body
  try {
    const [textDetections] = await vision.textDetection(`${imageUrl}`)
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
