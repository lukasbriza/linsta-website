import { createContext, FC, useMemo, useState } from "react";

type Transitioncontext = {
    transitioning: boolean;
    setTransitioning: React.Dispatch<React.SetStateAction<boolean>>
}
type TransitionHandlerProps = {
    children: React.ReactNode | React.ReactNode[]
}

const defaultValue: Transitioncontext = {
    transitioning: false,
    setTransitioning: () => { }
}

export const TransitionContext = createContext<Transitioncontext>(defaultValue)
TransitionContext.displayName = "TransitionContextHandler"
const TransitionContextHandler = TransitionContext.Provider


export const TransitionHandler: FC<TransitionHandlerProps> = (props) => {
    const { children } = props
    const [transitioning, setTransitioning] = useState<boolean>(false)

    const context = useMemo<Transitioncontext>(() => ({
        transitioning: transitioning,
        setTransitioning: setTransitioning
    }), [transitioning])

    return (
        <TransitionContextHandler value={context}>
            {children}
        </TransitionContextHandler>
    )
}