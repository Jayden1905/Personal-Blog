import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { CopyIcon, PasteIcon } from './icon'

const Code = ({ children }: { children: string }) => {
  const languages =
    'javascript' ||
    'typescript' ||
    'jsx' ||
    'tsx' ||
    'css' ||
    'html' ||
    'json' ||
    'python' ||
    'java' ||
    'rust' ||
    'bash' ||
    'c' ||
    'cpp' ||
    'csharp' ||
    'go' ||
    'kotlin' ||
    'php' ||
    'ruby' ||
    'swift' ||
    'yaml' ||
    'markdown'

  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [copied])

  return (
    <div className='relative'>
      <CopyToClipboard text={children} onCopy={() => setCopied(true)}>
        <button className='absolute right-0 p-1'>
          {copied ? <PasteIcon /> : <CopyIcon />}
        </button>
      </CopyToClipboard>
      <SyntaxHighlighter
        customStyle={{
          fontSize: '14px',
        }}
        style={oneDark}
        language={languages}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

export default Code
