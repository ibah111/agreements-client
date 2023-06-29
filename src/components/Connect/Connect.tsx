import React from "react";
import { NotConnected } from "./NotConnected";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
import { useAppDispatch } from "../../Reducer";
import { resetUser } from "../../Reducer/User";
import config from "../../config/server.json";
const connect = (callback: (value: boolean) => void) => {
  const socket = io(config.server);
  socket.on("connect", () => {
    callback(true);
  });
  socket.on("disconnect", () => {
    callback(false);
  });
  return () => {
    socket.close();
  };
};
interface ConnectProps {
  children: React.ReactNode;
}
export function Connect({ children }: ConnectProps) {
  const dispatch = useAppDispatch();
  const [connected, setConnected] = React.useState(false);
  React.useEffect(() => {
    return connect(setConnected);
  }, []);
  React.useEffect(() => {
    if (connected === false) {
      dispatch(resetUser());
    }
  }, [connected, dispatch]);
  return <>{connected ? children : <NotConnected />}</>;
}
Connect.propTypes = {
  children: PropTypes.node,
};
