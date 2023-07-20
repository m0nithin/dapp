'use client'

import NavBar from '@/components/Navbar';
import SibeBar from '@/components/SibeBar';
import { useState } from 'react';

const App = ({ children }) => {

    const [active, setActive] = useState(false);

    const handleButtonClick = () => {
        setActive(!active);
    };

    return (
        <div className='h-screen w-screen flex flex-col'>
            <NavBar active={active} toggleDivVisibility={handleButtonClick} />
            <div className='flex h-full '>
                <SibeBar active={active} toggleDivVisibility={handleButtonClick} />
                <main className='w-full h-full pb-10'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default App