import { FC, useState, createContext, useMemo } from 'react'
import { Modal } from './Modal'
import { Modalcontext, ModalHandlerProps, ModalProps } from './Modal.model'

const defaultValue: Modalcontext = {
    show: () => { throw new Error('Context does not have a matching provider!') },
    close: () => { throw new Error('Context does not have a matching provider!') }
}
export const ModalContext = createContext<Modalcontext>(defaultValue)
ModalContext.displayName = "ModalHandler"
const ModalProvider = ModalContext.Provider


export const ModalHandler: FC<ModalHandlerProps> = (props) => {
    const { children } = props
    const [modalProps, setModalProps] = useState<ModalProps | undefined>()

    const context = useMemo<Modalcontext>(() => ({
        show: (modalDef) => { setModalProps(modalDef) },
        close: () => { setModalProps(undefined) }
    }), [])

    return (
        <ModalProvider value={context}>
            {children}
            {modalProps && <Modal {...modalProps} />}
        </ModalProvider>
    )
}