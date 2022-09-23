import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Menu } from '../components/Menu/Menu';

import main from '../assets/main.svg'
import services from '../assets/services.svg'
import references from '../assets/references.svg'
import mechanization from '../assets/mechanization.svg'
import contact from '../assets/contact.svg'

export default {
    title: 'Components/Menu',
    component: Menu,
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => (<Menu {...args} />);

export const Default = Template.bind({})
Default.args = {
    items: [
        { src: main, url: "someurl", name: "Hlavní stránka" },
        { src: services, url: "someurl", name: "Služby" },
        { src: references, url: "someurl", name: "Reference" },
        { src: mechanization, url: "someurl", name: "Mechanizace" },
        { src: contact, url: "someurl", name: "Kontakt" }
    ]
}