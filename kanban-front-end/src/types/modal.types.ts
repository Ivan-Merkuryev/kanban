export interface IModal {
    message: string
    err: boolean
    btn_message: string
    action?: () => void
    active: boolean
    setActive?: () => void 
}