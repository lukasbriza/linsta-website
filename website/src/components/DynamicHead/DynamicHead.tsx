import { siteMetaData, MetaData } from '../../config/siteMetadata'
import { Element } from '@lukasbriza/lbui-lib'
import Head from "next/head"
import { FC } from 'react'

interface HeadProps {
    children?: Element,
    title: string,
    description: string,
    canonicalUrl: string,
    ogType: "article" | "website",
    ogImageUrl?: string
}

export const DynamicHead: FC<HeadProps> = (props) => {
    return (
        <Head>
            <title>{props.title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content={props.description} />

            <link rel="canonical" href={props.canonicalUrl} />

            <meta property="og:locale" content="cs" />
            <meta property="og:site_name" content={siteMetaData.companyName} />
            <meta property="og:type" content={props.ogType} />
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:url" content={props.canonicalUrl} />
            {props.ogImageUrl && <meta property="og:image" content={props.ogImageUrl} />}
            {props.children}
        </Head>
    )
}