import React from 'react'
import Pagination from '../../../component/ui/Pagination'
import Table from '../../dashboard/order/table/index'



const TABLE_HEAD = ['TransactionID', 'RequestID', 'ProductID', 'Description', 'Amount', 'CreatedDate'];


function MyTransaction() {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, []);
    
    const fetchTransactions = async () => {
        try {
            const response = await axios.get('https://localhost:7147/api/Transaction/get-transaction-by-userID', {
                params: { UserID: 'US00005' }
            });
            const data = response.data.$values.map(({ transactionID, requestID, productID, description, amount, createdDate }) => ({
                transactionID,
                requestID,
                productID,
                description,
                amount,
                createdDate: new Date(createdDate).toLocaleDateString(),
            }));
            setTableData(data);
        } catch (error) {
            console.log('Error fetching transactions:', error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between px-8 py-3">
                <h2 className="p-link font-semibold">Orders</h2>
                <input
                    type="text"
                    placeholder={`Search orders`}
                    className="rounded-md border border-solid border-third px-4 py-2 outline-none"
                />
            </div>
            <div className="mt-4">
                <Table TABLE_HEAD={TABLE_HEAD} TABLE_BODY={tableData} tableActions={tableActions} />
            </div>

            <div className="absolute bottom-0 right-[50%] translate-x-1/2  pb-4">
                <Pagination
                    itemLength={tableData.length}
                    perPage={perPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    )
}

export default MyTransaction