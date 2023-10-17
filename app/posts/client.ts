const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface RequestOptions {
  data?: Record<string, any>
  headers?: Record<string, string>
  method?: string
}

export default async function client(
  endpoint: string,
  { data, headers: customHeaders = {}, ...customConfig }: RequestOptions = {},
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: data ? new Headers({ 'Content-Type': 'application/json', ...customHeaders }) : undefined,
    ...customConfig,
  };

  return fetch(`${API_URL}/${endpoint}`, config).then(async (response) => {
    const res = await response.json();
    if (response.ok) return res;
    return Promise.reject(res);
  }).catch((err) => {
    console.error(err);
  });
}
