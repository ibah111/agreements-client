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
          <T variant="h1">Соединение с сервером отсутствует</T>
        </Grid>
        <Grid sx={style} item>
          <T variant="h4">Включен VPN или сервер находится на обслуживании</T>
        </Grid>
        <Grid sx={style} item>
          <T variant="h4">
            Если сервер находится на обслуживании, то браузер восстановит
            соединение как только сервер будет запущен, поэтому страницу можно
            не перезагружать
          </T>
        </Grid>
      </Grid>
    </>
  );
}
