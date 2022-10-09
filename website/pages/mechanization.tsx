import styles from '../src/styles/pages/Mechanization.module.scss'

import type { NextPage } from 'next'
import { MechanizationCard } from '@components'
import { mechanizationData } from '../src/dummydata'


const Mechanization: NextPage = () => {
    return (
        <section className={styles.mechanization}>
            {mechanizationData.map((value, index) => {
                return (
                    <MechanizationCard
                        key={index}
                        src={value.src}
                        name={value.name}
                        indication={value.indication}
                        capacity={value.capacity}
                        price={value.price}
                    />
                )
            })}
        </section>
    )
}

export default Mechanization