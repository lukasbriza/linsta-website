import '../../styles/modules/Layout.module.scss'

import Rect, { FC } from 'react'
import { Menu } from '../Menu/Menu'
import { Footer } from '../Footer/Footer'

import { LayoutProps } from './Layout.model'

export const Layout: FC<LayoutProps> = (props) => {
    const { children } = props
    return (
        <section id="layout">
            <section id="headerWrapper">
                Header
            </section>
            <section id="menuWrapper">
                Menu
            </section>
            <section id="pageContent">
                Children
            </section>
            <section id="footerWrapper">
                Footer
            </section>
        </section>)
}