import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Layout } from '../components/Layout/Layout';

export default {
    title: 'Components/Layout',
    component: Layout,
    argTypes: {

    }
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => (<Layout {...args} />);

export const Default = Template.bind({})