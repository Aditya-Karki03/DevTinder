import { X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { createSocketConnection } from "../services/socket.io";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useForm } from "react-hook-form";

interface MessageBoxProps {
  firstName: string;
  lastName: string;
  photoUrl: string;
  friendId: string;
  setShowMessageBox: (data: boolean) => void;
}

interface messagesData {
  incomingMsg?: boolean;
  outgoingmsg?: boolean;
  msg: string;
}

const MessageBox = ({
  firstName,
  lastName,
  friendId,
  photoUrl,
  setShowMessageBox,
}: MessageBoxProps) => {
  const { handleSubmit, register, getValues, setValue } = useForm();

  const loggedInUserId = useSelector(
    (store: RootState) => store?.auth?.loggedInUser?._id
  );

  const [messages, setMessages] = useState<messagesData[]>([]);

  // whenever this component mounts I want to connect to socket io and on umounts disconnect
  //chat message will be between 2 people, so need the id of both to create a room
  useEffect(() => {
    //if friend & loggedInuserId not there, no connection
    if (friendId && loggedInUserId) {
      const socket = createSocketConnection();
      //alongside emitting an event I will send loggedInUserId + friendId
      socket.emit("joinChat", loggedInUserId, friendId);
      //listen to the event emiited from the server
      socket.on("messageRecieved", (message, userId, friendId) => {
        if (userId == loggedInUserId) return;
        setMessages((prevMsg) => [
          ...prevMsg,
          { incomingMsg: true, msg: message, outgoingmsg: false },
        ]);
        // console.log(message, user, fromUser);
      });
      //whenever the component unmounts I want to disconnect the socket connection
      return () => {
        socket.disconnect();
      };
    }
  }, [friendId, loggedInUserId]);

  const handleClose = () => {
    setShowMessageBox(false);
  };

  const handleSendMessage = () => {
    const message = getValues("messageInput");
    if (message.length == 0 || message == undefined) {
      return;
    }
    const socket = createSocketConnection();
    setMessages((prevMsg) => [
      ...prevMsg,
      { outgoingmsg: true, msg: message, incomingMsg: false },
    ]);
    socket.emit("sendMessage", message, loggedInUserId, friendId);
    setValue("messageInput", "");
  };

  return (
    <div className="fixed right-1.5 bottom-2 border border-white/20 z-50 w-xl h-[450px] bg-black/80 rounded-lg flex flex-col">
      <div className="w-full py-1 px-3 flex justify-between items-center border-b border-white/20">
        <div className="flex grow items-center gap-5">
          <img
            src={photoUrl}
            alt="Profile Picture"
            className="w-14 h-14 object-fill rounded-full"
          />
          <span className="text-gray-200 font-bold">
            {firstName} {lastName}
          </span>
        </div>
        <X className="cursor-pointer " onClick={handleClose} />
      </div>
      {/* flex flex-col    px-2 py-3 overflow-y-scroll */}
      <div className="h-full px-2 py-3 overflow-y-scroll">
        {messages &&
          messages?.map((data, index) => {
            return (
              <Fragment key={index}>
                {data.incomingMsg && (
                  <div key={index} className="block text-left">
                    {data?.msg}
                  </div>
                )}
                {data?.outgoingmsg && (
                  <div key={index} className="block text-right ">
                    {data?.msg}
                  </div>
                )}
              </Fragment>
            );
          })}
      </div>
      <form
        onSubmit={handleSubmit(handleSendMessage)}
        className="w-full flex justify-center px-2 gap-2 my-2"
      >
        <input
          type="text"
          {...register("messageInput")}
          className="w-full p-2 rounded-md border border-white/30 outline-none"
        />
        <button
          type="submit"
          className="px-5 py-1  bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
};
export default MessageBox;
