import styles from '../../styles/pages/Protected.module.scss'
import references from '@assets/referencesHeader.webp'

import React, { FC } from 'react'
import clsx from 'clsx'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Typography, HelperText, FilledTextFieldHF } from '@lukasbriza/lbui-lib'
import { useTranslation } from 'next-i18next'
import { formValidationSchema } from './ReferencesForm.validation'
import { saveImg, removeImg, saveReference } from '@fetchers'
import { PictureHeader } from '@components'

type ReferencesInputs = {
    name: string;
    place: string;
    realization: string;
    detail: string;
    file: FileList
}

type StandardInputProps = { property: keyof Pick<ReferencesInputs, "name" | "place" | "realization" | "detail">, label: string }


export const AddReferencesForm: FC = () => {
    const { t } = useTranslation()

    const { reset, register, control, handleSubmit, formState: { errors } } = useForm<ReferencesInputs>({
        defaultValues: {
            name: "",
            place: "",
            realization: "",
            detail: "",
            file: undefined
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

    const onSubmit: SubmitHandler<ReferencesInputs> = async (data) => {
        const { file, ...restData } = data
        let loopedThrough = true
        const arrayOfPicturesIds: string[] = []

        const clearArray = (ids: string[]) => {
            const promises = ids.map((id) => {
                return removeImg(id)
            })
            Promise.all(promises).then(value => console.log(value))
        }
        //ITERATE OVER LIST
        for (let i = 0; i < file.length; i++) {
            if (loopedThrough) {
                const actualFile = file.item(i)
                const response = actualFile && await saveImg({ file: actualFile })
                console.log()
                if (response && response.sucess === false) {
                    loopedThrough = false
                    clearArray(arrayOfPicturesIds)
                    return
                }
                response && response.data && arrayOfPicturesIds.push(response.data.id)
            }
        }
        //SAVE REFERENCE
        if (loopedThrough) {
            const saveReferenceResponse = await saveReference({ ...restData, pictures: arrayOfPicturesIds })
            //HAPPY DAY SCENARIO
            if (saveReferenceResponse.sucess === true && saveReferenceResponse.data !== null) {
                //SUCESS MODAL
                console.log(saveReferenceResponse)

                //RESET FORM
                reset()
                return
            }
            //ERROR MODAL
            console.log(saveReferenceResponse)
        }
        //ERROR MODAL
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={clsx([styles.form, styles.form2])}>
            <PictureHeader text={"Přidat referenci"} src={references} className={styles.pictureHeader} />
            <StandardInput property={"name"} label={"Jméno realizace"} />
            <StandardInput property={"place"} label={"Místo realizace"} />
            <StandardInput property={"realization"} label={"Datum realizace"} />
            <HelperText
                className={styles.detail}
                text={""}
                errorText={errors.detail?.message}
                errorClass={styles.helperError}
                error={errors.detail && true}
            >
                <textarea {...register("detail")} className={styles.detailArea} placeholder={"Detail"}></textarea>
            </HelperText>
            <HelperText
                className={styles.file}
                helperClass={styles.helperClass}
                text={"Při výběru více souborů držte CTRL."}
                errorText={errors.file?.message}
                errorClass={styles.helperError}
                error={errors.file && true}
            >
                <input type="file" {...register("file")} multiple={true} className={styles.fileInput} />
            </HelperText>
            <input type="submit" value={"Odeslat"} className={styles.submit} />
        </form>
    )
}