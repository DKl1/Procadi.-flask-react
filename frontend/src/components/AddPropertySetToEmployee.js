import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {Link, useLocation} from "react-router-dom";
import {Button, Card, Grid, MenuItem} from "@mui/material";
import TextField from "@mui/material/TextField";

const AddPropertySetToEmployee = () => {
    let companyId;

    const location = useLocation();
    let teamId = location.state.id.id;

    const [employeesAndPropertySets, setEmployeesAndPropertySets] = useState();
    const [properties, setProperties] = useState();
    const [idProperties, setIdProperties] = useState();
    const [idEmployee, setIdEmployee] = useState();
    const [nameOfProp, setPropName] = useState();
    const [inputFields, setInputFields] = useState([{title: ''}])
    const [isShown, setIsShown] = useState(false);
    console.log(idEmployee)

    const handleChange = (event) => {
        setIdEmployee(event.target.value);
    };
    const handleChangePropName = (event) => {
        setPropName(event.target.value);
        console.log(event.target.value)
    };

    const handleChangeProperties = (event) => {
        setIdProperties(event.target.value);
        if (event.target.value == -1) {
            handleClickOwnTrue();
        } else {
            handleClickOwnFalse();
        }

    };

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    };
    const addFields = () => {
        let newfield = {title: ''}
        setInputFields([...inputFields, newfield])
    };
    const submit = (e) => {
        e.preventDefault(); // запобігає оновленню сторінки
      //   fetch('http://localhost:8080/employee/?employee_id='+ idEmployee.toString(), {
      //    method: 'PUT',
      //    body: JSON.stringify({
      //       team_id: teamId,
      //    }),
      //    headers: {
      //       'Content-type': 'application/json; charset=UTF-8',
      //    },
      // })
      //    .then((response) => response.json())
      //    .then((post) => {
      //
      //    })
      //    .catch((err) => {
      //       console.log(err.message);
      //    });


    //

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            team_id: teamId
        })
    };
    fetch('http://localhost:8080/employee/?employee_id=2'  , requestOptions)
        .then(response => response.json());
    };
    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    };

    const handleClickOwnTrue = (e) => {

        setIsShown(true);

    };
    const handleClickOwnFalse = (e) => {

        setIsShown(false);

    };

    function GetEmployeesAndPropertySets() {
        useEffect(() => {
            fetch("http://localhost:8080/allPropertySet/?company_id=1", {
                'methods': 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(response => setEmployeesAndPropertySets(response))
                .catch(error => console.log(error))
        }, [])
    };

    GetEmployeesAndPropertySets();


    return (
        <>
            <Header/>
            <TextField id="filled-select-employee_name" select label="Employee" onChange={handleChange} type="text"
                       fullWidth variant="filled"
            >
                {employeesAndPropertySets?.employees.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.first_name + " " + option.last_name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField id="prop" select label="Property set" onChange={handleChangeProperties} type="text" fullWidth
                       variant="filled"
            >
                {employeesAndPropertySets?.property_sets.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
                <MenuItem value={-1}>Own</MenuItem>
            </TextField>
            {isShown && (<form
                    // onSubmit={submit}
                >
                    <TextField id="pp" label="Name" onChange={handleChangePropName} type="text" fullWidth
                               variant="filled"></TextField>
                    {inputFields.map((input, index) => {
                        return (
                            <div key={index}>


                                <TextField label="Title" name='title' placeholder='Title' value={input.title}
                                           onChange={event => handleFormChange(index, event)}
                                           variant="filled"></TextField>

                                <Button color="inherit" variant="contained"
                                        onClick={() => removeFields(index)}>Remove</Button>

                            </div>

                        )
                    })}
                    <Button color="inherit" variant="contained" onClick={addFields}>Add</Button>

                </form>
            )}
            <Button color="inherit" variant="contained" onClick={submit}>Save</Button>
        </>
    );
};


export default AddPropertySetToEmployee;