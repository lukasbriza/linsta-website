import styles from '../src/styles/pages/Services.module.scss'
import services from '@assets/serviceHeader.webp'

import { PictureHeader, ServiceCard } from '@components'
import { Typography } from '@lukasbriza/lbui-lib'

import type { NextPage } from 'next'


const Services: NextPage = () => {
    return (
        <section className={styles.services}>
            <PictureHeader
                src={services}
                alt={"Services page header"}
                text={"Služby"}
            />
            <Typography type="body1" className={styles.servicesText}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Aliquam erat volutpat. Cras elementum. Maecenas ipsum velit, consectetuer eu lobortis ut,
                dictum at dui. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam erat volutpat.
                Cras elementum. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui.
            </Typography>
            <section className={styles.servicesWrapper}>
                <ServiceCard className={styles.demolition} src={'assets/demolition.webp'} text={"ZEMNÍ PRÁCE a DEMOLICE"} />
                <ServiceCard className={styles.communications} src={'assets/buildingCommunications.webp'} text={"VÝSTAVBA KOMUNIKACÍ"} />
                <ServiceCard className={styles.canalizations} src={'assets/sewersConstruction.webp'} text={"VÝSTAVBA VODOVODNÍCH KANALIZACÍ"} />
                <ServiceCard className={styles.transposrtation} src={'assets/transport.webp'} text={"NÁKLADNÍ AUTODOPRAVA"} />
                <ServiceCard className={styles.carrent} src={'assets/machineRent.webp'} text={"PRONÁJEM STAVEBÍCH STROJŮ"} />
            </section>
        </section>
    )
}

export default Services