import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import TransactionsList from './transactionsList'


const UserPanelTabs = (props) => {
    return(<ul className="nav nav-tabs">
            <li role="presentation"><NavLink to="/home/summary" activeClassName="active">Summary</NavLink></li>
            <li role="presentation"><NavLink to="/home/transactions" activeClassName="active">Transactions</NavLink></li>
            <li role="presentation"><NavLink to="/home" activeClassName="active">Graphs</NavLink></li>
          </ul>
          )
}

export default UserPanelTabs