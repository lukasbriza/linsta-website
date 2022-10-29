import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="cs">
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="robots" content="index, follow" />
                <link rel="icon" type="image/png" href="/assets/favicon.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}