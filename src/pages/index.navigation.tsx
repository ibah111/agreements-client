import { Grid, Button } from "@mui/material";
import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

interface MenuItem {
  name: string;
  path: string;
}

const useMenu = (): MenuItem[] => [
  {
    name: "Главная",
    path: "/",
  },
  {
    name: "Админ",
    path: "/Admin",
  },
  {
    name: "Журнал",
    path: "/ActionLog",
  },
  {
    name: "Удалено",
    path: "/DeletedData",
  },
];

const ReactNavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => {
    return (
      <NavLink
        ref={ref}
        {...props}
        className={({ isActive }) => {
          return isActive
            ? `${props.className} ActiveLink`
            : (props.className as string);
        }}
      />
    );
  }
);

export default function Navigation() {
  const pages = useMenu();

  const OldNav = () => (
    <>
      <Grid
        sx={{
          height: 33,
        }}
        container
        columnSpacing={1}
      >
        {pages.map((page, index) => {
          return (
            <Grid item key={index}>
              <Button
                sx={(theme) => ({
                  whiteSpace: "nowrap",
                  "&.ActiveLink": {
                    background: theme.palette.action.selected,
                  },
                })}
                variant="outlined"
                component={ReactNavLink}
                to={page.path}
              >
                {page.name}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </>
  );

  return <OldNav />;
}
