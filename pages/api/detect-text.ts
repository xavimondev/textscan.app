import { NextApiRequest, NextApiResponse } from 'next'
import path from 'node:path'
import Vision from '@google-cloud/vision'

const KEY_PATH = path.join(process.cwd(), 'keys')
const vision = new Vision.ImageAnnotatorClient({
  keyFilename: `${KEY_PATH}/apikey.json`
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { imageUrl } = req.body
  const [textDetections] = await vision.textDetection(`${imageUrl}`)
  const annotations = textDetections.textAnnotations
  if (annotations) {
    const { locale, description, boundingPoly } = annotations[0]
    // console.log(boundingPoly)
    // console.log(description)
    console.log(annotations[0])
    return res.status(200).json({ msg: description })
  }
  return res.status(500).json({ msg: 'error' })
}
