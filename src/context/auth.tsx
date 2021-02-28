import {createContext, PropsWithChildren, useContext} from 'react';
import {Redirect} from 'react-router-dom';

import {useUrl} from './url';

export interface AuthContext {
  token?: string;

  signIn(token: string, remember?: boolean): void;
  signOut(): void;
}

const defaultAuthContextValue: AuthContext = {
  signIn(token: string, remember?: boolean): void {
    defaultAuthContextValue.token = token;
    if (remember) {
      window.localStorage.setItem('SiriusToken', token);
    }
  },

  signOut(): void {
    defaultAuthContextValue.token = undefined;
    window.localStorage.removeItem('SiriusToken');
  }
}

const authContext = createContext<AuthContext>(defaultAuthContextValue);

export function useAuth(): AuthContext {
  const token = window.localStorage.getItem('SiriusToken');
  if (token) {
    defaultAuthContextValue.token = token;
  }

  return useContext(authContext);
}

export function AuthRedirect(props: PropsWithChildren<{}>): JSX.Element {
  const url = useUrl();
  const auth = useAuth();

  if (auth.token) {
    return (
      <>
        {props.children}
      </>
    );
  } else {
    return (
      <Redirect to={url.signInUrl} />
    );
  }
}
