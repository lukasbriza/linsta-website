import { createContext, useCallback, useMemo, useState } from "react"
import { SwiperWrapper } from "./SwiperWrapper"

type ShowData = { src: Promise<string>[], description: string }
type ContextProps = {
    show?: (data: ShowData) => void
}

export const SwiperContext = createContext<ContextProps>({})

export const SwiperProvider = ({ children }: { children: React.ReactNode }) => {
    const [swiperSources, setSwiperSources] = useState<Promise<string>[] | undefined>(undefined)
    const [swiperDescription, setSwiperDescription] = useState<string | undefined>(undefined)

    const show = useCallback((props: ShowData) => {
        setSwiperSources(props.src)
        setSwiperDescription(props.description)
    }, [])

    const cancel = () => {
        setSwiperSources(undefined)
        setSwiperDescription(undefined)
    }

    const contextValue: ContextProps = useMemo(() => ({ show }), [show])

    return (
        <SwiperContext.Provider value={contextValue}>
            <>
                {children}
                {
                    swiperSources && swiperDescription ?
                        <SwiperWrapper
                            src={swiperSources}
                            description={swiperDescription}
                            onCancel={cancel}
                        /> : null
                }
            </>
        </SwiperContext.Provider>
    )
}

SwiperContext.displayName = "SwiperContext"