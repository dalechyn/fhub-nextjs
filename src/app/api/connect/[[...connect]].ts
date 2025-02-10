import type {
  CallOptions,
  ConnectRouter,
  HandlerContext,
} from '@connectrpc/connect'
import { nextJsApiRouter } from '@connectrpc/connect-next'
import { Client, Transport } from 'fhub'
import { HubService } from 'fhub/rpc'

function contextToOptions(context: HandlerContext): CallOptions {
  const options: CallOptions = {}
  const timeoutMs = context.timeoutMs()
  if (timeoutMs) options.timeoutMs = timeoutMs
  options.signal = context.signal
  options.headers = context.requestHeader
  return options
}

function connect(rpcUrl: string) {
  const client = Client.create(
    Transport.grpcNode({ baseUrl: rpcUrl, httpVersion: '2' }),
  )
  return (router: ConnectRouter) => {
    router.service(HubService, {
      async submitMessage(req, context) {
        return client.connectRpcClient.submitMessage(
          req,
          contextToOptions(context),
        )
      },
      async validateMessage(req, context) {
        return client.connectRpcClient.validateMessage(
          req,
          contextToOptions(context),
        )
      },
      async *subscribe(req, context) {
        for await (const value of client.connectRpcClient.subscribe(
          req,
          contextToOptions(context),
        ))
          yield value
      },
      async getEvent(req, context) {
        return client.connectRpcClient.getEvent(req, contextToOptions(context))
      },
      async getCast(req, context) {
        return client.connectRpcClient.getCast(req, contextToOptions(context))
      },
      async getCastsByFid(req, context) {
        return client.connectRpcClient.getCastsByFid(
          req,
          contextToOptions(context),
        )
      },
      async getCastsByParent(req, context) {
        return client.connectRpcClient.getCastsByParent(
          req,
          contextToOptions(context),
        )
      },
      async getCastsByMention(req, context) {
        return client.connectRpcClient.getCastsByMention(
          req,
          contextToOptions(context),
        )
      },

      async getReaction(req, context) {
        return client.connectRpcClient.getReaction(
          req,
          contextToOptions(context),
        )
      },
      async getReactionsByFid(req, context) {
        return client.connectRpcClient.getReactionsByFid(
          req,
          contextToOptions(context),
        )
      },
      async getReactionsByCast(req, context) {
        return client.connectRpcClient.getReactionsByCast(
          req,
          contextToOptions(context),
        )
      },
      async getReactionsByTarget(req, context) {
        return client.connectRpcClient.getReactionsByTarget(
          req,
          contextToOptions(context),
        )
      },
      async getUserData(req, context) {
        return client.connectRpcClient.getUserData(
          req,
          contextToOptions(context),
        )
      },
      async getUserDataByFid(req, context) {
        return client.connectRpcClient.getUserDataByFid(
          req,
          contextToOptions(context),
        )
      },
      async getUsernameProof(req, context) {
        return client.connectRpcClient.getUsernameProof(
          req,
          contextToOptions(context),
        )
      },
      async getUserNameProofsByFid(req, context) {
        return client.connectRpcClient.getUserNameProofsByFid(
          req,
          contextToOptions(context),
        )
      },
      async getVerification(req, context) {
        return client.connectRpcClient.getVerification(
          req,
          contextToOptions(context),
        )
      },
      async getVerificationsByFid(req, context) {
        return client.connectRpcClient.getVerificationsByFid(
          req,
          contextToOptions(context),
        )
      },
      async getOnChainSigner(req, context) {
        return client.connectRpcClient.getOnChainSigner(
          req,
          contextToOptions(context),
        )
      },
      async getOnChainSignersByFid(req, context) {
        return client.connectRpcClient.getOnChainSignersByFid(
          req,
          contextToOptions(context),
        )
      },
      async getOnChainEvents(req, context) {
        return client.connectRpcClient.getOnChainEvents(
          req,
          contextToOptions(context),
        )
      },

      async getIdRegistryOnChainEvent(req, context) {
        return client.connectRpcClient.getIdRegistryOnChainEvent(
          req,
          contextToOptions(context),
        )
      },
      async getIdRegistryOnChainEventByAddress(req, context) {
        return client.connectRpcClient.getIdRegistryOnChainEventByAddress(
          req,
          contextToOptions(context),
        )
      },
      async getCurrentStorageLimitsByFid(req, context) {
        return client.connectRpcClient.getCurrentStorageLimitsByFid(
          req,
          contextToOptions(context),
        )
      },
      async getFids(req, context) {
        return client.connectRpcClient.getFids(req, contextToOptions(context))
      },
      async getLink(req, context) {
        return client.connectRpcClient.getLink(req, contextToOptions(context))
      },
      async getLinksByFid(req, context) {
        return client.connectRpcClient.getLinksByFid(
          req,
          contextToOptions(context),
        )
      },
      async getLinksByTarget(req, context) {
        return client.connectRpcClient.getLinksByTarget(
          req,
          contextToOptions(context),
        )
      },
      async getAllCastMessagesByFid(req, context) {
        return client.connectRpcClient.getAllCastMessagesByFid(
          req,
          contextToOptions(context),
        )
      },
      async getAllReactionMessagesByFid(req, context) {
        return client.connectRpcClient.getAllReactionMessagesByFid(
          req,
          contextToOptions(context),
        )
      },
      async getAllVerificationMessagesByFid(req, context) {
        return client.connectRpcClient.getAllVerificationMessagesByFid(
          req,
          contextToOptions(context),
        )
      },
      async getAllUserDataMessagesByFid(req, context) {
        return client.connectRpcClient.getAllUserDataMessagesByFid(
          req,
          contextToOptions(context),
        )
      },
      async getAllLinkMessagesByFid(req, context) {
        return client.connectRpcClient.getAllLinkMessagesByFid(
          req,
          contextToOptions(context),
        )
      },
      async getLinkCompactStateMessageByFid(req, context) {
        return client.connectRpcClient.getLinkCompactStateMessageByFid(
          req,
          contextToOptions(context),
        )
      },
      async submitBulkMessages(req, context) {
        return client.connectRpcClient.submitBulkMessages(
          req,
          contextToOptions(context),
        )
      },
    })
  }
}
const { handler, config } = nextJsApiRouter({ prefix: '/api/connect', routes: connect('https://hub-grpc.pinata.cloud') });
export { handler as GET, handler as POST, config };
