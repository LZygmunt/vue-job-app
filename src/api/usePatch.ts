import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/vue-query'
import type { EndpointParams, ExtractParams } from './utils/utilTypes.ts'
import prepareEndpoint from './utils/prepareEndpoint.ts'

export type MutationOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TQueryContext = unknown,
  TEndpoint extends string = string,
> = UseMutationOptions<TData, TError, TVariables, TQueryContext> & EndpointParams<TEndpoint>

const usePatch = <
  TVariables extends ExtractParams<TEndpoint>,
  TEndpoint extends string = string,
  TData = unknown,
  TQueryContext = unknown,
  TError = DefaultError,
>(
  endpoint: TEndpoint,
  options?: MutationOptions<TData, TError, TVariables, TQueryContext, TEndpoint>,
) =>
  useMutation({
    mutationFn: async (variables) => {
      const preparedEndpoint = prepareEndpoint({
        endpoint,
        params: variables,
      })
      const res = await fetch(preparedEndpoint, {
        method: 'PATCH',
        body: JSON.stringify(variables),
      })

      if (!res.ok) {
        throw new Error(`${preparedEndpoint} is not ok`)
      }
      return await res.json()
    },
    ...options,
  })

export default usePatch
