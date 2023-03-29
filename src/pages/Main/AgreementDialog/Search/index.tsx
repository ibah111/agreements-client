import { Grid } from "@mui/material";
import searchContact from "../../../../api/searchContact";
import { useAppDispatch } from "../../../../Reducer";
import { setLoadingResults, setResults } from "../../../../Reducer/Results";
import ContactTable from "../../../ContactTable/ContactTables";
import Find from "./Find";

export default function Search() {
  const dispatch = useAppDispatch();

  const Click = () => {
    dispatch(setLoadingResults(true));
    searchContact().subscribe({
      next: (res) => {
        dispatch(setResults(res));
        dispatch(setLoadingResults(false));
      },
      error: () => {
        setLoadingResults(false);
      },
    });
  };
  return (
    <>
      <Grid
        item
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Find onClick={Click} loading={false} />
      </Grid>
      <ContactTable id={0} />
    </>
  );
}
