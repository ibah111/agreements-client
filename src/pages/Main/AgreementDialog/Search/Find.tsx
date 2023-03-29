import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";

export default function Find({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) {
  return (
    <>
      <Grid item container>
        <Grid item alignSelf={"center"}>
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={onClick}
          >
            Поиск
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
}
