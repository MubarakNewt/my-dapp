// app/layout.tsx
import { WagmiProvider } from 'wagmi'
import { config } from '../wagmi'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <WagmiProvider config={config}>
          {children}
        </WagmiProvider>
      </body>
    </html>
  )
}
