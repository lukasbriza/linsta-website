import styles from '../../styles/modules/Layout.module.scss'

import { FC, useEffect } from 'react'

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
        pageClass,
        scrollTopBeforeUnload = true
    } = props

    useEffect(() => {
        const scrollTotop = () => { window.scrollTo(0, 0) }

        !scrollTopBeforeUnload && window.removeEventListener('beforeunload', scrollTotop)
        scrollTopBeforeUnload && window.addEventListener('beforeunload', scrollTotop)
        return () => {
            window.removeEventListener('beforeunload', scrollTotop)
        }
    }, [scrollTopBeforeUnload])

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