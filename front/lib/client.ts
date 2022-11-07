import QueryString from 'qs'


let _cookie = ''

export function setClientCookie(cookie: string) {
  _cookie = cookie
}

export function clearCookie() {
  _cookie = ''
}

export function consumeCookie(request: Request) {
  const cookie = request.headers.get('Cookie')
  if (cookie) {
    setClientCookie(cookie)
  }
}



interface RequestConfig {
  params?: any
  headers?: HeadersInit
  signal?: AbortSignal
}

export class FetchError extends Error {
  constructor(public response: Response, public data: any) {
    super(`Fetch failed with status ${response.status}`)
  }
}

async function rejectIfNeeded(response: Response) {
  if (!response.ok) {
    const data = await response.json()
    throw new FetchError(response, data)
  }
  return response
}

type AsyncFn<T> = () => Promise<T>

/**
 * ensures cookie is set on request, and clears after making request.
 * @param fn
 * @param request
 * @param isAsync if true, cookie will clear after promise resolves
 * @returns
 */
export async function withCookie<T>(
  fn: AsyncFn<T>,
  request: Request,
  isAsync = false,
) {
  consumeCookie(request)
  const promise = fn()
  if (isAsync) {
    await promise
  }
  clearCookie()
  return promise
}


export const fetchClient = {
  baseUrl: 'http://localhost:8080',
  async get<T>(url: string, config: RequestConfig = {}) {
    const query = config?.params ? QueryString.stringify(config?.params, { addQueryPrefix: true }) : ''
  }

}