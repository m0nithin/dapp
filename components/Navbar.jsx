import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import Link from 'next/link'

import {SlMenu} from 'react-icons/sl'

const NavBar = ({ active, toggleDivVisibility }) => {

  const customStyles = {
    backgroundColor: 'red', // Set your desired background color
    color: 'white', // Set your desired text color
  };


  return (
    <nav>
      <div className='barStyle flex justify-between items-center px-2'>
        <button
          className=' sm:hidden block'
          onClick={toggleDivVisibility}
        >
          <SlMenu className=' text-3xl text-white'/>
        </button>
        <Link 
          href={'/'}
          className='flex justify-center items-center gap-3 justify-self-center'
        >
          <Image 
            alt="logo"
            src={"/logo.png"}
            width={70}
            height={70}
          />
          <h1 className='sm:inline hidden text-3xl font-extrabold text-green-800'>PEPE</h1>
        </Link>
        <ConnectButton
          customStyles={customStyles}
        />
      </div>
    </nav>
  )
}

export default NavBar