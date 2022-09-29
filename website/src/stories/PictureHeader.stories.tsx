import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PictureHeader } from '../components'
import service from '../assets/serviceHeader.webp'

export default {
    title: 'Components/PictureHeader',
    component: PictureHeader,
} as ComponentMeta<typeof PictureHeader>;

const Template: ComponentStory<typeof PictureHeader> = (args) => (<PictureHeader {...args} />);

export const Default = Template.bind({})
Default.args = {
    src: service,
    alt: "Service header",
    text: "Služby"
}