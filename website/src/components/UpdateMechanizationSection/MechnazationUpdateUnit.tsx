import styles from '../../styles/modules/UpdateMechanizationSection.module.scss'

import { FC, useState } from "react"
import { EditSectionInputs, EditSectionProps, MechanizationUpdateUnitProps, ReadOnlySectionProps, StandardInputProps } from "./UpdateMechanizationSection.model"
import { removeMechanization, updateMechanization } from '@fetchers'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { FilledTextFieldHF, HelperText } from '@lukasbriza/lbui-lib'
import clsx from 'clsx'
import { formValidationSchema } from './UpdateMechanizationSection.validation'

export const MechanizationUpdateUnit: FC<MechanizationUpdateUnitProps> = (props) => {
    const { data, setMechanizations, getActualList, ...rest } = props
    const [editing, setEditing] = useState<boolean>(false)

    return (
        <div {...rest}>
            {
                editing ?
                    <EditSection
                        getActualList={getActualList}
                        data={data}
                        setEditing={setEditing}
                    /> :
                    <ReadOnlySection
                        setEditing={setEditing}
                        setMechanizations={setMechanizations}
                        data={data}
                    />
            }
        </div>
    )
}

const ReadOnlySection: FC<ReadOnlySectionProps> = (props) => {
    const { setEditing, setMechanizations, data, ...rest } = props

    const handleRemove = async () => {
        const response = await removeMechanization(data._id)
        if (response.sucess) {
            setMechanizations((value) => {
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
                <div>Jméno</div>
                <div>{data.name}</div>
            </div>
            <div className={styles.infoWrapper}>
                <div>Označení</div>
                <div>{data.label}</div>
            </div>
            <div className={styles.infoWrapper}>
                <div>Nosnost</div>
                <div>{data.capacity}</div>
            </div>
            <div className={styles.infoWrapper}>
                <div>Typ</div>
                <div>{data.type}</div>
            </div>
            <div className={styles.infoWrapper}>
                <div>Cena</div>
                <div>{data.price}</div>
            </div>
            <div className={styles.infoWrapper}>
                <div>Pořadí</div>
                <div>{data.order}</div>
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

    const { name, label, capacity, price, order, type, pictures, _id } = props.data
    const { setEditing, getActualList } = props
    const { control, register, handleSubmit, formState: { errors } } = useForm<EditSectionInputs>({
        defaultValues: {
            name: name,
            label: label,
            capacity: capacity,
            type: type,
            price: String(price),
            order: String(order)
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

    const update: SubmitHandler<EditSectionInputs> = async (data) => {
        const mechanizationObject = {
            ...data,
            id: _id,
            pictures: pictures,
            price: Number(data.price),
            order: Number(data.order)
        }

        const response = await updateMechanization(mechanizationObject)

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
            <StandardInput property={"name"} label={"Jméno stroje"} />
            <StandardInput property={"label"} label={"Označení stroje"} />
            <StandardInput property={"capacity"} label={"Nosnost stroje"} />
            <HelperText
                className={clsx([styles.type, styles.helperText])}
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
            <StandardInput property={"price"} label={"Cena za den"} />
            <StandardInput property={"order"} label={"Pořadí"} />
            <div className={styles.submit}>
                <input type="submit" value={"Upravit"} />
                <input type="button" value={"Zrušit"} onClick={() => { setEditing(false) }} />
            </div>

        </form>
    )
}