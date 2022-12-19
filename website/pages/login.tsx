import type { NextPage } from 'next'
import { useContext, useEffect, useRef } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FilledTextFieldHF, HelperText } from '@lukasbriza/lbui-lib'
import { joiResolver } from '@hookform/resolvers/joi';
import { TFunction } from 'next-i18next';
import jwt from 'jsonwebtoken'
import Joi from 'joi';
import { authenticate, loginRequest } from '@fetchers'
import { siteMetaData } from '../src/config/siteMetadata';
import { useState, } from 'react'
import { DynamicHead, Eye } from '@components';
import { useModal, useRedirect } from '@hooks'
import { useRouter } from 'next/router';
import { routes } from '../src/config/routes'
import { StylesContext } from './_app';

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

type FormInputs = {
    username: string
    password: string
}

const requiredUsernameValidtion = (t: TFunction) => {
    return Joi.string()
        .ruleset.max(50)
        .min(1)
        .rule({ message: t("pages.login.validations.max50") })
        .ruleset.alphanum()
        .rule({ message: t("pages.login.validations.specialCharacters") })
        .required()
        .messages({ "string.empty": t("pages.login.validations.required") });
};

const requredPasswordValidation = (t: TFunction) => {
    return Joi.string()
        .ruleset.max(50)
        .rule({ message: t("pages.login.validations.max50") })
        .ruleset
        .min(4)
        .rule({ message: t("pages.login.validations.min8") })
        .ruleset.alphanum()
        .rule({ message: t("pages.login.validations.specialCharacters") })
        .required()
        .messages({ "string.empty": t("pages.login.validations.required") });
};

const schema = (t: TFunction) => {
    return Joi.object({
        username: requiredUsernameValidtion(t),
        password: requredPasswordValidation(t),
    });
};


const formValidationSchema = (t: TFunction) => {
    return joiResolver(schema(t));
};


const Login: NextPage = () => {
    const [hidePassword, setHidePassword] = useState<boolean>(true)
    const { t } = useTranslation()
    const styles = useContext(StylesContext).login
    const { control, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        defaultValues: {
            username: "",
            password: ""
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: formValidationSchema(t)
    })
    const render = useRef(false)
    const redirect = useRedirect()
    const router = useRouter()
    const paramError = router.query.error
    const { show } = useModal()

    useEffect(() => {
        if (render.current === false) {
            authenticate().then(value => {
                const { sucess, data } = value

                if (data !== null && typeof data !== "boolean") {
                    const { permission, _id } = data
                    sessionStorage.setItem('permission', permission ? permission : "");
                    sessionStorage.setItem('id', _id ? _id : "")
                    redirect({ path: '/protected' })
                } else {
                    //MODAL
                    show({ sucess: false, button: false, text: t('modal.login.invalidToken'), timeout: 2000 })
                }
            })
        }
        render.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (paramError === "true") {
            show({ sucess: false, button: false, text: t('modal.login.invalidToken'), timeout: 2000 })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramError])

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        const token = jwt.sign({ name: data.username, password: data.password }, process.env.NEXT_PUBLIC_JWT_REGISTRATION_KEY!)

        loginRequest({ token: token }).then((response) => {
            const { data } = response
            if (response.sucess === true && response.token !== null && data !== null) {
                sessionStorage.setItem('permission', data.permission ? data.permission : "");
                sessionStorage.setItem('id', data._id ? data._id : "")
                redirect({ path: '/protected' })
            }
            if (response.sucess === false) {
                console.error(response)
                show({ sucess: false, button: false, text: t('modal.login.invalidCredentials'), timeout: 2000 })
            }
        })
    }

    return (
        <>
            <DynamicHead
                title={t('head.login.title')}
                description={t('head.login.description')}
                canonicalUrl={siteMetaData.siteUrl + '/login'}
                ogType="website"
            />
            <section className={styles.login} data-route={routes.login}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <HelperText
                        className={styles.username}
                        text={""}
                        errorText={errors.username?.message}
                        errorClass={styles.helperError}
                        error={errors.username && true}
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
                            name={"username"}
                            label={t('pages.login.username')}
                        />
                    </HelperText>
                    <HelperText
                        className={styles.password}
                        text={""}
                        errorText={errors.password?.message}
                        errorClass={styles.helperError}
                        error={errors.password && true}
                    >
                        <>
                            <FilledTextFieldHF
                                password={hidePassword}
                                className={styles.input}
                                labelClass={styles.label}
                                labelFocusClass={styles.focusLabel}
                                labelFilledClass={styles.focusLabel}
                                lineFilledClass={styles.filledLine}
                                errorLineClass={styles.errorLine}
                                errorLabelClass={styles.errorLabel}
                                control={control}
                                name={"password"}
                                label={t('pages.login.password')}
                            />
                            <Eye showPassword={!hidePassword} onClick={() => setHidePassword(value => !value)} />
                        </>
                    </HelperText>
                    <input type="submit" value={t('pages.contact.form.submit')} className={styles.submit} />
                </form>
            </section>
        </>
    )
}

export default Login