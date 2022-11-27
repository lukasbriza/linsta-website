import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Cross } from '../components/Cross/Cross'


export default {
    title: 'Components/Cross',
    component: Cross,
} as ComponentMeta<typeof Cross>;

const Template: ComponentStory<typeof Cross> = (args) => (<Cross {...args} />);

export const Default = Template.bind({})
Default.args = {

}