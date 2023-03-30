import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import { useAppDispatch } from "../../../Reducer";
import { setContract, setName } from "../../../Reducer/Search";
import Search from "../../ContactTable/Search";
import { searchColumns } from "./searchColumns";
interface SearchAgreementDialogProps {
  open: boolean;
  onClose: () => void;
}
export default function SearchAgreement(props: SearchAgreementDialogProps) {
  const dispatch = useAppDispatch();
  const columns = searchColumns;
  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} maxWidth="lg" fullWidth>
        <DialogTitle alignSelf={"center"}>
          Внесите данные для поиска
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={1}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                console.log("Entered");
              }
            }}
            style={{}}
          >
            <Grid item style={{ margin: "5px" }}>
              <TextField
                label="ФИО"
                onChange={(event) =>
                  dispatch(setName(["name", String(event.target.value)]))
                }
              />
            </Grid>
            <Grid item style={{ margin: "5px" }}>
              <TextField
                label="КД"
                type="string"
                onChange={(event) =>
                  dispatch(setContract(["KD", String(event.target.value)]))
                }
              />
            </Grid>
          </Grid>
          <Grid item container spacing={1}>
            <Grid item alignContent="center">
              <Button
                variant="contained"
                onClick={Search}
                sx={{ width: "100", alignSelf: "center", margin: "5px" }}
                //todo  Alternative
                //todo  onClick={async (name: string, contract: string) => {
                //todo     const search = await Search(name, string);
                //todo    return search; }}
              >
                Поиск
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <Grid
          item
          container
          xs
          direction={"column"}
          style={{ height: 400, width: "100%" }}
        >
          <DataGridPremium columns={columns} rows={[]}></DataGridPremium>
        </Grid>
      </Dialog>
    </>
  );
}
