import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';
import math from 'remark-math';

const {InlineMath, BlockMath} = require('react-katex');

interface MarkdownProps {
  children: string;
}

export default function Markdown(props: MarkdownProps): JSX.Element {
  const renderers = {
    code: (node: {language: string, value: string}) => (
      <SyntaxHighlighter style={dark} language={node.language} children={node.value} />
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
        renderers={renderers}>
      {props.children}
    </ReactMarkdown>
  );
}
