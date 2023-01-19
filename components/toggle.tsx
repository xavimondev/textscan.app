import { Switch } from '@headlessui/react'

type ToggleProps = {
  isCode: boolean
  setIsCode: (isCode: boolean) => void
}

export function Toggle({ isCode, setIsCode }: ToggleProps) {
  return (
    <Switch.Group as='div' className='mt-4'>
      <div className='flex items-center'>
        <Switch.Label
          as='span'
          className={`mr-3 font-semibold ${!isCode ? 'text-white' : 'text-gray-500'}`}
        >
          Plain Text
        </Switch.Label>
        <Switch
          checked={isCode}
          onChange={setIsCode}
          className={`${isCode ? 'bg-gray-700' : 'bg-gray-300'}
          relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span
            aria-hidden='true'
            className={`${isCode ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <span className={`ml-3 font-semibold ${isCode ? 'text-white' : 'text-gray-500'}`}>
          Code
        </span>
      </div>
    </Switch.Group>
  )
}
