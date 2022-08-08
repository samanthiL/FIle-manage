import React, { Component } from 'react';
import axios from 'axios';

export default class FilesUploadComponent extends Component {

    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {

            imgCollection: '',
            Customer_Name : '',
            Amount: '',
            Duration:'',
            payment: ''

        }
    }

    onChange(e) {
        this.setState({ imgCollection: e.target.value })
    }

    onFileChange(e) {
        this.setState({ imgCollection: e.target.files })
    }

    onSubmit(e) {
        e.preventDefault()

        let duration = this.state.Duration;
        let amount = this.state.Amount;
        var repayment = amount/duration;

        console.log("ddddddd",repayment);
        this.setState({
            payment: repayment
          });


        var formData = new FormData();
        for (const key of Object.keys(this.state.imgCollection)) {
            formData.append('imgCollection', this.state.imgCollection[key])
           
        }

        formData.append('Duration', this.state.Duration);   //append the values with key, value pair
        formData.append('Customer_Name', this.state.Customer_Name);   //append the values with key, value pair
        formData.append('Amount',this.state.Amount);   //append the values with key, value pair
        formData.append('Amount',this.state.Amount);   //append the values with key, value pair

        formData.append('Repayment',this.state.payment);   //append the values with key, value pair


        axios.post("http://localhost:8022/api/upload-images", formData, {
        }).then(res => {
            console.log(res.data)
        })
    }

    render() {


        return (
            <div className="container">
                <div className="row">
 
 
 
                    <form onSubmit={this.onSubmit}>
 



                        <div className="form-group">
                            <input type="file" name="imgCollection" onChange={this.onFileChange} multiple />
                        </div>
                        <div className="form-group">
                            <input type="text" name="cname"  value={this.Customer_Name} onChange= {(e)=> 
                                 this.setState({Customer_Name: e.target.value })}
                                   />

                        </div>
                     
                        <div className="form-group">
                        <input type="text" name="cname"  value={this.Amount} onChange= {(e)=> 
                                 this.setState({Amount: e.target.value })}
                                   />
                        </div>
                        <div className="form-group">
                        <input type="text" name="cname"  value={this.Duration} onChange= {(e)=> 
                                 this.setState({Duration: e.target.value })}
                                   />
                        </div>
                        <p>{this.payment}</p>

                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}