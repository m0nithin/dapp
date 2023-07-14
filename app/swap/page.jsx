'use client'

import PreloadIframe from '@/components/PreloadIframe'
import '../globals.css'

const swap = () => {
  return (
    <div className="w-full h-full grid place-content-center">
        <div className="w-full h-full">
          <PreloadIframe
            src="https://voltichange.net/api/widget/?chain=1&darktheme=true&tokenin=Native&tokenout=0x6982508145454Ce325dDbE47a25d4ec3d2311933&slippage=1"
          />
          <iframe 
            loading="lazy" 
            src="https://voltichange.net/api/widget/?chain=1&darktheme=true&tokenin=Native&tokenout=0x6982508145454Ce325dDbE47a25d4ec3d2311933&slippage=1"
            className="voltichange-widget"
          />
        </div>
    </div>
  )
}

export default swap