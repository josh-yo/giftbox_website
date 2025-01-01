import '../stylesheets/categoryFilter.css';

function CategoryFilter({allproducts, selectedCategory, setSelectedCategory }){
    // Use Set to get unique categories
    const uniqueCategories = [...new Set(allproducts.map(product => product.category))];

    return (<>
        <div className="col-md-4 col-lg-3 mb-5">
          <div className="filter" id="filterAccordion">
            <h5 className="filter-title mb-3 d-flex justify-content-between">FILTER
              <span 
                className="bi bi-chevron-down toggle-icon d-md-none d-sm-block" 
                data-bs-toggle="collapse"
                data-bs-target="#collapseFilter"
                aria-expanded="false"
                aria-controls="collapseFilter"
              ></span>
            </h5>
            <ul className="list-group d-md-block collapse" id="collapseFilter" aria-labelledby="collapseFilter" data-bs-parent="#filterAccordion">
              <li
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  selectedCategory === 'All' ? 'active-category' : ''
                }`}
                onClick={() => setSelectedCategory('All')}
              >
                <span>All</span>
                <span className="item-amount badge badge-primary badge-pill">
                  {`( ${allproducts.length} )`}
                </span>
              </li>

              {uniqueCategories.map((category, index) => (
                <li
                  key={index}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    selectedCategory === category ? 'active-category' : ''
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
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