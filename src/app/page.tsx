'use client'
import { useUserUpdateMutation } from "@/hooks/fhub/useUserUpdateMutation";
import { useFarcasterSigner, usePrivy } from '@privy-io/react-auth';
import { Account } from 'fhub'


export default function Home() {
  const userUpdateMutation = useUserUpdateMutation()
  const { requestFarcasterSignerFromWarpcast, getFarcasterSignerPublicKey, signFarcasterMessage } = useFarcasterSigner();

  const privy = usePrivy()

  const farcasterAccount = privy.user?.linkedAccounts.find(
    (a) => a.type === 'farcaster'
  )


  return <div className="flex flex-col gap-2">
    <h1>Sign in with farcaster please</h1>
    {privy.authenticated &&
      <button
        onClick={() => requestFarcasterSignerFromWarpcast()}
        // // Prevent requesting a Farcaster signer if a user has not already linked a Farcaster account
        // // or if they have already requested a signer
        disabled={!farcasterAccount || !!farcasterAccount.signerPublicKey}
      >
        Authorize my Farcaster signer from Warpcast
      </button>
    }
    {!privy.authenticated && <button onClick={() => privy.login()}>Login</button>}
    {privy.authenticated && <button onClick={() => privy.logout()}>Logout</button>}
    <button onClick={() => {
      if (!farcasterAccount || !farcasterAccount.fid) throw new Error('Not connected')

      userUpdateMutation.mutate({
        account: Account.fromEd25519Signer({
          fid: BigInt(farcasterAccount.fid),
          signer: {
            getSignerKey: getFarcasterSignerPublicKey,
            signMessageHash: signFarcasterMessage
          }
        }),
        data: {
          type: 'bio',
          value: 'My new cool bio'
        }
      })
    }}>Update</button>
  </div>
}
