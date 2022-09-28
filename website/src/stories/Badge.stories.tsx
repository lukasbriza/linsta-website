import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Badge } from '../components'
import { badgeConfig } from '../config/badgeConfig'

export default {
    title: 'Components/Badge',
    component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => (<Badge {...args} />);

export const Default = Template.bind({})
Default.args = {
    icon: badgeConfig[0].icon,
    text: badgeConfig[0].text
}