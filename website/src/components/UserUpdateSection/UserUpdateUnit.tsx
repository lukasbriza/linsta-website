import styles from '../../styles/modules/UserUpdateSection.module.scss'

import { FC, useEffect, useState } from "react"
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { FilledTextFieldHF, HelperText } from '@lukasbriza/lbui-lib'
import clsx from 'clsx'
import { formValidationSchema } from './UserUpdateSection.validation'
import { EditSectionInputs, EditSectionProps, ReadOnlySectionProps, StandardInputProps, UserUpdateUnitProps } from './UserUpdateSection.model'
import { authenticate, removeUser, updateUser } from '@fetchers'
import { useModal } from '@hooks'

export const UserUpdateUnit: FC<UserUpdateUnitProps> = (props) => {
    const { data, setUsers, getActualList, ...rest } = props
    const [editing, setEditing] = useState<boolean>(false)

    return (
        <div {...rest}>
            {
                editing ?
                    <EditSection
                        getActualList={getActualList}
                        setEditing={setEditing}
                        data={data}
                    /> :
                    <ReadOnlySection
                        setUsers={setUsers}
                        setEditing={setEditing}
                        data={data}
                    />
            }
        </div>
    )
}

const ReadOnlySection: FC<ReadOnlySectionProps> = (props) => {
    const { t } = useTranslation()
    const { setEditing, setUsers, data, ...rest } = props
    const { show } = useModal()
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        const sessionPermission = sessionStorage.getItem('permission')
        const id = sessionStorage.getItem('id')
        if (data._id !== id && sessionPermission === 'USER') {
            setDisabled(true)
        }
    }, [data._id])

    const handleRemove = async () => {
        const auth = await authenticate()
        const isUser = auth.data !== null && typeof auth.data !== 'boolean' && auth.data.permission === 'USER'
        if (auth.sucess === false || isUser || auth.data === null) {
            //AUTH FAILED
            show({ sucess: false, text: t('modal.noPermission'), button: false })
            return
        }

        const response = await removeUser(data._id)
        if (response.sucess) {
            setUsers((value) => {
                const newArray = value.filter((unit) => {
                    if (unit._id !== data._id) {
                        return unit
                    }
                })
                return (
                    newArray
                )
            })
        }
    }

    const handleEdit = async () => {
        const auth = await authenticate()
        if (auth.sucess === false || auth.data === null || auth.data === false) {
            //AUTH FAILED
            show({ sucess: false, text: t('modal.failure'), button: false })
            return
        }

        const responseDataObject = auth.data
        if (responseDataObject !== true) {
            const { _id, permission } = responseDataObject
            //CAN EDIT ONLY OWNER OR ADMIN
            if (_id === data._id || permission === "ADMIN") {
                setEditing(true)
            } else {
                //AUTH FAILED
                show({ sucess: false, text: t('modal.noPermission'), button: false })
            }
        }
    }

    return (
        <div className={styles.readOnly} {...rest}>
            <div className={styles.infoWrapper}>
                <div>Uživatel</div>
                <div>{data.name}</div>
            </div>
            <div className={styles.infoWrapper}>
                <div>Role</div>
                <div>{data.permission}</div>
            </div>
            <div className={styles.buttonWrapper}>
                <button className={styles.button} onClick={handleEdit} disabled={disabled}>Edit</button>
                <button className={styles.button} onClick={handleRemove} disabled={disabled}>X</button>
            </div>
        </div>
    )
}

const EditSection: FC<EditSectionProps> = (props) => {
    const { t } = useTranslation()
    const { show } = useModal()
    const { name, permission, _id } = props.data
    const { setEditing, getActualList } = props
    const { control, register, handleSubmit, formState: { errors } } = useForm<EditSectionInputs>({
        defaultValues: {
            name: name,
            permission: permission,
            password: undefined,
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: formValidationSchema(t)
    })

    const StandardInput = (props: StandardInputProps) => {
        const { property, label } = props
        return (
            <HelperText
                className={clsx([styles[property]], styles.helperText)}
                text={""}
                errorText={errors[property]?.message}
                errorClass={styles.helperError}
                error={errors[property] && true}
            >
                <FilledTextFieldHF
                    rootClass={styles.root}
                    className={styles.input}
                    labelClass={styles.label}
                    labelFocusClass={styles.focusLabel}
                    labelFilledClass={styles.focusLabel}
                    lineFilledClass={styles.filledLine}
                    errorLineClass={styles.errorLine}
                    errorLabelClass={styles.errorLabel}
                    control={control}
                    name={String(property)}
                    label={label}
                />
            </HelperText>
        )
    }
    const update: SubmitHandler<EditSectionInputs> = async (data) => {
        const { password, _id, ...restData } = data
        const userObject = data.password ?
            {
                id: _id,
                password: password,
                ...restData
            } :
            {
                id: _id,
                ...restData
            }

        const response = await updateUser(userObject)


        //HAPPY DAY SCENARIO
        if (response.sucess === true && response.data !== null) {
            //SUCESS MODAL
            console.log(response)
            show({ sucess: true, text: t('modal.userUpdate.sucess'), button: false })
            //TOGLE NON EDIT MODE
            setEditing(false)
            getActualList()
            return
        }
        //ERROR MODAL
        console.log(response)
        show({ sucess: false, text: t('modal.userUpdate.failure'), button: false })

    }
    const onInvalid: SubmitErrorHandler<EditSectionInputs> = (data) => {
        //MODAL
        console.log(data)
        show({ sucess: false, text: t('modal.userUpdate.invalid'), button: false })
    }

    return (
        <form onSubmit={handleSubmit(update, onInvalid)} className={styles.form}>
            <StandardInput property={"name"} label={"Uživatelské jméno"} />
            <StandardInput property={'password'} label={"Nové heslo"} />
            <div className={styles.select} >
                <select {...register("permission")} className={styles.customSelect}>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
            </div>
            <div className={styles.submit}>
                <input type="submit" value={"Upravit"} />
                <input type="button" value={"Zrušit"} onClick={() => { setEditing(false) }} />
            </div>
        </form>
    )
}

