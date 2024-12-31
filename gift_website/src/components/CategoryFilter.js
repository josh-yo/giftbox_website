import '../stylesheets/categoryFilter.css';

function CategoryFilter({allproducts}){
    // Use Set to get unique categories
    const uniqueCategories = [...new Set(allproducts.map(product => product.category))];

    return (<>
        <div className="col-md-3">
          <div className="filter">
            <h5 className="filter-title mb-3">FILTER</h5>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>All</span>
                <span className="item-amount badge badge-primary badge-pill">
                  {`( ${allproducts.length} )`}
                </span>
              </li>

              {uniqueCategories.map((category, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{category}</span>
                  <span className="item-amount badge badge-primary badge-pill">
                    ( {allproducts.filter(p => p.category === category).length} )
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
    </>)
}

export default CategoryFilter;