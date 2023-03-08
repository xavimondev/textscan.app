import { NextApiRequest, NextApiResponse } from 'next'
import sizeOf from 'image-size'
import { ISizeCalculationResult } from 'image-size/dist/types/interface'

const getImageSize = (base64String: string): Promise<ISizeCalculationResult> => {
  return new Promise((resolve) => {
    const dimensions = sizeOf(Buffer.from(base64String.split(',')[1], 'base64'))
    resolve(dimensions)
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { imageBase64 } = req.body
  const image = await getImageSize(imageBase64)

  return res.status(200).json({ width: image.width, height: image.height })
}
