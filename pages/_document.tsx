import React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => App,
        enhanceComponent: (Component) => Component,
      })

    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;500;700&display=swap'
            as='font'
            type='font/IBMPlesSans'
            rel='fonts'
          />
        </Head>
        <body className='dark:bg-zinc-900 bg-[#f1e7db]'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
