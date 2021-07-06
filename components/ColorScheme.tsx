import React, {PropsWithChildren, useEffect, useState} from 'react';

export type ColorScheme = "light" | "dark";

export const ColorSchemeContext = React.createContext<ColorScheme>("light");

function getColorScheme(): ColorScheme {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  } else {
    return "light";
  }
}

export function AutomaticColorSchemeSwitch({children}: PropsWithChildren<{}>) {
  const [scheme, setScheme] = useState<ColorScheme>("light");

  const handleSchemeChanged = (e: MediaQueryListEvent) => {
    if (e.matches) {
      setScheme("dark");
    } else {
      setScheme("light");
    }
  };

  useEffect(() => {
    setScheme(getColorScheme());

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", handleSchemeChanged);

    return () => {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      media.removeEventListener("change", handleSchemeChanged);
    };
  }, []);

  return (
      <ColorSchemeContext.Provider value={scheme}>
        {children}
      </ColorSchemeContext.Provider>
  );
}
