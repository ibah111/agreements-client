import { Grid, Button, AppBar } from "@mui/material";
import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { Action, Subject } from "../casl/casl.factory";
import { useAbility } from "@casl/react";
import { CaslContext } from "../casl/casl";

interface MenuItem {
  name: string;
  path: string;
  action?: Action;
  subject?: Subject;
}

const useMenu = (): MenuItem[] => [
  {
    name: "Главная",
    path: "/",
    subject: Subject.Agreement,
    action: Action.Read,
  },
  {
    name: "Админ",
    path: "/Admin",
    action: Action.Read,
    subject: Subject.Admin,
  },
  {
    name: "Журнал",
    path: "/ActionLog",
    action: Action.Read,
    subject: Subject.Admin,
  },
  {
    name: "Удалено",
    path: "/DeletedData",
    action: Action.Read,
    subject: Subject.Admin,
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
  const ability = useAbility(CaslContext);
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
          if (
            page.action &&
            page.subject &&
            ability.can(page.action, page.subject)
          ) {
            return (
              <Grid item key={index}>
                <Button
                  sx={(theme) => ({
                    whiteSpace: "nowrap",
                    "&.ActiveLink": {
                      background: theme.palette.action.selected,
                    },
                    color: "white",
                  })}
                  variant="text"
                  component={ReactNavLink}
                  to={page.path}
                >
                  {page.name}
                </Button>
              </Grid>
            );
          } else {
            return <div key={index}></div>;
          }
        })}
      </Grid>
    </>
  );

  return (
    <AppBar position="static">
      <Grid container>
        <OldNav />
      </Grid>
    </AppBar>
  );
}
