import { PROXY_API } from '#/constans.ts'

const appendsProxyToEndpoint = ( endpoint: string ) => `${PROXY_API}${ endpoint }`

export default appendsProxyToEndpoint
