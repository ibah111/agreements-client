import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import StyleIcon from "@mui/icons-material/Style";
import {
  useGridApiContext,
  gridFilterModelSelector,
  useGridSelector,
  gridSortModelSelector,
  GridSortModel,
  GridFilterModel,
} from "@mui/x-data-grid-premium";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Typography } from "@mui/material";
function downloadFile(name: string, uri: string) {
  const a = document.createElement("a");
  a.download = name;
  a.href = uri;
  a.click();
}
export default function DownloadFilterButton() {
  /**
   * Базовый код, чтобы работало меню в тулбаре
   */
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  /**
   * апи референс к текущему контексту
   */
  const apiContext = useGridApiContext();
  const filterModel = useGridSelector(apiContext, gridFilterModelSelector);
  const sortModel = useGridSelector(apiContext, gridSortModelSelector);
  const click = React.useCallback(() => {
    downloadFile(
      "фильтр.import",
      URL.createObjectURL(
        new Blob([btoa(JSON.stringify({ filterModel, sortModel }))])
      )
    );
  }, [filterModel, sortModel]);
  //TODO добавить проверку
  const upload = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target?.files?.[0];
      if (file) {
        file.text().then((text) => {
          const data: {
            filterModel: GridFilterModel;
            sortModel: GridSortModel;
          } = JSON.parse(atob(text));
          apiContext.current.setFilterModel(data.filterModel);
          apiContext.current.setSortModel(data.sortModel);
        });
      }
    },
    [apiContext]
  );
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        startIcon={<StyleIcon />}
        size="small"
      >
        {`Действия(фильтр)`}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={click}>
          <DownloadIcon />
          <Typography>Скачать</Typography>
        </MenuItem>
        <MenuItem component="label">
          <FileUploadIcon />
          <Typography>Загрузить</Typography>
          <input type="file" hidden onChange={upload} accept="*.import" />
        </MenuItem>
      </Menu>
      {}
    </div>
  );
}
