import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Table({ TABLE_BODY, TABLE_HEAD }) {
  return (
    <table className="mt-8 w-full table-auto">
      <thead className="border-y border-third ">
        <tr>
          {TABLE_HEAD.map((head, index) => (
            <th key={index} className="py-2 text-lg font-normal text-secondary">
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-center">
        {TABLE_BODY.map((row, index) => {
          const col = Object.values(row)
          const styleName = 'py-3 text-base text-third'
          return (
            <tr key={index}>
              {col.map((value, index) => (
                <td key={index} className={styleName}>
                  {value}
                </td>
              ))}
              <td className={styleName}>{<FontAwesomeIcon icon={faEllipsis} />}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
