import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";

import notificationSound from "../assets/music/notification.mp3";
import useNofications from "../zustand/useNofications";

const useListenNofications = () => {
  const { socket } = useSocketContext();
  const { nofications, setNofication } = useNofications();

  useEffect(() => {
    socket?.on("newNofication", (nofication) => {
      nofication.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setNofication([...nofications, nofication]);
    });

    return () => socket?.off("newNofication");
  }, [socket, setNofication, nofications]);
};
export default useListenNofications;
