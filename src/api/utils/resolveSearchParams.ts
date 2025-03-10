import type { FilterKey, SearchParams } from './utilTypes.ts'

type Resolver = ( value: string | number ) => string

const SearchParamResolverMap = new Map<FilterKey, Resolver>( [
  [ 'start', ( value ) => `_start=${ `${ value }`.trim() }` ],
  [ 'end', ( value ) => `_end=${ `${ value }`.trim() }` ],
  [ 'limit', ( value ) => `_limit=${ `${ value }`.trim() }` ],
  [ 'page', ( value ) => `_page=${ `${ value }`.trim() }` ],
  [ 'perPage', ( value ) => `_per_page=${ `${ value }`.trim() }` ],
] )

function resolveSearchParams( searchParams?: SearchParams ) {
  if ( !searchParams ) {
    return ''
  }
  return Object.entries( searchParams )
    .reduce( ( params, [ action, value ] ) => {
      const resolver = SearchParamResolverMap.get( action as FilterKey )
      if ( !resolver || [ '', null, undefined ].includes( value as unknown as string ) ) {
        return params
      }

      const stringifiedParam = resolver( value )

      if ( params === '' ) {
        return stringifiedParam
      }

      return `${ params }&${ stringifiedParam }`
    }, '' )
}

export default resolveSearchParams
