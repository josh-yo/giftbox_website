import {Outlet} from 'react-router-dom'

function Dashboard() {
    return (
        <>
        <nav className='navbar navbar-expand-lg bg-dark'>
            <div className='container-fluid'>
            <p className='text-white mb-0'>Admin Panel</p>
            <button
                className='navbar-toggler'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navbarNav'
                aria-controls='navbarNav'
                aria-expanded='false'
                aria-label='Toggle navigation'
            >
                <span className='navbar-toggler-icon' />
            </button>
            <div
                className='collapse navbar-collapse justify-content-end'
                id='navbarNav'
            >
                <ul className='navbar-nav'>
                <li className='nav-item'>
                    <button type='button' className='btn btn-sm btn-light'>
                    Logout
                    </button>
                </li>
                </ul>
            </div>
            </div>
        </nav>
        <div className='d-flex' style={{ minHeight: 'calc(100vh - 56px)' }}>
            <div className='bg-light' style={{ width: '200px' }}>
            <ul className='list-group list-group-flush'>
                <a
                className='list-group-item list-group-item-action py-3'
                to='/admin/products'
                >
                <i className='bi bi-cup-fill me-2' />
                Product List
                </a>
                <a
                className='list-group-item list-group-item-action py-3'
                to='/admin/coupons'
                >
                <i className='bi bi-ticket-perforated-fill me-2' />
                Coupon List
                </a>
                <a
                className='list-group-item list-group-item-action py-3'
                to='/admin/orders'
                >
                <i className='bi bi-receipt me-2' />
                Order List
                </a>
            </ul>
            </div>
            <div className='w-100'>
            {/* Products */}
            <Outlet/>
            {/* Products end */}
            </div>
        </div>
        </>
    );
    }
export default Dashboard;