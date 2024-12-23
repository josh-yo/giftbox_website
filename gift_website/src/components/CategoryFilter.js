function CategoryFilter(){
    return (<>
        <div className="col-md-3">
          <div className="filter">
            <h5 style={{textAlign: 'center'}}>Category</h5>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>Category1</span>
                <span className="item-amount badge badge-primary badge-pill">14</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
              <span>Category2</span>
                <span className="item-amount badge badge-primary badge-pill">2</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>Category3</span>
                <span className="item-amount badge badge-primary badge-pill">1</span>
              </li>
            </ul>
          </div>
        </div>
    </>)
}

export default CategoryFilter;