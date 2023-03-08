import { Html, Head, Main, NextScript } from 'next/document'
import { keywords } from "../src/config/keywords"

export default function Document() {
    return (
        <Html lang="cs">
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="robots" content="all" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="keywords" content="linsta,Linsta,linsta stavební,zemní práce,demolice,příprava území,skrývka ornice,hrubé terénní úpravy,výkop inženýrských sítí,výkop základů,výkop základových pasů,výkop bazénů,výkop jímek,hutněné násypy a zásypy,třídění a recyklace materiálů,výstavba, komunikací, silnic, chodníků, polních cest, parkovišť, cyklostezek, odstavných ploch,pronájem stavebních strojů, pronájem bagrů,výstavba vodovodů,výstavba kanalizací,vodojemy,čističky odpadních vod,čov,nákladní autodoprava,nákup a doprava kameniva,odvoz a likvidace suti,odvoz a likvidace zeminy, výkopku, sypkých materiálů,Hořovice, Praha, Beroun, Plzeň, Příbram, Benešov, Rakovník, Kladno, Stochov, Praha - východ, Praha - západ, Kralovice, Rokycany" />
                <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" href="/favicon.ico" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ec9b0a" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}