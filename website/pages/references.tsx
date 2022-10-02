import styles from '../src/styles/pages/References.module.scss'
import references from '@assets/referencesHeader.webp'

import type { NextPage } from 'next'
import { PictureHeader, ReferenceCard } from '@components'

import { data } from '../src/dummydata'

const References: NextPage = () => {
    return (
        <section className={styles.references}>
            <PictureHeader
                src={references}
                alt={"References page header"}
                text={"Reference"}
            />
            <section className={styles.referencesWrapper}>
                {data.map((item, index) => {
                    return (
                        <ReferenceCard
                            key={index}
                            {...item}
                        />
                    )
                })}
            </section>
        </section>
    )
}

export default References