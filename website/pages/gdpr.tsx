import styles from '../src/styles/pages/Gdpr.module.scss'

import { Typography } from '@lukasbriza/lbui-lib';
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next'
import { FC } from 'react';

type HeaderProps = {
    children: React.ReactNode
}

type NumberOfSectionProps = {
    children: React.ReactNode
}

type SectionProps = {
    children: React.ReactNode
}

type SectionDataProps = {
    children: React.ReactNode
    bullet?: boolean;
    number?: string
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

const Gdpr: NextPage = () => {
    const { t } = useTranslation()
    return (
        <section className={styles.gdpr}>
            <Header>
                {t('pages.gdpr.header')}
            </Header>
            <Section>
                <NumberOfSection>
                    I.
                </NumberOfSection>
                <SectionHeader>
                    {t('pages.gdpr.section1.header')}
                </SectionHeader>
                <SectionData number={'1.'}>
                    {t('pages.gdpr.section1.1')}
                </SectionData>
                <SectionData number={'2.'}>
                    {t('pages.gdpr.section1.2')}<br />
                    {t('pages.gdpr.section1.2a')}<br />
                    {t('pages.gdpr.section1.2b')}<br />
                    {t('pages.gdpr.section1.2c')}<br />
                </SectionData>
                <SectionData number={'3.'}>
                    {t('pages.gdpr.section1.3')}
                </SectionData>
                <SectionData number={'4.'}>
                    {t('pages.gdpr.section1.4')}
                </SectionData>
            </Section>
            <Section>
                <NumberOfSection>
                    II.
                </NumberOfSection>
                <SectionHeader>
                    {t('pages.gdpr.section2.header')}
                </SectionHeader>
                <SectionData number={'1.'}>
                    {t('pages.gdpr.section2.1')}
                </SectionData>
                <SectionData number={'2.'}>
                    {t('pages.gdpr.section2.2')}
                </SectionData>
            </Section>
            <Section>
                <NumberOfSection>
                    III.
                </NumberOfSection>
                <SectionHeader>
                    {t('pages.gdpr.section3.header')}
                </SectionHeader>
                <SectionData number={'1.'}>
                    {t('pages.gdpr.section3.1')}
                </SectionData>
                <SectionData number={'2.'}>
                    {t('pages.gdpr.section3.2')}
                </SectionData>
                <SectionData bullet={true}>
                    {t('pages.gdpr.section3.2a')}
                </SectionData>
                <SectionData bullet={true}>
                    {t('pages.gdpr.section3.2b')}
                </SectionData>
                <SectionData number={'3.'}>
                    {t('pages.gdpr.section3.3')}
                </SectionData>
            </Section>
            <Section>
                <NumberOfSection>
                    IV.
                </NumberOfSection>
                <SectionHeader>
                    {t('pages.gdpr.section4.header')}
                </SectionHeader>
                <SectionData number={'1.'}>
                    {t('pages.gdpr.section4.1')}
                </SectionData>
                <SectionData bullet={true}>
                    {t('pages.gdpr.section4.1a')}
                </SectionData>
                <SectionData bullet={true}>
                    {t('pages.gdpr.section4.1b')}
                </SectionData>
                <SectionData number={'2.'}>
                    {t('pages.gdpr.section3.2')}
                </SectionData>
            </Section>
            <Section>
                <NumberOfSection>
                    V.
                </NumberOfSection>
                <SectionHeader>
                    {t('pages.gdpr.section5.header')}
                </SectionHeader>
                <SectionData number={'1.'}>
                    {t('pages.gdpr.section5.1')}
                </SectionData>
                <SectionData bullet={true}>
                    {t('pages.gdpr.section5.1a')}
                </SectionData>
                <SectionData bullet={true}>
                    {t('pages.gdpr.section5.1b')}
                </SectionData>
                <SectionData bullet={true}>
                    {t('pages.gdpr.section5.1c')}
                </SectionData>
                <SectionData number={'2.'}>
                    {t('pages.gdpr.section5.2')}
                </SectionData>
            </Section>
            <Section>
                <NumberOfSection>
                    VI.
                </NumberOfSection>
                <SectionHeader>
                    {t('pages.gdpr.section6.header')}
                </SectionHeader>
                <SectionData number={'1.'}>
                    {t('pages.gdpr.section6.1')}
                </SectionData>
                <SectionData bullet={true}>
                    {t('pages.gdpr.section6.1a')}
                </SectionData>
                <SectionData bullet={true}>
                    {t('pages.gdpr.section6.1b')}
                </SectionData>
                <SectionData bullet={true}>
                    {t('pages.gdpr.section6.1c')}
                </SectionData>
                <SectionData bullet={true}>
                    {t('pages.gdpr.section6.1d')}
                </SectionData>
                <SectionData bullet={true}>
                    {t('pages.gdpr.section6.1e')}
                </SectionData>
                <SectionData bullet={true}>
                    {t('pages.gdpr.section6.1f')}
                </SectionData>
                <SectionData number={'2.'}>
                    {t('pages.gdpr.section6.2')}
                </SectionData>
            </Section>
            <Section>
                <NumberOfSection>
                    VII.
                </NumberOfSection>
                <SectionHeader>
                    {t('pages.gdpr.section7.header')}
                </SectionHeader>
                <SectionData number={'1.'}>
                    {t('pages.gdpr.section7.1')}
                </SectionData>
                <SectionData number={'2.'}>
                    {t('pages.gdpr.section7.2')}
                </SectionData>
                <SectionData number={'3.'}>
                    {t('pages.gdpr.section7.3')}
                </SectionData>
            </Section>
            <Section>
                <NumberOfSection>
                    VIII.
                </NumberOfSection>
                <SectionHeader>
                    {t('pages.gdpr.section8.header')}
                </SectionHeader>
                <SectionData number={'1.'}>
                    {t('pages.gdpr.section8.1')}
                </SectionData>
                <SectionData number={'2.'}>
                    {t('pages.gdpr.section8.2')}
                </SectionData>
                <SectionData number={'3.'}>
                    {t('pages.gdpr.section8.3')}
                </SectionData>
            </Section>
            <Typography type={'body1'} size={'medium'} className={styles.end}>
                {t('pages.gdpr.ending')}
            </Typography>
        </section>
    )
}

const Section: FC<SectionProps> = (props) => {
    const { children } = props
    return (
        <table className={styles.section}>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}

const Header: FC<HeaderProps> = (props) => {
    const { children } = props
    return (
        <Typography type={'h1'} size={'small'} className={styles.pageHeader}>
            {children}
        </Typography>
    )
}

const SectionHeader: FC<HeaderProps> = (props) => {
    const { children } = props
    return (
        <tr className={styles.sectionHeader}>
            <td colSpan={3}>
                <Typography type={'h2'} size={'medium'}>
                    {children}
                </Typography>
            </td>
        </tr>
    )
}

const NumberOfSection: FC<NumberOfSectionProps> = (props) => {
    const { children } = props
    return (
        <tr className={styles.sectionNumber}>
            <th colSpan={3}>
                <Typography type={'subtitle2'} size={'medium'}>
                    {children}
                </Typography>
            </th>
        </tr>
    )
}

const SectionData: FC<SectionDataProps> = (props) => {
    const { children, bullet = false, number = "1." } = props
    return (
        <tr className={styles.sectionData}>
            <td colSpan={bullet ? 2 : 1}>
                {!bullet ? <div className={styles.number}>{number}</div> : <div className={styles.bullet}>&#x2022;</div>}
            </td>
            <td colSpan={bullet ? 1 : 2} className={styles.sectionDataText}>
                <Typography type={'body1'} size={'medium'}>
                    {children}
                </Typography>
            </td>
        </tr>
    )
}


export default Gdpr