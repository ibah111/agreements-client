import { Grid, Typography as T } from "@mui/material";
const style = { textAlign: "center" };
export function NotConnected() {
  return (
    <>
      <Grid
        sx={{ height: "98vh" }}
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid sx={style} item>
          <T variant="h4">
            Вы не зарегистрированы как пользователь данного приложения
          </T>
        </Grid>
      </Grid>
    </>
  );
}
