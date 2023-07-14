import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import Link from 'next/link'

const NavBar = () => {

  const customStyles = {
    backgroundColor: 'red', // Set your desired background color
    color: 'white', // Set your desired text color
  };

  return (
    <nav>
      <div className='barStyle flex justify-between items-center px-2'>
        <Link 
          href={'/'}
          className='flex justify-center items-center'
        >
          <Image 
            alt="logo"
            src={"/logo.png"}
            width={70}
            height={70}
          />
          <h1 className=' text-3xl font-extrabold text-green-800'>PEPE</h1>
        </Link>
        <ConnectButton
          customStyles={customStyles}
        />
      </div>
      
    </nav>
  )
}

export default NavBar