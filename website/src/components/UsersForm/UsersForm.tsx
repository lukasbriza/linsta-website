import styles from '../../styles/pages/Protected.module.scss'

import React, { FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Typography, HelperText, FilledTextFieldHF } from '@lukasbriza/lbui-lib'
import { useTranslation } from 'next-i18next'
import { formValidationSchema } from './UsersForm.validation'
import { saveUser } from '@fetchers'

type UsersInputs = {
    name: string;
    password: string;
    permission: "ADMIN" | "USER"
}

type StandardInputProps = { property: keyof Pick<UsersInputs, "name" | "password">, label: string }


export const AddUserForm: FC = () => {
    const { t } = useTranslation()

    const { register, control, handleSubmit, formState: { errors } } = useForm<UsersInputs>({
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
                className={styles[property]}
                text={""}
                errorText={errors[property]?.message}
                errorClass={styles.helperError}
                error={errors[property] && true}
            >
                <FilledTextFieldHF
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

    const onSubmit: SubmitHandler<UsersInputs> = async (data) => {
        const saveUserresponse = await saveUser(data)

        //HAPPY DAY SCENARIO
        if (saveUserresponse.sucess === true && saveUserresponse.data === true) {
            //SUCESS MODAL
            console.log(saveUserresponse)
            return
        }

        //ERROR MODAL
        console.log(saveUserresponse)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography type="h4" size="medium">Přidat referenci</Typography>
            <StandardInput property={"name"} label={"Přihlašovací jméno"} />
            <StandardInput property={"password"} label={"Heslo"} />
            <select {...register("permission")}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
            </select>
            <input type="submit" value={"Odeslat"} className={styles.submit} />
        </form>
    )
}