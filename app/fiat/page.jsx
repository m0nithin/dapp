import PreloadIframe from '@/components/PreloadIframe'
import React from 'react'

const fiat = () => {
  return (
    <div className="w-full h-full grid place-content-center">
        <div className="w-full h-full">
        <PreloadIframe
            src="https://flooz.xyz/embed/trade?swapDisabled=false&swapToTokenAddress=0x6982508145454Ce325dDbE47a25d4ec3d2311933&swapLockToToken=false&onRampDisabled=false&onRampAsDefault=true&onRampDefaultAmount=2000&onRampTokenAddress=0x6982508145454Ce325dDbE47a25d4ec3d2311933&stakeDisabled=true&network=eth&lightMode=false&primaryColor=%2304d5c0&backgroundColor=transparent&roundedCorners=10&padding=20"
        />
          <iframe 
            className="flooz-widget"
            loading="lazy" 
            // width={400} height={720}
            allow="clipboard-read *; clipboard-write *; web-share *; accelerometer *; autoplay *; camera *; gyroscope *; payment *; geolocation *"
            src="https://flooz.xyz/embed/trade?swapDisabled=false&swapToTokenAddress=0x6982508145454Ce325dDbE47a25d4ec3d2311933&swapLockToToken=false&onRampDisabled=false&onRampAsDefault=true&onRampDefaultAmount=2000&onRampTokenAddress=0x6982508145454Ce325dDbE47a25d4ec3d2311933&stakeDisabled=true&network=eth&lightMode=false&primaryColor=%2304d5c0&backgroundColor=transparent&roundedCorners=10&padding=20"
            />
        </div>
    </div>
  )
}

export default fiat