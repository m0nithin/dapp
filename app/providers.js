'use client';

import '@rainbow-me/rainbowkit/styles.css';

import React, { useEffect, useState } from 'react';
import {
    RainbowKitProvider,
    getDefaultWallets,
    connectorsForWallets,
    darkTheme,
} from '@rainbow-me/rainbowkit';
import {
    argentWallet,
    trustWallet,
    ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { useIsMounted } from './useIsMounted';

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        mainnet
    ],
    [publicProvider()],
);

const projectId = 'b7a1ff5b17b9b4e2a112c49e76db7140';

const { wallets } = getDefaultWallets({
    appName: 'RainbowKit demo',
    projectId,
    chains,
});

const demoAppInfo = {
    appName: 'Rainbowkit Demo',
};

const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: 'Other',
        wallets: [
            argentWallet({ projectId, chains }),
            trustWallet({ projectId, chains }),
            ledgerWallet({ projectId, chains }),
        ],
    },
]);

const wagmiConfig = createConfig({
    autoConnect: false,
    connectors,
    publicClient,
    webSocketPublicClient,
});

function Providers({ children }) {
    // const mounted = useIsMounted()
    // const [mounted, setMounted] = useState(false);
    // useEffect(() => setMounted(true), []);
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
                chains={chains}
                appInfo={demoAppInfo}
                theme={darkTheme({
                    accentColor: '#39ec4aff',
                    accentColorForeground: 'white',
                    borderRadius: 'small',
                    fontStack: 'system',
                    overlayBlur: 'small',
                })}
            >
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export { Providers };
