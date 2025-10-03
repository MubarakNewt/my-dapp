"use client"
import { useAccount, useConnect, useDisconnect, useBalance, useContractRead, useContractWrite } from 'wagmi'
import { base } from '@reown/appkit/networks'
import { ABI } from './abi'

const contract = {
  address: '0x4a8AEd5b9153F5F9A70B29e53bB40fdC4FcB78ff',
  abi: ABI,
}

export default function Counter() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({ address })
  const { data: number } = useContractRead({ ...contract, functionName: 'number' })
  const { write: increment } = useContractWrite({ ...contract, functionName: 'increment' })
  const { write: setNumber } = useContractWrite({ ...contract, functionName: 'setNumber' })

  return (
    <div>
      <h2>Counter — Connect Wallet & Increment</h2>

      {!isConnected ? (
        connectors.map((c) => (
          <button key={c.id} onClick={() => connect({ connector: c })}>
            Connect with {c.name}
          </button>
        ))
      ) : (
        <>
          <p>Connected: {address}</p>
          <p>Balance: {balance?.formatted} {balance?.symbol}</p>
          <button onClick={() => disconnect()}>Disconnect</button>

          <p>Current number: {number?.toString()}</p>
          <button onClick={() => increment()}>Increment</button>
          <button onClick={() => setNumber({ args: [42] })}>Set number to 42</button>
        </>
      )}
    </div>
  )
}
