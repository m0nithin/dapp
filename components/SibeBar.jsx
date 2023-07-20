import Link from 'next/link'
import React from 'react'

const SibeBar = ({ active , toggleDivVisibility }) => {

  const navLinks = [
    {
      name : 'TOKEN',
      link : '/',
    },
    {
      name : 'SWAP',
      link : '/swap',
    },
    {
      name : 'FIAT',
      link : '/fiat',
    },
  ]
  return (
    <div className= {`barStyle sm:flex  ${active ? 'flex' : 'hidden'} sm:static ${active ? ' absolute' : 'static'} h-full py-6`}>
      <ul className='flex flex-col gap-2 '>
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.link}
            onClick={toggleDivVisibility}
            className='w-full px-8 p-5 text-center font-extrabold navLinks'>
            {link.name}
          </Link>
        ))}
      </ul>
    </div>
  )
}
export default SibeBar