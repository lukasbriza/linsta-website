import styles from '../src/styles/pages/Mechanization.module.scss'

import type { NextPage } from 'next'
import { MechanizationCard } from '@components'
import { Typography, Underliner } from '@lukasbriza/lbui-lib'
import { mechanizationData } from '../src/dummydata'


const Mechanization: NextPage = () => {
    return (
        <section className={styles.mechanization}>
            <Underliner underlinerClass={styles.underliner} className={styles.typography}>
                <Typography
                    type="h4"
                    size="small"
                    variant={["bold"]}
                    className={styles.header}
                >
                    Nákladní autodoprava
                </Typography>
            </Underliner>
            <div className={styles.cardSection}>
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
            </div>
            <Underliner underlinerClass={styles.underliner} className={styles.typography}>
                <Typography
                    type="h4"
                    size="small"
                    variant={["bold"]}
                    className={styles.header}
                >Stavební stroje</Typography>
            </Underliner>
            <div className={styles.cardSection}>
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
            </div>
            <Underliner underlinerClass={styles.underliner} className={styles.typography}>
                <Typography
                    type="h4"
                    size="small"
                    variant={["bold"]}
                    className={styles.header}
                >Drobná mechanizace</Typography>
            </Underliner>
            <div className={styles.cardSection}>
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
            </div>
        </section>
    )
}

export default Mechanization