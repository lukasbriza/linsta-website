import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SwiperWrapper } from '@components'
import '../styles/modules/SwiperGlobal.scss'
import 'swiper/css';
import 'swiper/css/pagination';

export default {
    title: 'Components/SwiperWrapper',
    component: SwiperWrapper,
} as ComponentMeta<typeof SwiperWrapper>;

const Template: ComponentStory<typeof SwiperWrapper> = (args) => (
    <section style={{ position: 'absolute', left: '0px', top: '0px', width: '100%', height: '100%' }}>
        <SwiperWrapper {...args} />
    </section>
);

export const Default = Template.bind({})
Default.args = {
    src: ["id1", "id2"],
    description: "Description"
}
