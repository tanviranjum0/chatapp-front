/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import { AccountContext } from "../../AccountContext";
import socket from "../../socket";
const UseSocketSetup = (setFriendList, setMessages) => {
  const { setUser } = useContext(AccountContext);
  useEffect(() => {
    socket.connect();
    socket.on("friends", async (List) => {
      await setFriendList(List);
    });
    socket.on("messages", async (messages) => {
      await setMessages(messages);
    });
    socket.on("dm", async (msg) => {
      await setMessages((prev) => [msg, ...prev]);
    });
    socket.on("connect", () => {
      console.log("Socket Connected")
    })
    socket.on("connected", (status, name) => {
      console.log("Connected Socket")
      setFriendList((c) => {
        if (Array.isArray(c) && c?.length > 0) {
          return [...c].map((friend) => {
            if (friend.username == name) {
              friend.connected = status;
            }
            return friend;
          });
        }
      });
    });
    socket.on("disconnect", (reason, details) => {
      console.log("Socket Disconnected", reason, details)
    })
    socket.on("error", (error) => {
      console.log("Error", error)
    })
    socket.on("connect_error", (error) => {
      console.log("Socket Error", error)

      setUser({ loggedIn: false });
      return () => {
        socket.off("connect_error");
        socket.off("dm");
        socket.off("messages");
        socket.off("friends");
        socket.off("connected");
      };
    });
  }, []);
};
export default UseSocketSetup;
