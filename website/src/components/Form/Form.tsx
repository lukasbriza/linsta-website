
import styles from '../../styles/modules/Form.module.scss'

import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FilledTextFieldHF, HelperText, CheckboxSquaredHF } from '@lukasbriza/lbui-lib'
import { FormProps, FormInputs } from './Form.model'
import { formValidationSchema } from './Form.validation'
import { routes } from '../../config/routes'
import clsx from 'clsx'


export const Form: FC<FormProps> = () => {
    const { t } = useTranslation()
    const { register, control, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        defaultValues: {
            name: "",
            surname: "",
            email: "",
            company: undefined,
            message: "",
            gdpr: false
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: formValidationSchema(t)
    })

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log(data)
    }


    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <HelperText
                className={styles.name}
                text={""}
                errorText={errors.name?.message}
                errorClass={styles.helperError}
                error={errors.name && true}
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
                    name={"name"}
                    label={t('pages.contact.form.name')}
                />
            </HelperText>
            <HelperText
                className={styles.surname}
                text={""}
                errorText={errors.surname?.message}
                errorClass={styles.helperError}
                error={errors.surname && true}
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
                    name={"surname"}
                    label={t('pages.contact.form.surname')} />
            </HelperText>
            <HelperText
                className={styles.email}
                text={""}
                errorText={errors.email?.message}
                errorClass={styles.helperError}
                error={errors.email && true}
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
                    name={"email"}
                    label={t('pages.contact.form.email')} />
            </HelperText>
            <HelperText
                className={styles.company}
                text={""}
                errorText={errors.company?.message}
                errorClass={styles.helperError}
                error={errors.company && true}
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
                    name={"company"}
                    label={t('pages.contact.form.company')} />
            </HelperText>

            <HelperText
                className={styles.messageWrapperError}
                text={""}
                errorText={errors.message?.message}
                errorClass={styles.helperError}
                error={errors.message && true}
            >
                <div className={clsx([styles.messageWrapper, errors.message && styles.errorMessageWrappper])}>
                    <textarea className={styles.message} {...register("message")} placeholder={t('pages.contact.form.message')} maxLength={500} />
                    <p></p>
                </div>
            </HelperText>
            <HelperText
                className={styles.gdpr}
                text={""}
                errorText={errors.gdpr?.message}
                errorClass={clsx([styles.helperError, styles.helperErrorCheckbox])}
                error={errors.gdpr && true}
            >
                <CheckboxSquaredHF
                    control={control}
                    name={"gdpr"}
                    label={<div>{t('pages.contact.form.gdpr')}<Link href={routes.gdpr}>GDPR</Link></div>}
                    labelClass={styles.gdprLabel}
                    checkboxClass={styles.gdprCheckbox}
                    checkerClass={styles.gdprChecker}
                />
            </HelperText>
            <input type="submit" value={t('pages.contact.form.submit')} className={styles.submit} />
        </form>
    )
}