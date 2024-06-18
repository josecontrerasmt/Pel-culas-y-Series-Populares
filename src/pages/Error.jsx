import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div className='w-full h-[100vh] grid place-content-center p-8'>
      <div className='bg-[#ff000049] py-10 px-8 rounded-lg text-center flex flex-col gap-8'>
        <h1 className='text-3xl'>Lo sentimos, direccion no encontrada :c</h1>
        <Link to={'/'} className='bg-[#ffd700] text-black font-bold py-4 rounded-md text-xl'>Volver al Inicio</Link>
      </div>
    </div>
  )
}
