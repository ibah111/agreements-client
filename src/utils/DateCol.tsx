import {
  InputBase,
  InputBaseProps,
  styled,
  TextFieldProps,
} from "@mui/material";
import {
  GridCellParams,
  GridColTypeDef,
  GridFilterInputValueProps,
  GridFilterItem,
  GridRenderEditCellParams,
  GRID_DATE_COL_DEF,
  useGridApiContext,
} from "@mui/x-data-grid-premium";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers-pro";
import { AdapterMoment } from "@mui/x-date-pickers-pro/AdapterMoment";

function buildApplyDateFilterFn(
  filterItem: GridFilterItem,
  compareFn: (value1: number, value2: number) => boolean,
  showTime: boolean = false
) {
  if (!filterItem.value) {
    return null;
  }

  // Make a copy of the date to not reset the hours in the original object
  const filterValueCopy = new Date(filterItem.value);
  filterValueCopy.setHours(0, 0, 0, 0);

  const filterValueMs = filterValueCopy.getTime();

  return ({ value }: GridCellParams<any, Date>): boolean => {
    if (!value) {
      return false;
    }

    // Make a copy of the date to not reset the hours in the original object
    const dateCopy = new Date(value);
    dateCopy.setHours(
      showTime ? value.getHours() : 0,
      showTime ? value.getMinutes() : 0,
      0,
      0
    );
    const cellValueMs = dateCopy.getTime();

    return compareFn(cellValueMs, filterValueMs);
  };
}

function getDateFilterOperators(
  showTime: boolean = false
): GridColTypeDef["filterOperators"] {
  return [
    {
      value: "is",
      getApplyFilterFn: (filterItem) => {
        return buildApplyDateFilterFn(
          filterItem,
          (value1, value2) => value1 === value2,
          showTime
        );
      },
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime },
    },
    {
      value: "not",
      getApplyFilterFn: (filterItem) => {
        return buildApplyDateFilterFn(
          filterItem,
          (value1, value2) => value1 !== value2,
          showTime
        );
      },
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime },
    },
    {
      value: "after",
      getApplyFilterFn: (filterItem) => {
        return buildApplyDateFilterFn(
          filterItem,
          (value1, value2) => value1 > value2,
          showTime
        );
      },
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime },
    },
    {
      value: "onOrAfter",
      getApplyFilterFn: (filterItem) => {
        return buildApplyDateFilterFn(
          filterItem,
          (value1, value2) => value1 >= value2,
          showTime
        );
      },
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime },
    },
    {
      value: "before",
      getApplyFilterFn: (filterItem) => {
        return buildApplyDateFilterFn(
          filterItem,
          (value1, value2) => value1 < value2,
          showTime
        );
      },
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime },
    },
    {
      value: "onOrBefore",
      getApplyFilterFn: (filterItem) => {
        return buildApplyDateFilterFn(
          filterItem,
          (value1, value2) => value1 <= value2,
          showTime
        );
      },
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime },
    },
    {
      value: "isEmpty",
      getApplyFilterFn: () => {
        return ({ value }): boolean => {
          return value == null;
        };
      },
      requiresFilterValue: false,
    },
    {
      value: "isNotEmpty",
      getApplyFilterFn: () => {
        return ({ value }): boolean => {
          return value != null;
        };
      },
      requiresFilterValue: false,
    },
  ];
}

const dateAdapter = new AdapterMoment({ locale: "ru" });

/**
 * `date` column
 */

export const dateColumnType: GridColTypeDef<Date, string> = {
  ...GRID_DATE_COL_DEF,
  resizable: false,
  renderEditCell: (params) => {
    return <GridEditDateCell {...params} />;
  },
  filterOperators: getDateFilterOperators(),
  valueFormatter: (params) => {
    if (typeof params.value === "string") {
      return params.value;
    }
    if (params.value) {
      return dateAdapter.format(
        params.value as unknown as moment.Moment,
        "keyboardDate"
      );
    }
    return "";
  },
};

const GridEditDateInput = styled(InputBase)({
  fontSize: "inherit",
  padding: "0 9px",
});

function WrappedGridEditDateInput(props: TextFieldProps) {
  const { InputProps, ...other } = props;
  return (
    <GridEditDateInput
      fullWidth
      {...InputProps}
      {...(other as InputBaseProps)}
    />
  );
}

function GridEditDateCell({
  id,
  field,
  value,
  colDef,
}: GridRenderEditCellParams<any, Date | string | null>) {
  const apiRef = useGridApiContext();

  const Component = colDef.type === "dateTime" ? DateTimePicker : DatePicker;

  const handleChange = (newValue: unknown) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  return (
    <Component
      value={value || null}
      autoFocus
      onChange={handleChange}
      slots={{ textField: WrappedGridEditDateInput }}
    />
  );
}

function GridFilterDateInput(
  props: GridFilterInputValueProps & { showTime?: boolean }
) {
  const { item, showTime, applyValue, apiRef } = props;

  const Component = showTime ? DateTimePicker : DatePicker;

  const handleFilterChange = (newValue: unknown) => {
    applyValue({ ...item, value: newValue });
  };

  return (
    <Component
      value={item.value || null}
      autoFocus
      label={apiRef.current.getLocaleText("filterPanelInputLabel")}
      slotProps={{
        textField: {
          variant: "standard",
        },
        inputAdornment: {
          sx: {
            "& .MuiButtonBase-root": {
              marginRight: -1,
            },
          },
        },
      }}
      onChange={handleFilterChange}
    />
  );
}
