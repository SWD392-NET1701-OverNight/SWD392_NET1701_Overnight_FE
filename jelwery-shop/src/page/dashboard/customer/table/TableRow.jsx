import TableAction from './TableAction'

function TableRow({ TABLE_BODY }) {
  return (
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
              <TableAction />
            </td>
          </tr>
        )
      })}
    </tbody>
  )
}

export default TableRow
