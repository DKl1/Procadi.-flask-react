import React from 'react';
import teamsData from "./dataForTesting/dataTeams";
import { Card, Grid, } from "@mui/material";
import Header from "./components/Header";
import {Link} from "react-router-dom";
import AddNewTeam from "./components/AddNewTeam";

export const Team = () => {
    return (
<>
        <Header/>
      <Grid  container spacing={0}>

        {teamsData.map((data, key) => {
          return (
            <div key={key}>
              <Teamsd
                key={key}
                name={data.name}
                tag={data.tag}
              />
            </div>
          );
        })}

          <Card variant="outlined" sx={{

        p: 20,
        margin: 2,
        padding: 15,
        flexGrow: 2,
        elevation: 2,
              maxWidth: 60
      }} >

        <Grid >
          <Grid item xs={0}>
            <h5>New team</h5>
          </Grid>
        </Grid>


    </Card>
          <AddNewTeam/>
      </Grid>

</>
    );

};
const Teamsd = ({ name, tag }) => {

  return (
<Link to="/employees" style={{textDecoration: 'none'}}>
    <Card sx={{

        p: 20,
        margin: 2,
        padding: 15,
        flexGrow: 2,
        elevation: 2,
      }} >


        <Grid >
          <Grid item xs={0}>
            <h5>{name}</h5>
          </Grid>
          <Grid item xs={0}>
            <h5>{tag}</h5>
          </Grid>
        </Grid>


    </Card>
    </Link>
  );

};
export default Team;