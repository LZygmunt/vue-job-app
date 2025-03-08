export const appendsSearchParamsToEndpoint = ( endpoint: string, searchParams?: string ) => {
  if ( !searchParams ) {
    return endpoint
  }

  return `${ endpoint }?${ searchParams }`
}
