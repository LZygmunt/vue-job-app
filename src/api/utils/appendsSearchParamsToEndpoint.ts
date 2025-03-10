const appendsSearchParamsToEndpoint = ( endpoint: string, searchParams?: string ) => {
  if ( !searchParams ) {
    return endpoint
  }

  return `${ endpoint }?${ searchParams }`
}

export default appendsSearchParamsToEndpoint
