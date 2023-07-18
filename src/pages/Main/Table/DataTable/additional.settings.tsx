import {
  GridPinnedColumns,
  GridColumnHeaderParams,
  GridAlignment,
} from "@mui/x-data-grid-premium";
import { classes } from "../Style/style";
// оставлю для будущих настроек стиля
const columns = ["sum", "discount", "full_amount_requirements"];
export const getPinnedStyle =
  (pinned: GridPinnedColumns) => (params: GridColumnHeaderParams) => {
    if (pinned.left?.includes(params.field)) return classes.red;
    if (pinned.right?.includes(params.field)) return classes.blue;
    for (const column of columns) {
      if (params.field === column) return classes.green;
    }

    return classes.yellow;
  };
const columnsAlign = ["comment", "actions_for_get"];
export const getAlign =
  (align: GridAlignment) => (params: GridColumnHeaderParams) => {
    for (const column of columnsAlign) {
      if (params.field === column) return (align = "left");
    }
    return ["center", "left", "right"];
  };
