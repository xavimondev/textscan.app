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
    <>
      <pre className='language-js line-numbers code-toolbar'>
        <code>{code}</code>
      </pre>
    </>
  )
}
