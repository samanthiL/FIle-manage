import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router-dom';

const Userprofile = props => {
  const [customers, setCustomers] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const userId = location.state.id;
    axios.get(`http://localhost:8022/api/list/${userId}`)
      .then(
        (custom) => {
          setCustomers([custom.data]);
          console.log('[custom.data]', [custom.data]);
        },

        (error) => {
          alert(error);
        }
      )
  }, [location]);

  const customerRecord = customers && customers.length > 0 ? customers.map((customer) => {
    return customer?.id ? (
      <tr key={customer.id}>
        <td>{customer.customerName}</td>
        <td>{customer?.amount}</td>
        <td>{customer?.duration}</td>
        <td>{customer?.Repayment}</td>
      </tr>
    ) : null
  }) : null;

  return (

    <div id="section" className="row">

      <h1 align="center">Customer Profile</h1>
      <div className="table" style={{ padding: '142px' }}>

        <Table striped bordered hover style={{ backgroundColor: 'aliceblue' }}>
          <thead>
            <tr>
              <th>Customer_Name</th>
              <th>Amount</th>
              <th>Duration</th>
              <th>Number of installments</th>
            </tr>
          </thead>
          <tbody>
            {customerRecord}
          </tbody>
        </Table>
      </div>
    </div>


  );
}

export default Userprofile;