import styles from '../src/styles/pages/Home.module.scss'

import type { NextPage } from 'next'
import Image from 'next/image'
import { badgeConfig } from '../src/config/badgeConfig'
import { Badge } from '@components'
import { Typography } from '@lukasbriza/lbui-lib'

import background from '@assets/home.webp'


const Home: NextPage = () => {
  return (
    <section className={styles.home}>
      <Image
        src={background}
        alt="Home image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className={styles.layer}>
        <section className={styles.hero}>
          <section className={styles.heroText}>
            <Typography
              type="h1"
              variant={["bold"]}
              size="small"
            >
              LINSTA stavební s.r.o.
            </Typography>
            <Typography
              type="subtitle1"
              size="medium"
            >
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam erat volutpat.
              Cras elementum. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui.
            </Typography>
          </section>
          <nav className={styles.badgeSection}>
            {badgeConfig.map((item, index) => {
              return (
                <Badge icon={item.icon} text={item.text} url={item.url} key={index} />
              )
            })}
          </nav>
        </section>
      </div>
    </section>
  )
}

export default Home
