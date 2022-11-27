import styles from '../../src/styles/pages/Protected.module.scss'

import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


import { AddMechanizationForm, DynamicHead, AddReferencesForm, AddUserForm, UpdateMechanizationSection } from '@components';

import { siteMetaData } from '../../src/config/siteMetadata';

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

const Dashboard: NextPage = () => {
    const { t } = useTranslation()

    return (
        <>
            <DynamicHead
                title={t('head.protected.title')}
                description={t('head.protected.description')}
                canonicalUrl={siteMetaData.siteUrl + '/dashboard'}
                ogType="website"
            />
            <AddMechanizationForm />
            <UpdateMechanizationSection />
            <AddReferencesForm />
            <AddUserForm />
        </>
    )
}

export default Dashboard