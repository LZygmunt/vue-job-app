import prepareEndpoint from './utils/prepareEndpoint.ts'
import resolveSearchParams from './utils/resolveSearchParams.ts'
import type { EndpointParams } from './utils/utilTypes.ts'
import {
  type DefaultError,
  type QueryKey,
  type QueryObserverOptions,
  useQuery,
  type UseQueryReturnType,
} from '@tanstack/vue-query'
import { toValue } from 'vue'

export type QueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TEndpoint extends string = string,
> = Partial<
  Omit<QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>, 'queryFn'>
>
  & EndpointParams<TEndpoint>

const useGet = <
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TEndpoint extends string = string,
  TError = DefaultError,
>(
  endpoint: TEndpoint,
  options?: QueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey, TEndpoint>,
): UseQueryReturnType<TData, TError> => {
  const unwrappedOptions = toValue(options)
  const queryKey: string[] = [endpoint]
  const resolvedSearchParams = resolveSearchParams(unwrappedOptions?.searchParams)

  if (unwrappedOptions?.params) {
    queryKey.push(...(Object.values(unwrappedOptions?.params) as string[]))
  }

  if (resolvedSearchParams) {
    queryKey.push(resolvedSearchParams)
  }

  if (unwrappedOptions?.queryKey) {
    queryKey.push(unwrappedOptions?.queryKey as unknown as string)
  }

  return useQuery({
    queryFn: async () => {
      const preparedEndpoint = prepareEndpoint({
        endpoint,
        params: unwrappedOptions?.params,
        searchParams: unwrappedOptions?.searchParams,
      })
      const res = await fetch(preparedEndpoint)

      if (res.status === 404) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        throw new Error(`Not Found: ${preparedEndpoint}`, { cause: res.status })
      }

      if (!res.ok) {
        throw new Error(`${preparedEndpoint} is not ok`)
      }
      return await res.json()
    },
    ...(options as Record<string, unknown>),
    queryKey,
  })
}

export default useGet
