import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <>
      <Grid
        sx={{
          height: 33,
        }}
        container
        columnSpacing={1}
      >
        <Grid item>
          <Button variant="outlined" component={Link} to={"/"}>
            Main
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" component={Link} to={"/Admin"}>
            Admin
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" component={Link} to={"/ActionLog"}>
            Action log
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" component={Link} to={"/DeletedData"}>
            Deleted data
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
