import { atom, selector } from 'recoil';

export interface AppSettings {
  apiUrl: string;
  auth0: {
    domain: string;
    clientId: string;
    audience: string;
    scope?: string;
    useBrowserLocalStorageCache?: boolean;
  };
  supportEmail: string;
}

async function loadAppSettings(): Promise<AppSettings> {
  try {
    const appSettingsResponse = await fetch('/config/config.json');
    if (!appSettingsResponse.ok) throw new Error('Failed to load app settings');
    const appSettings = await appSettingsResponse.json().then((data) => data as AppSettings);
    return appSettings;
  } catch (error) {
    //oh oh, redirect to static error page?!
    console.error(error);
    throw error;
  }
}

// Atom effect has weird behavior where it's loading config settings multiple times.
// So we just pass it the same promise instance to resolve directly.
// we're following the docs: https://recoiljs.org/docs/guides/atom-effects/#initialize-with-promise
const loadAppSettingsPromise = loadAppSettings();

export const appSettingsAtom = atom<AppSettings | null>({
  key: 'appSettingsAtom',
  default: loadAppSettingsPromise
});

export const apiUrlState = selector({
  key: 'apiUrlState',
  get: ({ get }) => {
    const appSettings = get(appSettingsAtom);

    return appSettings?.apiUrl;
  },
});

export const supportEmailState = selector({
  key: 'supportEmailState',
  get: ({ get }) => {
    const appSettings = get(appSettingsAtom);

    return appSettings?.supportEmail;
  },
});
