import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'sonner'
import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import requestApi from '../../feature/request/requestApi'
import { useDispatch } from 'react-redux'
import { requestAction } from '../../feature/request/requestSlice'
const menuItems = ['Approve', 'Reject']
function Table({ TABLE_BODY, TABLE_HEAD }) {
  const dispatch = useDispatch()
  async function handleRequestStatus(id, status) {
    try {
      const resData = await requestApi.acceptRequest(id, status)
      if (resData) {
        dispatch(requestAction.updateStatus({ id, status }))
        setTimeout(() => {
          toast.success(resData.message || `${status} success`)
        }, 1000)
      }
    } catch (error) {
      toast.error(error.message || `${status} fail`)
    }
  }
  return (
    <table className="w-full">
      <thead className="border-y border-third ">
        <tr>
          {TABLE_HEAD.map((head, index) => (
            <th key={index} className="px-8 py-2 text-base font-normal text-secondary">
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="h-full text-center">
        {TABLE_BODY.map((row, index) => {
          const col = Object.values(row)
          const styleName = 'py-3 px-8 text-base text-third'
          return (
            <tr key={index}>
              {col.map((value, index) => (
                <td key={index} className={styleName}>
                  {value}
                </td>
              ))}
              <td className={styleName}>
                <Menu>
                  <MenuHandler>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </MenuHandler>
                  <MenuList>
                    {menuItems.map((item, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => {
                          handleRequestStatus(row.id, item)
                        }}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
