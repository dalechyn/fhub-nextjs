import { useFarcasterSigner, usePrivy } from '@privy-io/react-auth';
import { Account } from 'fhub'

export function useFhubPrivyAccount() {
  const { getFarcasterSignerPublicKey, signFarcasterMessage } = useFarcasterSigner();
  const privy = usePrivy()

  const farcasterAccount = privy.user?.linkedAccounts.find(
    (a) => a.type === 'farcaster'
  )
  if (!farcasterAccount?.fid) return null

  return Account.fromEd25519Signer({
    fid: BigInt(farcasterAccount.fid),
    signer: {
      getSignerKey: getFarcasterSignerPublicKey,
      signMessageHash: signFarcasterMessage
    }
  })
}
