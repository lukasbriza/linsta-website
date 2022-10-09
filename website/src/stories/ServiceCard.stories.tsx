import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ServiceCard } from '@components'
import img from '@assets/buildingCommunications.webp'


export default {
    title: 'Components/ServiceCard',
    component: ServiceCard,
} as ComponentMeta<typeof ServiceCard>;

const Template: ComponentStory<typeof ServiceCard> = (args) => (<ServiceCard {...args} />);

export const Default = Template.bind({})
Default.args = {
    src: img,
    text: "Some text"
}