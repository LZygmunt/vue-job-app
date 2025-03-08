export type FilterKey =
  | 'start'
  | 'end'
  | 'limit'
  | 'page'
  | 'perPage'
export type SearchParams = Partial<{ [Key in FilterKey]: string | number }>

export interface EndpointParams<TEndpoint extends string> {
  params?: ExtractParams<TEndpoint>
  searchParams?: SearchParams
}

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-object-type*/
export type ExtractParams<T extends string> = T extends `${ infer _Start }:${ infer Param }/${ infer Rest }`
  ? { [K in Param | keyof ExtractParams<Rest>]: string | number }
  : T extends `${ infer _Start }:${ infer Param }`
    ? { [K in Param]: string | number }
    : {}
/* eslint-enable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-object-type*/
