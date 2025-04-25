import {
  type DefaultError,
  type QueryKey,
  type QueryObserverOptions,
  useQuery,
  type UseQueryOptions,
  type UseQueryReturnType,
} from '@tanstack/vue-query'
import { ref, toValue, unref, watchEffect } from 'vue'
import { deepUnref } from '#/utils/deepUnref.ts'
import type { DeepMaybeRefOrGetter } from '../utilityTypes.ts'
import prepareEndpoint from './utils/prepareEndpoint.ts'
import resolveSearchParams from './utils/resolveSearchParams.ts'
import type { EndpointParams } from './utils/utilTypes.ts'

type WithoutQueryKey<T> = Omit<T, 'queryKey'>

type BaseQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Partial<
  Omit<QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>, 'queryFn'>
>

type RawOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TEndpoint extends string = string,
> = BaseQueryOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey> & EndpointParams<TEndpoint>

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
  & DeepMaybeRefOrGetter<EndpointParams<TEndpoint>>

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
  const queryOptions =
    ref<WithoutQueryKey<BaseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>>>()
  const endpointOptions = ref<EndpointParams<TEndpoint>>()
  const queryKey = ref<TQueryKey>([] as unknown as TQueryKey)
  const resolvedSearchParams = ref('')

  watchEffect(() => {
    const {
      params,
      searchParams,
      queryKey: _queryKey,
      ...qOptions
    } = (deepUnref(options) ?? {}) as RawOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryFnData,
      TQueryKey,
      TEndpoint
    >
    queryOptions.value = qOptions
    queryKey.value = [endpoint]
    endpointOptions.value = { params, searchParams }
    resolvedSearchParams.value = resolveSearchParams(searchParams)

    if (params) {
      queryKey.value.push(...Object.values(params))
    }

    if (resolvedSearchParams.value) {
      queryKey.value.push(resolvedSearchParams.value)
    }

    if (_queryKey) {
      queryKey.value.push(_queryKey)
    }
  })

  return useQuery({
    ...(unref(queryOptions) as WithoutQueryKey<
      UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>
    >),
    queryFn: async () => {
      const preparedEndpoint = prepareEndpoint({
        endpoint,
        params: toValue(endpointOptions.value?.params),
        searchParams: toValue(endpointOptions.value?.searchParams),
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
    queryKey,
  })
}

export default useGet
