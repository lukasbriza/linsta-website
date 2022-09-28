import styles from '../../styles/modules/Footer.module.scss'

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

export const Footer: FC<FooterProps> = (props) => {
    return (
        <section className={styles.footer}>
            <Divider className={styles.divider} fullWidth={true} depth={4} />
            <section className={clsx([styles.column, styles.column1])}>
                <FooterHeader variant={['bold']}>LINSTA stavební s.r.o.</FooterHeader>
                <FooterTypography noWrap={false}>Demolice, výkopové práce, autodoprava a pronájem stavebních strojů.</FooterTypography>
            </section>
            <section className={clsx([styles.column, styles.column2])}>
                <FooterHeader variant={['bold', 'underline']}>Odkazy</FooterHeader>
                <Reference text={"Nějaký odkaz"} url={"/mechanization"} />
                <Reference text={"Nějaký odkaz"} url={"/mechanization"} />
                <Reference text={"Nějaký odkaz"} url={"/mechanization"} />
                <Reference text={"Nějaký odkaz"} url={"/mechanization"} />
            </section>
            <section className={clsx([styles.column, styles.column3])}>
                <FooterHeader variant={['bold', 'underline']}>Kontakt</FooterHeader>
                <FooterPoint>
                    <FooterTypography>Tel.: +420 774 876 504</FooterTypography>
                </FooterPoint>
                <FooterPoint>
                    <FooterTypography>IČO.: 23468490</FooterTypography>
                </FooterPoint>
                <FooterPoint className={styles.officePoint}>
                    <FooterTypography>
                        Sídlo:<br />
                        Višňová 1367, Hořovice 268 01,<br />
                        Česká republika
                    </FooterTypography>
                </FooterPoint>
            </section>
            <section className={styles.copyright}>
                <FooterTypography>&copy; LINSTA stavební s.r.o.</FooterTypography>
            </section>
        </section>
    )
}