import React from 'react';
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import Container from "@material-ui/core/Container";
import './form.css';
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";


const FilesUploadComponent = () => {

    let history = useHistory();

    const [Duration, setDuration] = useState('');
    const [imgCollection, setimgCollection] = useState('');
    const [Customer_Name, setCustomer_Name] = useState('');
    const [Amount, setAmount] = useState('');
    const [payment, setPayment] = useState('');


    const onFileChange = (e) => {

        setimgCollection(e.target.files)
    }
    const onSubmit = (e) => {

        e.preventDefault()

        let duration = Duration;
        let amount = Amount;
        let payment = amount / duration;
        let repayment = parseInt(payment, 10);
        setPayment(repayment);

        var formData = new FormData();
        for (const key of Object.keys(imgCollection)) {
            formData.append('imgCollection', imgCollection[key])

        }

        formData.append('Duration', Duration);   //append the values with key, value pair
        formData.append('Customer_Name', Customer_Name);   //append the values with key, value pair
        formData.append('Amount', Amount);   //append the values with key, value pair
        formData.append('Repayment', repayment);   //append the values with key, value pair

        for (const value of formData.values()) {
            console.log("sss", value);
        }
        axios.post("http://localhost:8022/api/upload-images", formData, {
        }).then(res => {
            alert("succesfully added records")
            console.log(res.data)
            history.push("/Userlist");

        })
    }
    return (
        <Container fixed>
            <div id="section" className="row">
                <form className="forms" onSubmit={onSubmit}>

                    <h3>Loan deatils form</h3>

                    <Grid container alignItems="center" justifyContent="center" direction="column" width="30px">
                        <Grid item>
                            <label>Customer_Name : </label>

                            <TextField
                                id="cname"
                                type="text"
                                name="cname"
                                value={Customer_Name}
                                onChange={(e) =>
                                    setCustomer_Name(e.target.value)}

                            />
                        </Grid>
                        <Grid item>
                            <label>Upload Bank file : </label>
                            <input
                                id="file"
                                name="file"
                                type="file"
                                name="imgCollection" onChange={onFileChange} multiple
                            />

                        </Grid>


                        <Grid item>
                            <label>Amount : </label>

                            <TextField
                                id="Amount"
                                type="text"
                                name="Amount"
                                value={Amount}
                                onChange={(e) =>
                                    setAmount(e.target.value)}
                            />

                        </Grid>

                        <Grid item>
                            <label>Duration : </label>

                            <TextField
                                id="Duration"
                                type="text"
                                name="Duration"
                                value={Duration}
                                onChange={(e) =>
                                    setDuration(e.target.value)}
                            />

                        </Grid>

                    </Grid>

                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
            </div>

        </Container>
    )
}

export default FilesUploadComponent;