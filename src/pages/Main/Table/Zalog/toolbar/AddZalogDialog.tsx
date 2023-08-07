import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
} from "@mui/material";
import GridSelectField from "../../../../../components/Utils/GridSelectField";
import React from "react";
import callMessage from "../../../../../utils/callMessage";
import createPersonPropertyLink from "../../../../../api/PersonPropertiesLink/createPersonPropertyLink";
import useAsyncMemo from "../../../../../utils/asyncMemo";
import getPersonProperty from "../../../../../api/PersonPropertiesLink/getPersonProperty";

interface AddZalogDialogProps {
  open: boolean;
  onClose: VoidFunction;
  id_person: number;
  id_agreement: number;
}

export default function AddZalogDialog(props: AddZalogDialogProps) {
  const [err, setErr] = React.useState("");
  const [selectedZalog, setSelectedZalog] = React.useState<number>(
    "" as unknown as number
  );
  const properties = useAsyncMemo(
    () => getPersonProperty(props.id_person),
    [props.id_person],
    []
  );
  React.useEffect(() => {
    if (!selectedZalog) setErr("Выберите залог");
    else setErr("");
  }, [selectedZalog]);

  const handleClose = React.useCallback(() => {
    props.onClose();
  }, [props]);

  const handleClick = React.useCallback(() => {
    if (err) {
      callMessage(err, { variant: "error" });
      return;
    }
    createPersonPropertyLink(props.id_agreement, selectedZalog).subscribe(
      () => {
        callMessage(
          `Залог ${selectedZalog} привязан к соглашению ${props.id_agreement}`,
          { variant: "success" }
        );
        props.onClose();
      }
    );
  }, [err, props, selectedZalog]);

  return (
    <Dialog fullWidth maxWidth={"md"} open={props.open} onClose={handleClose}>
      <DialogTitle>{`Привязать имущество к соглашению №${props.id_agreement}`}</DialogTitle>
      <DialogContent>
        <Grid>
          <GridSelectField
            label={"Имущество для привязки"}
            value={selectedZalog}
            error={err ? true : false}
            helperText={err}
            onChange={(prop) => {
              if (prop) {
                setSelectedZalog(prop);
              }
            }}
            xs={12}
            sx={{ mt: 1 }}
          >
            {properties.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {`ID: ${
                  item.id
                }, Статус залога: ${item.StatusDict?.name.toLocaleLowerCase()}; ${item.PersonPropertyParams?.find(
                  (item) => item.r_property_typ_params_id === 3
                )?.value.toLowerCase()} ${item.PersonPropertyParams?.find(
                  (item) => item.r_property_typ_params_id === 7
                )?.value.toLowerCase()}, VIN: ${
                  item.PersonPropertyParams?.find(
                    (item) => item.r_property_typ_params_id === 6
                  )?.value
                }, Гос.номер: ${
                  item.PersonPropertyParams?.find(
                    (item) => item.r_property_typ_params_id === 5
                  )?.value
                }`}
              </MenuItem>
            ))}
          </GridSelectField>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClick}>
          {`Привязать имущество должника ${props.id_person} к соглашению ${props.id_agreement}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
