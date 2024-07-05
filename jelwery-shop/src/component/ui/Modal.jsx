import { Dialog } from '@material-tailwind/react'
function Modal({ open, handler, children, ...props }) {
  return (
    <Dialog open={open} handler={handler} {...props}>
      {children}
    </Dialog>
  )
}

export default Modal
