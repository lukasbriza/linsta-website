import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MechanizationCard } from '@components'


export default {
    title: 'Components/MechanizationCard',
    component: MechanizationCard,
} as ComponentMeta<typeof MechanizationCard>;

const Template: ComponentStory<typeof MechanizationCard> = (args) => (<MechanizationCard {...args} />);

export const Default = Template.bind({})
Default.args = {
    name: "name",
    src: "/",
    label: "tsy",
    capacity: "20t",
    price: 500,
}
