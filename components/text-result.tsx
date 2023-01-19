type TextResultProps = {
  text: string
}

export function TextResult({ text }: TextResultProps) {
  return (
    <div className='mt-6'>
      <p className='text-left dark:text-white whitespace-pre-line text-lg selection:text-black selection:bg-[#F1E740]'>
        {text}
      </p>
    </div>
  )
}
