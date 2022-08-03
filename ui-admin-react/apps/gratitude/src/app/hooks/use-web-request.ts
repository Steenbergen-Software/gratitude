import { useCallback, useState } from "react";

export function useWebRequest<T>(url: string, method: 'GET' | 'POST' = 'GET') {

  const [status, setStatus] = useState<{
    loading: boolean;
    success?: boolean;
    error?: Error;
    data?: T
  }>({
    loading: false,
  });

  const exec = (body?: any) => {
    setStatus({
      loading: true,
    });
    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method === 'POST' ? JSON.stringify(body) : undefined,
    })
      .then(res => {
        if (!res.ok) throw new Error(res.status + ': ' + res.statusText);
        return res.json();
      })
      .then((data) => {
        setStatus({
          success: true,
          loading: false,
          data: data
        });
      }).catch(err => {
        setStatus({
          loading: false,
          error: err,
        });
      }
      );
  };

  return {
    ...status,
    exec: useCallback(exec, [url, method])
  }

}
