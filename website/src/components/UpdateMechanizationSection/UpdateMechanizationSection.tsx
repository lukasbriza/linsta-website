import styles from '../../styles/modules/UpdateMechanizationSection.module.scss'

import { FC, useEffect, useState } from 'react'
import { getMechanization } from '@fetchers'
import { MechanizationObjectExt } from '@utils'
import { MechanizationUpdateUnit } from './MechnazationUpdateUnit'

export const UpdateMechanizationSection: FC = () => {
    const [mechanizations, setMechanizations] = useState<MechanizationObjectExt[] | []>([])

    useEffect(() => {
        const response = fetch()
        response.then(data => {
            const sortedArray = sortMechanizations(data)
            setMechanizations(sortedArray)
        })
    }, [])

    const getActualList = async () => {
        const response = await fetch()
        const sortedArray = sortMechanizations(response)
        setMechanizations(sortedArray)
    }

    return (
        <section className={styles.updateWrapper}>
            {mechanizations.map((data, index) => {
                return (<MechanizationUpdateUnit getActualList={getActualList} data={data} setMechanizations={setMechanizations} key={index} />)
            })}
        </section>
    )
}

const fetch = async () => {
    const response = await getMechanization()
    const { data, sucess } = response
    if (sucess && Array.isArray(data)) {
        return data
    }
    return []
}

const sortMechanizations = (mechanizations: MechanizationObjectExt[] | []) => {
    if (mechanizations.length === 0) {
        return []
    }
    let cArray: MechanizationObjectExt[] = []
    let smArray: MechanizationObjectExt[] = []
    let mArray: MechanizationObjectExt[] = []
    mechanizations.forEach(unit => { unit.type === "C" ? cArray.push(unit) : null })
    mechanizations.forEach(unit => { unit.type === "SM" ? smArray.push(unit) : null })
    mechanizations.forEach(unit => { unit.type === "M" ? mArray.push(unit) : null })

    cArray.sort((first, second) => first.order - second.order)
    smArray.sort((first, second) => first.order - second.order)
    mArray.sort((first, second) => first.order - second.order)
    return cArray.concat(smArray, mArray)
}