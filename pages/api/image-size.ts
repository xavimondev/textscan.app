import { NextApiRequest, NextApiResponse } from 'next'
import { get } from 'https'
import sizeOf from 'image-size'
import { ISizeCalculationResult } from 'image-size/dist/types/interface'

const getImageSize = (urlImage: string): Promise<ISizeCalculationResult> => {
  return new Promise((resolve) => {
    get(urlImage, (response) => {
      const chunks: any = []
      response
        .on('data', (chunk) => {
          chunks.push(chunk)
        })
        .on('end', () => {
          const buffer = Buffer.concat(chunks)
          const image = sizeOf(buffer)
          resolve(image)
        })
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { urlImage } = req.body
  const image = await getImageSize(urlImage)

  return res.status(200).json({ width: image.width, height: image.height })
}
