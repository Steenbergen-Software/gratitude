import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { appSettingsAtom } from '../store';

export function useFetchGraphql() {
  const { getAccessTokenSilently } = useAuth0();
  const appSettings = useRecoilValue(appSettingsAtom);

  const [status, setStatus] = useState<{
    loading: boolean;
    error?: Error;
    data?: unknown;
  }>({
    loading: false,
  });

  const fetchGraphql = useCallback(() => {
    return async (text: unknown, variables: unknown = {}) => {
      const apiUrl = appSettings?.apiUrl;
      const token = await getAccessTokenSilently();

      if (!apiUrl || !token) {
        setStatus({ loading: false, error: new Error(`Unauthorized access.`) });
        return;
      }

      setStatus({ loading: true });

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: text,
          variables,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setStatus({ loading: false, data: res.data });
        })
        .catch((error: Error) => {
          setStatus({ loading: false, error });
        });
    };
  }, [appSettings, getAccessTokenSilently])();

  return { ...status, fetchGraphql };
}
