import {createContext, PropsWithChildren, useContext} from 'react';

import {SiriusApi} from '../data/api';

export interface ApiContext {
  sirius: SiriusApi;
}

const defaultApiHost = 'http://localhost:3025';

const apiContext = createContext<ApiContext>({
  sirius: new SiriusApi(defaultApiHost),
});

export function useApi(): ApiContext {
  return useContext<ApiContext>(apiContext);
}

export interface ApiContextProviderProps {
  hostUrl?: string;
}

export function ApiContextProvider(props: PropsWithChildren<ApiContextProviderProps>): JSX.Element {
  const host = props.hostUrl ?? defaultApiHost;
  const siriusApi = new SiriusApi(host);

  return (
    <apiContext.Provider value={{sirius: siriusApi}}>
      {props.children}
    </apiContext.Provider>
  );
}
