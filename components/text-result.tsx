type TextResultProps = {
  text: string
}

export function TextResult({ text }: TextResultProps) {
  if (!text) return null
  return (
    <div className='border-2 border-gray-700 rounded-lg p-5 bg-[#0e0f11] overflow-y-auto w-full h-96 sm:h-[700px]'>
      <p className='text-left font-medium dark:text-white whitespace-pre-line text-base selection:text-black selection:bg-[#F1E740]'>
        {text}
      </p>
    </div>
  )
}
