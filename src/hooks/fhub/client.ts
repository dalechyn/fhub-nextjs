import { Client, Transport } from 'fhub'

export const fhubClient = Client.create(
  Transport.grpcNode({ baseUrl: 'https://hub-grpc.pinata.cloud', }),
)
// 'https://hub-grpc.pinata.cloud'
// 'https://hub-grpc-api.neynar.com'

export const options = {
  headers: {
    'x-api-key': `${process.env.NEYNAR_API_KEY ?? 'NEYNAR_FROG_FM'}`
  }
}
