import { Dialog } from '@material-tailwind/react'
function Modal({ triggerButton, open, handler, children }) {
  return (
    <>
      <button onClick={handler}>{triggerButton}</button>
      <Dialog open={open} handler={handler}>
        {children}
      </Dialog>
    </>
  )
}

export default Modal
