import styles from '../../styles/modules/UpdateReferencesSection.module.scss'

import { FC, useEffect, useState } from 'react'
import { getReference } from '@fetchers'
import { ReferenceObjectExt } from '@utils'
import { ReferenceUpdateUnit } from './ReferenceUpdateUnit'

export const UpdateReferencesSection: FC = () => {
    const [references, setReferences] = useState<ReferenceObjectExt[] | []>([])

    useEffect(() => {
        const response = fetch()
        response.then(data => setReferences(data))
    }, [])

    const getActualList = async () => {
        const response = await fetch()
        setReferences(response)
    }

    return (
        <section className={styles.updateWrapper}>
            {references.map((data, index) => {
                return (<ReferenceUpdateUnit getActualList={getActualList} data={data} setReferences={setReferences} key={index} />)
            })}
        </section>
    )
}

const fetch = async () => {
    const response = await getReference()
    const { data, sucess } = response
    if (sucess && Array.isArray(data)) {
        return data
    }
    return []
}