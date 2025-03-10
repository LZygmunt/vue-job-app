import appendsProxyToEndpoint from './appendsProxyToEndpoint.ts'
import appendsSearchParamsToEndpoint from './appendsSearchParamsToEndpoint.ts'
import resolveSearchParams from './resolveSearchParams.ts'
import type { EndpointParams, ExtractParams } from './utilTypes.ts'

interface PrepareEndpointOptions<TEndpoint extends string> extends EndpointParams<TEndpoint> {
  endpoint: TEndpoint
}

const prepareEndpoint = <TEndpoint extends string>( {
  endpoint,
  params,
  searchParams,
}: PrepareEndpointOptions<TEndpoint> ): string => {
  const paramRegex = /:([^/]+)/g
  let match
  const resolvedSearchParams = resolveSearchParams( searchParams )
  let result = appendsProxyToEndpoint(
    appendsSearchParamsToEndpoint( endpoint, resolvedSearchParams )
  )

  if ( !params ) {
    return result
  }

  while ( (
    match = paramRegex.exec( endpoint )
  ) !== null ) {
    const paramName = match[ 1 ] as keyof ExtractParams<TEndpoint>
    if ( params[ paramName ] === undefined ) {
      throw new Error( `Value for param ${ paramName as string } was not provided.` )
    }

    result = result.replace( `:${ paramName as string }`, String( params[ paramName ] ) )
  }

  return result
}

export default prepareEndpoint
