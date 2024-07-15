import React from 'react'

function Error() {
  return (
    <div className='h-dvh w-full flex flex-col gap-3 justify-center items-center'>
        <h2 className='text-xl font-semibold'>Oops!</h2>
        <p className='uppercase text-md'>404 - Page not found</p>
    </div>
  )
}

export default Error