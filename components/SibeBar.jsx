import Link from 'next/link'
import React from 'react'

const SibeBar = () => {
  return (
    <div className='barStyle sm:flex hidden h-full py-6 px-3'>
      <ul className='flex flex-col gap-1'>
        <Link href={'/'}>TOKEN</Link>
        <Link href={'/'}>PORFOLIO</Link>
        <Link href={'/'}>SWAP</Link>
      </ul>
    </div>
  )
}
export default SibeBar