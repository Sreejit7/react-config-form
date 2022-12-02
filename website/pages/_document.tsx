import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="react-config-form is a solution to create highly customizable forms in React just with a config object."
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/base16/harmonic16-light.min.css"
            integrity="sha512-zR2aDW8jThHNvwkPB5OIM4jA4HSEruqQU4KGNPpYcy2WkiUMcIw6QldaLe134T8d3RnzC2qE2DZE4k+0khiKBQ=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
