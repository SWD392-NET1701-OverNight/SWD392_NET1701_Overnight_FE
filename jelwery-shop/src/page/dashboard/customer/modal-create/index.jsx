import Modal from '../../../../component/ui/Modal'

function ModalCreateUser({ handler, open }) {
  return (
    <Modal handler={handler} open={open}>
      Create User
    </Modal>
  )
}

export default ModalCreateUser
