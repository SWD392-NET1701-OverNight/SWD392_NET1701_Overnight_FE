function FilterProductList({ listProduct, setFilterProduct }) {
  function handleSearchProduct(e) {
    const searchValue = e.target.value
    const filterProducts = listProduct?.filter(({ productName }) =>
      productName.includes(searchValue),
    )
    if (filterProducts.length > 0) {
      setFilterProduct(filterProducts)
      return
    }

    setFilterProduct(filterProducts)
  }
  return (
    <>
      <input
        type="text"
        className="input"
        placeholder="Search by Name"
        onChange={handleSearchProduct}
      />
    </>
  )
}

export default FilterProductList
