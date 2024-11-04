import { Client, Transport } from "fhub";

export const fhubClient = Client.create(Transport.grpcNode({ baseUrl: process.env.RPC_URL ?? 'https://hub-grpc.pinata.cloud', httpVersion: '2' }))
