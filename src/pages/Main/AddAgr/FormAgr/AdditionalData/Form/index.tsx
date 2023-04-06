import { Grid } from "@mui/material";
import Reestr from "./1.Reestr";
import IspolDoc from "./10.IspolDoc";
import ListGetDate from "./11.ListGetDate";
import CreditAmount from "./12.CreditAmount";
import Property from "./13.Property";
import Guarantor from "./14.Guarantor";
import StatusDebt from "./15.StatusDebt";
import CollectorFio from "./16.CollectorFio";
import DebtBankSum from "./2.DebtBankSum";
import BeforeSoglasSum from "./3.BeforeSoglasSum";
import FirstPayment from "./4.FirstPayment";
import RecalculationSum from "./5.RecalculationSum";
import LastPaymentDate from "./6.LastPaymentDate";
import LastPaymentSum from "./7.LastPaymentSum";
import AfterSoglas from "./8.AfterSoglas";
import OstatokDolga from "./9.OstatokDolga";
import AddDataButton from "./AddDataButton";

export default function FormAdditionalData() {
  return (
    <>
      <Grid item container xs={12} spacing={1} style={{ marginTop: "5px" }}>
        <Grid item xs={3}>
          <Reestr />
        </Grid>
        <Grid item xs={3}>
          <DebtBankSum />
        </Grid>
        <Grid item xs={3}>
          <BeforeSoglasSum />
        </Grid>
        <Grid item xs={3}>
          <FirstPayment />
        </Grid>
      </Grid>
      <Grid item container xs={12} spacing={1} style={{ marginTop: "2px" }}>
        <Grid item xs>
          <RecalculationSum />
        </Grid>
        <Grid item xs={3}>
          <LastPaymentDate />
        </Grid>
        <Grid item xs={3}>
          <LastPaymentSum />
        </Grid>
        <Grid item xs={3}>
          <AfterSoglas />
        </Grid>
      </Grid>
      <Grid item container xs={12} spacing={1} style={{ marginTop: "2px" }}>
        <Grid item xs={3}>
          <OstatokDolga />
        </Grid>
        <Grid item xs={3}>
          <IspolDoc />
        </Grid>
        <Grid item xs={3}>
          <CreditAmount />
        </Grid>
        <Grid item xs={3}>
          <ListGetDate />
        </Grid>
      </Grid>
      <Grid item container xs={12} spacing={1} style={{ marginTop: "2px" }}>
        <Grid item xs={3}>
          <Property />
        </Grid>
        <Grid item xs={3}>
          <Guarantor />
        </Grid>
        <Grid item xs={3}>
          <StatusDebt />
        </Grid>
        <Grid item xs={3}>
          <CollectorFio />
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <AddDataButton />
      </Grid>
    </>
  );
}
