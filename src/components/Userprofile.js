import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
class Userprofile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
            
        }
    }
  
  
 
    componentDidMount() {
      
    const dd = "62f0fb9d857bbc4e8ee237ca"
        fetch("http://localhost:8022/api/list?"+dd)
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
          <th>Customer_Name</th>
          <th>Amount</th>
          <th>Duration</th>
          <th>payment</th>
        </tr>
      </thead>
      <tbody>
    
    
                {this.state.customers.map(customer =>
                    <tr>
                        <td>{customer.Customer_Name}</td>
                        <td>{customer.Amount}</td>
                        <td>{customer.Duration}</td>

                        {/* <td>{cus</td> */}
                        <td>{customer.payment}</td>
                      

                    </tr>
                )}
         
      </tbody>
    </Table>
    
    </div>
  );
}
}
export default Userprofile;