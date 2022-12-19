import React, { FC, useState, createContext, useMemo } from 'react'

type Logocontext = {
    animated: boolean;
    setAnimated: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultvalue: Logocontext = {
    animated: false,
    setAnimated: () => { }
}

export const LogoContext = createContext<Logocontext>(defaultvalue)
LogoContext.displayName = "LogoContext"
const LogoAnimationProvider = LogoContext.Provider

export const LogoAnimationHandler: FC<{ children: React.ReactNode }> = (props) => {
    const { children } = props
    const [animated, setAnimated] = useState<boolean>(defaultvalue.animated)

    const context = useMemo<Logocontext>(() => ({
        animated: animated,
        setAnimated: setAnimated
    }), [animated])

    return (
        <LogoAnimationProvider value={context}>
            {children}
        </LogoAnimationProvider>
    )
}
