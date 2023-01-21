import { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

type CodeResultProps = {
  code: string
}

export function CodeResult({ code }: CodeResultProps) {
  useEffect(() => {
    if (!code) return
    Prism.highlightAll()
  }, [code])

  if (!code) return null

  return (
    <div className='max-w-full'>
      <pre className='language-js line-numbers'>
        <code>{code}</code>
      </pre>
    </div>
  )
}
