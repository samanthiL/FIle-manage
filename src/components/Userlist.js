import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
class Userlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
        }
    }
  
  
 
    componentDidMount() {
 
      
    
        fetch("http://localhost:8022/api/userlist")
        .then(res => res.json())
        .then(
            (customers) => {

                console.log("dsd",customers);
                this.setState({ customers: customers });
            },
            (error) => {
                alert(error);
            }
        )
    }
 
    render() {

return (
    <div className="App">
      <h1 align="center">React-App</h1>
      <h4 align='center'>Crash Course on Material Table </h4>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
    
    
                {this.state.customers.map(customer =>
                    <tr>
                        <td>{customer.Customer_Name}</td>
                        <td>{customer.Amount}</td>
                        <td>{customer.Duration}</td>

                        {/* <td>{cus</td> */}
                    
                    </tr>
                )}
         
      </tbody>
    </Table>
    
    </div>
  );
}
}
export default Userlist;