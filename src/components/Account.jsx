
import { NavLink } from 'react-router-dom';
import AccountIcon from './AccountIcon';


const Account = ({ id, name = 'Account name', description = '', initial_balance = '0', type = 'cash', color = 'white' }) => {
    return (


        <div className="card" >
            <div className="card-img-top my-auto">
                <AccountIcon type={type} color={color} />
            </div>

            <div className="card-body">
                <h4 className="card-title ">{name}</h4>
                <h6 className="card-subtitle mb-2 text-muted">{description}</h6>
                <p className="card-text p-0 my-1">Amount : {initial_balance} $</p>
                <p className="card-text lh-1">Account type : {type} </p>

            </div>
            <div className="card-footer">
                <button className='btn btn-info'>Transaction</button>
                <NavLink to={`edit/${id}`} style={{ textDecoration: 'none' }}  >
                    <button className='btn btn-primary'>Edit</button>
                </NavLink >
                <button className='btn btn-danger'>Delete</button>

            </div>
        </div >



    )
}

export default Account