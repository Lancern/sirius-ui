import {Code, Equation, Collection, CollectionRow, NotionRenderer, NotionComponents} from 'react-notion-x';
import {ExtendedRecordMap} from 'notion-types';

import {AutomaticColorSchemeSwitch, ColorSchemeContext} from './ColorScheme';

const RENDERER_COMPONENTS: Partial<NotionComponents> = {
  code: Code,
  collection: Collection,
  collectionRow: CollectionRow,
  equation: Equation,
};

export interface PostRendererProps {
  content: ExtendedRecordMap;
}

export default function PostRenderer({content}: PostRendererProps) {
  return (
      <AutomaticColorSchemeSwitch>
        <ColorSchemeContext.Consumer>
          {scheme => (
              <NotionRenderer
                  recordMap={content}
                  components={RENDERER_COMPONENTS}
                  darkMode={scheme === "dark"}
              />
          )}
        </ColorSchemeContext.Consumer>
      </AutomaticColorSchemeSwitch>
  );
}
