import {createContext, useContext} from 'react';

import {SiriusApi} from 'data/api';
import {HitokotoApi} from 'data/hitokoto';

export interface ApiContext {
  sirius: SiriusApi;
  hitokoto: HitokotoApi;
}

const defaultApiHost = 'http://localhost:3025';

const apiContext = createContext<ApiContext>({
  sirius: new SiriusApi(defaultApiHost),
  hitokoto: new HitokotoApi(),
});

export function useApi(): ApiContext {
  return useContext<ApiContext>(apiContext);
}
