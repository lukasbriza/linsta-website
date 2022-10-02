import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Menu } from '../components';
import { routes } from '../config/routes'
import main from '../../public/assets/main.svg'
import services from '../../public/assets/services.svg'
import references from '../../public/assets/references.svg'
import mechanization from '../../public/assets/mechanization.svg'
import contact from '../../public/assets/contact.svg'

export default {
    title: 'Components/Menu',
    component: Menu,
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => (<Menu {...args} />);

export const Default = Template.bind({})
Default.args = {
    items: [
        { src: main, url: routes.home, name: "Hlavní stránka" },
        { src: services, url: routes.services, name: "Služby" },
        { src: references, url: routes.references, name: "Reference" },
        { src: mechanization, url: routes.mechanization, name: "Mechanizace" },
        { src: contact, url: routes.contact, name: "Kontakt" }
    ]
}