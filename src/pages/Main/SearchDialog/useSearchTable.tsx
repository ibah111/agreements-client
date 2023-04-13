import { Debt, Person } from "@contact/models";
import { plainToInstance } from "class-transformer";
import React from "react";
import Search from "../../../api/searchContact";
import DebtInstance from "../../../Models/Debt";
import useSearchColumns from "./useSearchColumns";

export default function useSearchTable(
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setPerson: React.Dispatch<React.SetStateAction<Person>>
) {
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<Debt[]>([]);
  const columns = useSearchColumns(setOpen, setPerson);

  const refresh = React.useCallback(() => {
    setLoading(true);
    Search().subscribe((res) => {
      const classData = plainToInstance(DebtInstance, res) as unknown as Debt[];
      setRows(classData);
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  return { rows, loading, refresh, columns };
}
