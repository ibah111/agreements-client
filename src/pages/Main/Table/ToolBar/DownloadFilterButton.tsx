import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import StyleIcon from "@mui/icons-material/Style";
import { useGridApiContext, useGridApiRef } from "@mui/x-data-grid-premium";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Typography } from "@mui/material";
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
   * Инициилизирую блов
   */
  const blob = new Blob();

  const onDownload = () => {
    const link = document.createElement("a");
    link.download = `download.txt`;
    link.href = "./download.txt";
    link.click();
  };
  /**
   * апи референс к текущему контексту
   */
  const apiRef = useGridApiRef();
  // const currentRef = apiRef.current.setFilterModel();
  const apiContext = useGridApiContext();
  // const currentContext = apiContext.current.setFilterModel();
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
        <MenuItem onClick={onDownload}>
          <DownloadIcon />
          <Typography>Скачать</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            /**
             * openDialog
             */
          }}
        >
          <FileUploadIcon />
          <Typography>Загрузить</Typography>
        </MenuItem>
      </Menu>
      {}
    </div>
  );
}
