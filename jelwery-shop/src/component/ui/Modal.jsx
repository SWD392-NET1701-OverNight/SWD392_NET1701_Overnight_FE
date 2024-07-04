import { Dialog } from '@material-tailwind/react'
function Modal({ open, handler, children }) {
  return (
    <Dialog open={open} handler={handler}>
      {children}
    </Dialog>
  )
}

export default Modal
