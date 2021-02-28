import {createContext, useContext} from 'react';

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
