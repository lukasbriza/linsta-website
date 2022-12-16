import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { routes } from '../src/config/routes'

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

const Gdpr: NextPage = () => {
    return (
        <section data-route={routes.gdpr}>
        </section>
    )
}

export default Gdpr