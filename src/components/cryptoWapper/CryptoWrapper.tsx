import {
	RainbowKitProvider,
	connectorsForWallets,
    midnightTheme,
} from "@rainbow-me/rainbowkit";
import './CryptoWrapper.css';
import {
	coinbaseWallet,
	ledgerWallet,
	metaMaskWallet,
	phantomWallet,
	rabbyWallet,
	trustWallet,
	uniswapWallet,
	walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import type { JSX, PropsWithChildren } from "react";
import { createClient } from "viem";
import { baseSepolia/*,unichainSepolia*/} from "viem/chains";
import { http, WagmiProvider, createConfig } from "wagmi";
import "/node_modules/@rainbow-me/rainbowkit/dist/index.css";

const connectors = connectorsForWallets(
	[
		{
			groupName: "Recommended",
			wallets: [
				metaMaskWallet,
				ledgerWallet,
				coinbaseWallet,
				rabbyWallet,
				phantomWallet,
				trustWallet,
				uniswapWallet,
				walletConnectWallet,
			],
		},
	],
	{
		appName: "STOX",
		projectId: "ded0176302522c5e819156db00f41ea1",
	},
);

const config = createConfig({
	chains: [baseSepolia],
	ssr: false,
	connectors,
	client({ chain }) {
		return createClient({ chain, transport: http() });
	},
});

export default function CryptoWrapper(props: PropsWithChildren): JSX.Element {
	return (
		<WagmiProvider config={config}
        > <div style={{ fontFamily: 'Anta, sans-serif' }}>

			<RainbowKitProvider
            theme={midnightTheme({
                accentColor: '#7b3fe4',
                accentColorForeground: 'white',
                borderRadius: 'none',
            fontStack: 'system',})
             }
              >{props.children}</RainbowKitProvider>
			          </div>

		</WagmiProvider>
	);
}