import React from "react";
import { NotLoged } from "./NotLoged";
import PropTypes from "prop-types";
import { useAppDispatch, useAppSelector } from "../../Reducer";
import { setUser } from "../../Reducer/User";
import { createUserAbility } from "../../casl/casl.factory";
import { CaslContext } from "../../casl/casl";
import connect from "./connect";
interface LoginProps {
  children: React.ReactNode;
}
export function Login({ children }: LoginProps) {
  const loged = useAppSelector((state) => state.User.login_result);
  const dispatch = useAppDispatch();
  const [message, setMessage] = React.useState<string | null>(null);
  const [ability, setAbility] = React.useState(createUserAbility());
  React.useEffect(() => {
    if (!loged) {
      const sub = connect().subscribe({
        next: (value) => {
          dispatch(setUser(value));
          console.log("Connect", value);
          setAbility(createUserAbility(value));
        },
        error: (message) => setMessage(message),
      });
      return sub.unsubscribe.bind(sub);
    }
  }, [loged, dispatch]);
  return (
    <>
      {loged ? (
        <CaslContext.Provider value={ability}>{children}</CaslContext.Provider>
      ) : (
        <NotLoged message={message ? message : ""} />
      )}
    </>
  );
}
Login.propTypes = {
  children: PropTypes.node,
};
