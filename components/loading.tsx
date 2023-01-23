export function Loading() {
  return (
    <div className='flex flex-col gap-0 items-center mt-4'>
      <p className='text-white font-semibold text-lg'>Processing your image</p>
      <svg
        version='1.1'
        id='L2'
        xmlns='http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        viewBox='0 0 100 100'
        enableBackground='new 0 0 100 100'
        className='w-20 h-20'
      >
        <circle fill='#fff' stroke='none' cx='6' cy='50' r='6'>
          <animateTransform
            attributeName='transform'
            dur='1s'
            type='translate'
            values='0 15 ; 0 -15; 0 15'
            repeatCount='indefinite'
            begin='0.1'
          />
        </circle>
        <circle fill='#fff' stroke='none' cx='30' cy='50' r='6'>
          <animateTransform
            attributeName='transform'
            dur='1s'
            type='translate'
            values='0 10 ; 0 -10; 0 10'
            repeatCount='indefinite'
            begin='0.2'
          />
        </circle>
        <circle fill='#fff' stroke='none' cx='54' cy='50' r='6'>
          <animateTransform
            attributeName='transform'
            dur='1s'
            type='translate'
            values='0 5 ; 0 -5; 0 5'
            repeatCount='indefinite'
            begin='0.3'
          />
        </circle>
      </svg>
    </div>
  )
}
