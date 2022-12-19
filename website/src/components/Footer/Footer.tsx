import styles from '../../styles/modules/Footer.module.scss'

import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import clsx from 'clsx'
import { Reference } from './Reference'
import { FooterPoint } from './FooterPoint'
import { Divider, Typography } from '@lukasbriza/lbui-lib'

import { FooterProps, FooterTypographyProps, FooterheaderProps } from './Footer.model'

export const FooterTypography: FC<FooterTypographyProps> = (props) => {
    const { children, noWrap = true, className } = props
    return (
        <Typography
            type={"subtitle2"}
            size={"medium"}
            className={clsx([styles.referenceText, noWrap && styles.noWrap, className])}
        >
            {children}
        </Typography>
    )
}
const FooterHeader: FC<FooterheaderProps> = (props) => {
    const { className, variant, children } = props
    return (
        <Typography variant={variant} type={'h5'} size={"small"} className={clsx([styles.header, className])}>{children}</Typography>
    )
}

export const Footer: FC<FooterProps> = () => {
    const { t } = useTranslation()
    return (
        <section className={styles.footer}>
            <Divider className={styles.divider} fullWidth={true} depth={4} />
            <section className={clsx([styles.column, styles.column1])}>
                <FooterHeader variant={['bold']}>{t('footer.col1.header')}</FooterHeader>
                <FooterTypography noWrap={false}>{t('footer.col1.subtitle')}</FooterTypography>
            </section>
            <section className={clsx([styles.column, styles.column2])}>
                <FooterHeader variant={['bold', 'underline']}>{t('footer.col2.header')}</FooterHeader>
                <Reference text={t('footer.col2.ref1')} url={"/gdpr"} />
                <Reference text={t('footer.col2.ref2')} url={"/services"} />
                <Reference text={t('footer.col2.ref3')} url={"/mechanization"} />
                <Reference text={t('footer.col2.ref4')} url={"/references"} />
            </section>
            <section className={clsx([styles.column, styles.column3])}>
                <FooterHeader variant={['bold', 'underline']}>{t('footer.col3.header')}</FooterHeader>
                <FooterPoint>
                    <FooterTypography>{t('footer.col3.tel')}</FooterTypography>
                </FooterPoint>
                <FooterPoint>
                    <FooterTypography>{t('footer.col3.email')}</FooterTypography>
                </FooterPoint>
                <FooterPoint>
                    <FooterTypography>{t('footer.col3.ico')}</FooterTypography>
                </FooterPoint>
                <FooterPoint className={styles.officePoint}>
                    <FooterTypography className={styles.office}>
                        {t('footer.col3.line1')}<br />
                        {t('footer.col3.line2')}<br />
                        {t('footer.col3.line3')}<br />
                        {t('footer.col3.line4')}<br />
                        {t('footer.col3.line5')}
                    </FooterTypography>
                </FooterPoint>
            </section>
            <section className={styles.copyright}>
                <FooterTypography>&copy; LINSTA stavební s.r.o.</FooterTypography>
            </section>
        </section>
    )
}