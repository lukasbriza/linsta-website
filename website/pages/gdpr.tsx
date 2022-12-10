import type { NextPage } from 'next'
import { Logo } from '@components'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

const Gdpr: NextPage = () => {
    return (
        <section>
        </section>
    )
}

export default Gdpr