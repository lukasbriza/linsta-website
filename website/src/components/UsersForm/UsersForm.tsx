import styles from '../../styles/pages/Protected.module.scss'
import users from '@assets/usersHeader.webp'

import React, { FC } from 'react'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { HelperText, FilledTextFieldHF } from '@lukasbriza/lbui-lib'
import { useTranslation } from 'next-i18next'
import { formValidationSchema } from './UsersForm.validation'
import { saveUser } from '@fetchers'
import { PictureHeader } from '@components'
import clsx from 'clsx'
import { useModal } from '@hooks'

type UsersInputs = {
    name: string;
    password: string;
    permission: "ADMIN" | "USER"
}

type StandardInputProps = { property: keyof Pick<UsersInputs, "name" | "password">, label: string }


export const AddUserForm: FC = () => {
    const { t } = useTranslation()
    const { show } = useModal()
    const { reset, register, control, handleSubmit, formState: { errors } } = useForm<UsersInputs>({
        defaultValues: {
            name: "",
            password: "",
            permission: "USER",

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
                    className={styles.input}
                    rootClass={styles.root}
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

    const onSubmit: SubmitHandler<UsersInputs> = async (data) => {
        const saveUserresponse = await saveUser(data)

        //HAPPY DAY SCENARIO
        if (saveUserresponse.sucess === true && saveUserresponse.data === true) {
            //SUCESS MODAL
            console.log(saveUserresponse)
            show({ sucess: true, text: t('modal.userForm.sucess'), button: false })
            //RESET FORM
            reset()
            return
        }

        //ERROR MODAL
        console.log(saveUserresponse)
        show({ sucess: false, text: t('modal.userForm.failure'), button: false })
    }
    const onInvalid: SubmitErrorHandler<UsersInputs> = (data) => {
        //MODAL
        console.log(data)
        show({ sucess: false, text: t('modal.userForm.invalid'), button: false })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className={clsx([styles.form, styles.userForm])}>
            <PictureHeader text={"Přidat uživatele"} src={users} className={styles.pictureHeader} />
            <StandardInput property={"name"} label={"Přihlašovací jméno"} />
            <StandardInput property={"password"} label={"Heslo"} />
            <div className={styles.select} >
                <select {...register("permission")} className={styles.customSelect}>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
            </div>
            <input type="submit" value={"Odeslat"} className={styles.submit} />
        </form>
    )
}