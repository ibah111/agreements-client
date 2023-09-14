import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
interface Props {
  open: boolean;
  onClose: VoidFunction;
}
export function ScheduleSelectDebt(props: Props) {
  const array = [
    {
      id: 1,
      name: "debt1",
    },
    {
      id: 2,
      name: "debt2",
    },
  ];
  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="sm">
      <DialogTitle>{`Привязать`}</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel id="purpose-label">Назначение</InputLabel>
              <Select labelId="purpose-label" label="Назначение">
                <MenuItem value="">
                  <em>Не выбрано</em>
                </MenuItem>
                {array.map((i) => (
                  <MenuItem key={i.id} value={i.id}>
                    {i.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <DialogActions>
          <Grid
            sx={{
              alignSelf: "right",
            }}
          />
          <Grid container item>
            <Button variant="contained">{`PROP`}</Button>
          </Grid>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
