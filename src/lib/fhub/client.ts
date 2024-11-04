import { Client, Transport } from "fhub";

export const fhubClient = Client.create(Transport.grpcNode({ baseUrl: 'https://hub-grpc.pinata.cloud', httpVersion: '2' }))
