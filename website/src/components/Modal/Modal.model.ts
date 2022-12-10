export type ModalHandlerProps = {
  children: React.ReactNode;
};
export type ModalProps = {
  button?: boolean;
  text: string;
  sucess: boolean;
  closeText?: string;
  timeout?: number;
};
export type Modalcontext = {
  show: (modalDef: ModalProps) => void;
  close: () => void;
};
