type IProps = {
  token?: string | null | undefined;
  data?: string;
};
export const client = async (
  endpoint: string,
  { token, data, ...customConfig }: IProps = {}
) => {
  const config: any = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': 'application/json',
    },
    ...customConfig,
  };

  return window.fetch(`${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      return Promise.reject({ message: 'Please re-authenticate.' });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};
