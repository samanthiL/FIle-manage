import React from 'react';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

const Userlist = () => {

  let history = useHistory();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8022/api/userlist")
      .then(res => res.json())
      .then(
        (customer) => {
          setCustomers(customer);
          console.log("id", customer);
        },
        (error) => {
          alert(error);
        }
      )
  }, []);

  const Getbyid = (info) => {
    history.push
      ({
        pathname: '/Profile',
        state: { id: info }
      });

  }
  return (
    <div id="section">
      <h1 align="center">Customer details </h1>
      <div className="table" style={{ padding: '142px', backgroundColor: 'w' }}>

        <Table striped bordered hover style={{ backgroundColor: 'aliceblue' }}>
          <thead>
            <tr>
              <th>Customer id</th>
              <th>Amount</th>
              <th>Duration</th>
              <th></th>
            </tr>
          </thead>
          <tbody>


            {customers.map(customer =>
              <tr key={customer._id}>
                <td >{customer.Customer_Name}</td>
                <td>{customer.Amount}</td>
                <td>{customer.Duration}</td>
                <td onClick={() => { Getbyid(customer._id) }}>
                  <button className="btn btn-primary" type="submit">Visit Profile </button>
                </td>

              </tr>
            )}

          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Userlist;