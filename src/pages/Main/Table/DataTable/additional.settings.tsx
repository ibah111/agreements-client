import {
  GridPinnedColumns,
  GridColumnHeaderParams,
  GridAlignment,
} from "@mui/x-data-grid-premium";
import { classes } from "../Style/style";
/**
 * Закреп столбиков
 */
const columns = [
  "sum",
  "discount",
  "full_req",
  "sum_payments_after",
  "sum_remains",
];
export const getPinnedStyle =
  (pinned: GridPinnedColumns) => (params: GridColumnHeaderParams) => {
    if (pinned.left?.includes(params.field)) return classes.red;
    if (pinned.right?.includes(params.field)) return classes.blue;
    for (const column of columns) {
      if (params.field === column) return classes.green;
    }

    return classes.yellow;
  };

/**
 * Выравнивание содержимого ячеек
 */
const columnsAlign = ["comment", "actions_for_get"];
export const getAlign = (field: string): GridAlignment => {
  if (columnsAlign.includes(field)) return "left";
  return "center";
};
