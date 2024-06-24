import TableHeader from './TableHeader'
import TableRow from './TableRow'

function Table({ TABLE_BODY, TABLE_HEAD, tableActions }) {
  return (
    <table className="w-full">
      <TableHeader TABLE_HEAD={TABLE_HEAD} />
      <TableRow TABLE_BODY={TABLE_BODY} actions={tableActions} />
    </table>
  )
}

export default Table
