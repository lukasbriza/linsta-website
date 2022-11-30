import styles from '../../styles/modules/UpdateReferencesSection.module.scss'

import { FC, useState } from "react"
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { FilledTextFieldHF, HelperText } from '@lukasbriza/lbui-lib'
import clsx from 'clsx'
import { formValidationSchema } from './UpdateReferences.validation'
import { EditSectionInputs, EditSectionProps, ReadOnlySectionProps, ReferenceUpdateUnitProps, StandardInputProps } from './UpdateReferencesSection.model'
import { removeReference, updateReference } from '@fetchers'

export const ReferenceUpdateUnit: FC<ReferenceUpdateUnitProps> = (props) => {
    const { data, setReferences, getActualList, ...rest } = props
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
                        setReferences={setReferences}
                        setEditing={setEditing}
                        data={data}
                    />
            }
        </div>
    )
}

const ReadOnlySection: FC<ReadOnlySectionProps> = (props) => {
    const { setEditing, setReferences, data, ...rest } = props

    const handleRemove = async () => {
        const response = await removeReference(data._id)
        if (response.sucess) {
            setReferences((value) => {
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

    return (
        <div className={styles.readOnly} {...rest}>
            <div className={styles.infoWrapper}>
                <div>Název realizace</div>
                <div>{data.name}</div>
            </div>
            <div className={styles.infoWrapper}>
                <div>Místo realizace</div>
                <div>{data.place}</div>
            </div>
            <div className={styles.infoWrapper}>
                <div>Doba realizace</div>
                <div>{data.realization}</div>
            </div>
            <div className={styles.infoWrapper}>
                <div>Detail realizace</div>
                <div>{data.detail}</div>
            </div>
            <div className={styles.buttonWrapper}>
                <button className={styles.button} onClick={() => setEditing(true)}>Edit</button>
                <button className={styles.button} onClick={handleRemove}>X</button>
            </div>
        </div>
    )
}
const EditSection: FC<EditSectionProps> = (props) => {
    const { t } = useTranslation()

    const { name, place, realization, detail, _id } = props.data
    const { setEditing, getActualList } = props
    const { control, register, handleSubmit, formState: { errors } } = useForm<EditSectionInputs>({
        defaultValues: {
            name: name,
            place: place,
            realization: realization,
            detail: detail,
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
        const referenceObject = {
            ...data,
            id: _id,
        }

        const response = await updateReference(referenceObject)

        //HAPPY DAY SCENARIO
        if (response.sucess === true && response.data !== null) {
            //SUCESS MODAL
            console.log(response)

            //TOGLE NON EDIT MODE
            setEditing(false)
            getActualList()
            return
        }

        //ERROR MODAL
        console.log(response)
    }
    const onInvalid: SubmitErrorHandler<EditSectionInputs> = (data) => {
        //MODAL
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(update, onInvalid)} className={styles.form}>
            <StandardInput property={"name"} label={"Název realizace"} />
            <StandardInput property={"place"} label={"Místo realizace"} />
            <StandardInput property={'realization'} label={"Datum realizace"} />
            <HelperText
                className={styles.helperText}
                text={""}
                errorText={errors.detail?.message}
                errorClass={styles.helperError}
                error={errors.detail && true}
            >
                <textarea {...register("detail")} className={styles.detail} />
            </HelperText>
            <div className={styles.submit}>
                <input type="submit" value={"Upravit"} />
                <input type="button" value={"Zrušit"} onClick={() => { setEditing(false) }} />
            </div>
        </form>
    )
}