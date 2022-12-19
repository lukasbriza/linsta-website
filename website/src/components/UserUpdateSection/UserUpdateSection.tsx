import styles from '../../styles/modules/UserUpdateSection.module.scss'

import { FC, useEffect, useState } from 'react'
import { getUsers } from '@fetchers'
import { ReturnUserObject } from '../../abl/Users/_models'
import { UserUpdateUnit } from './UserUpdateUnit'


export const UserUpdateSection: FC = () => {
    const [users, setUsers] = useState<ReturnUserObject[] | []>([])

    useEffect(() => {
        const response = fetch()
        response.then(data => { setUsers(data) })
    }, [])

    const getActualList = async () => {
        const response = await fetch()
        setUsers(response)
    }

    return (
        <section className={styles.updateWrapper}>
            {users.map((data, index) => {
                return (<UserUpdateUnit getActualList={getActualList} data={data} setUsers={setUsers} key={index} />)
            })}
        </section>
    )
}

const fetch = async () => {
    const response = await getUsers()
    const { data, sucess } = response
    if (sucess && Array.isArray(data)) {
        return data
    }
    return []
}