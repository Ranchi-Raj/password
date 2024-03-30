import React from 'react'

export default function Display({data}) {
  return (
    <div className='py-5 overflow-x-scroll fix-scroll'>
      {data}
    </div>
  )
}
