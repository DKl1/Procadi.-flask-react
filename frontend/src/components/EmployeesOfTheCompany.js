import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import Header from "./Header";
import {Card, Grid} from "@mui/material";
import TextField from "@mui/material/TextField";


const EmployeesOfTheCompany = () => {
    let companyId;
    const location = useLocation();
    //companyId = location.state.id.id;

    const [employees, setEmployees] = useState();
    const [value, setValue] = useState('');

    function GetEmployees() {
        useEffect(() => {
            fetch("http://localhost:8080/employee/findByCompany?company_id=1", {
                'methods': 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(response => setEmployees(response))
                .catch(error => console.log(error))
        }, [])
    }

    GetEmployees();
    const filteredEmployees = employees?.filter(employee => {
        return employee.first_name.toLowerCase().includes(value.toLowerCase()) || employee.last_name.toLowerCase().includes(value.toLowerCase())
    });
    return (
        <>
            <Header/>
            <TextField onChange={(event) => setValue(event.target.value)} autoFocus margin="dense" id="employee_name"
                       label="Name" type="text" fullWidth variant="filled"/>

            <Grid container spacing={0}>
                {
                    filteredEmployees?.map((item, index) =>
                        <Emp id={item?.id} key={item?.id} first_name={item?.first_name} last_name={item?.last_name}/>
                    )
                }
            </Grid>

        </>
    );
};

const Emp = ({first_name, last_name, key, id}) => {
    return (
        <Link to="/feedbackhistory" state={{id: {id}}} style={{textDecoration: 'none'}}>
            <Card sx={{

                p: 20,
                margin: 2,
                padding: 15,
                flexGrow: 2,
                elevation: 2,
            }}>
                <Grid>
                    <Grid item xs={0}>
                        <h5>{first_name}</h5>
                    </Grid>
                    <Grid item xs={0}>
                        <h5>{last_name}</h5>
                    </Grid>
                </Grid>


            </Card>
        </Link>
    );

};


export default EmployeesOfTheCompany;