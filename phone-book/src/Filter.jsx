

const Filter = ({ filterState, filterFunction }) => {
    return (
        <div>
            Filter by name: <input type="text" onChange={filterFunction} value={filterState} />
        </div>
    )

}
export default Filter;