import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {tomorrow} from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';
import math from 'remark-math';

const {InlineMath, BlockMath} = require('react-katex');

export interface MarkdownProps {
  children: string;
  sanitizeHtml?: boolean;
}

export default function Markdown(props: MarkdownProps): JSX.Element {
  const sanitizeHtml = props.sanitizeHtml ?? true;

  const renderers = {
    code: (node: {language: string, value: string}) => (
      <SyntaxHighlighter style={tomorrow} language={node.language} children={node.value} />
    ),
    math: (node: {value: string}) => (
      <BlockMath math={node.value} />
    ),
    inlineMath: (node: {value: string}) => (
      <InlineMath>{node.value}</InlineMath>
    ),
  };

  return (
    <ReactMarkdown
        plugins={[gfm, math]}
        renderers={renderers}
        allowDangerousHtml={!sanitizeHtml} >
      {props.children}
    </ReactMarkdown>
  );
}
