import styles from '../../styles/modules/Layout.module.scss'

import { FC } from 'react'

import clsx from 'clsx'

import { LayoutProps } from './Layout.model'

export const Layout: FC<LayoutProps> = (props) => {
    const {
        children,
        menu,
        header,
        footer,
        menuClass,
        layoutClass,
        headerClass,
        footerClass,
        pageClass
    } = props

    return (
        <section id={styles.layout} className={layoutClass ? layoutClass : ""}>
            <section id={styles.headerWrapper} className={clsx([headerClass, !header && styles.hide])} >
                {header}
            </section>
            <section id={styles.menuWrapper} className={clsx([menuClass])}>
                {menu}
            </section>
            <section id={styles.pageContent} className={clsx([pageClass])}>
                {children}
            </section>
            <section id={styles.footerWrapper} className={clsx([footerClass, !footer && styles.hide])}>
                {footer}
            </section>
        </section>
    )
}