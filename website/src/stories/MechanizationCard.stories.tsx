import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MechanizationCard } from '@components'
import { mechanizationData } from '../dummydata'

export default {
    title: 'Components/MechanizationCard',
    component: MechanizationCard,
} as ComponentMeta<typeof MechanizationCard>;

const Template: ComponentStory<typeof MechanizationCard> = (args) => (<MechanizationCard {...args} />);

export const Default = Template.bind({})
Default.args = {
    name: mechanizationData[0].name,
    src: mechanizationData[0].src,
    indication: mechanizationData[0].indication,
    capacity: mechanizationData[0].capacity,
    price: mechanizationData[0].price,
}
