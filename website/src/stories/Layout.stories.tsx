import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Layout, Menu, Header, Footer } from '../components';
import { headerConfig } from '../config/headerConfig'
import { menuConfig } from '../config/menuConfig';

export default {
    title: 'Components/Layout',
    component: Layout,
    argTypes: {

    }
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => (<Layout {...args} />);

export const Default = Template.bind({})
Default.args = {
    menu: <Menu items={menuConfig.items} />,
    header: <Header leftItems={headerConfig.leftItems} rightItems={headerConfig.rightItems} />,
    footer: <Footer />
}