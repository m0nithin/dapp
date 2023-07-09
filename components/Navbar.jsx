import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import Link from 'next/link'

const NavBar = () => {
  return (
    <nav>
      <div className='barStyle flex justify-between items-center'>
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
          <h1 className=' text-3xl font-bold text-green-500'>Griffin</h1>
        </Link>
        <ConnectButton />
      </div>
      
    </nav>
  )
}

export default NavBar