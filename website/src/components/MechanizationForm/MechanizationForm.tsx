import styles from '../../styles/pages/Protected.module.scss'
import mechanization from '@assets/mechanizationHeader.webp'

import React, { FC } from 'react'
import clsx from 'clsx'
import { useForm, SubmitHandler } from 'react-hook-form'
import { HelperText, FilledTextFieldHF } from '@lukasbriza/lbui-lib'
import { PictureHeader } from '@components'
import { useTranslation } from 'next-i18next'
import { formValidationSchema } from './MechanizationForm.validation'
import { saveImg, saveMechanization } from '@fetchers'


type MechanizationInputs = {
    name: string;
    label: string;
    capacity: string;
    price: number;
    order: number;
    type: "M" | "SM" | "C"
    file: FileList;
}

type StandardInputProps = {
    property: keyof Pick<MechanizationInputs, "capacity" | "label" | "name" | "price" | "order">;
    label: string;
}

export const AddMechanizationForm: FC = () => {
    const { t } = useTranslation()

    const { register, control, handleSubmit, formState: { errors } } = useForm<MechanizationInputs>({
        defaultValues: {
            name: "",
            label: "",
            capacity: "",
            price: undefined,
            order: undefined,
            type: "M",
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

    const onSubmit: SubmitHandler<MechanizationInputs> = async (inputData) => {
        const saveImageResponse = await saveImg({ file: inputData.file[0] })
        const { data, sucess } = saveImageResponse
        console.log({ sucess, data })

        if (!sucess || data === null) {
            return
        }

        const { file, ...restData } = inputData
        const postObject = { pictures: data.id, ...restData }
        const saveMechanizationResponse = await saveMechanization(postObject)

        //HAPPY DAY SCENARIO
        if (saveMechanizationResponse.sucess === true && saveMechanizationResponse.data !== null) {
            //SUCESS MODAL
            console.log(saveMechanizationResponse)
            return
        }

        //ERROR MODAL
        console.log(saveMechanizationResponse)
    }

    const onInvalid = (data: any) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className={styles.form}>
            <PictureHeader text={"Přidat mechanizaci"} src={mechanization} className={styles.pictureHeader} />
            <StandardInput property={"name"} label={"Jméno stroje"} />
            <StandardInput property={"label"} label={"Označení stroje"} />
            <StandardInput property={"capacity"} label={"Nosnost stroje"} />
            <StandardInput property={"price"} label={"Cena za den"} />
            <StandardInput property={"order"} label={"Pořadí"} />
            <HelperText
                className={styles.type}
                helperClass={styles.helperClass}
                text={"Vyberte typ stroje"}
                errorText={errors.type?.message}
                errorClass={styles.helperError}
                error={errors.type && true}
            >
                <div className={styles.select}>
                    <select {...register("type")} className={styles.customSelect}>
                        <option value="M">Stavební stroje</option>
                        <option value="SM">Drobná mechanizace</option>
                        <option value="C">Autodoprava</option>
                    </select>
                </div>
            </HelperText>
            <HelperText
                className={styles.file}
                helperClass={styles.helperClass}
                text={"Vyberte svg obrázek stroje"}
                errorText={errors.file?.message}
                errorClass={styles.helperError}
                error={errors.file && true}
            >
                <input type="file" {...register("file")} className={styles.fileInput} />
            </HelperText>
            <input type="submit" value={"Odeslat"} className={styles.submit} />
        </form>
    )
}