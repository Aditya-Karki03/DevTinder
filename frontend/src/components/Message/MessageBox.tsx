import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createSocketConnection } from "../../services/socket.io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useForm } from "react-hook-form";
import { oldMsgRequest } from "./slice";
import { Message } from "../../Types/types";

interface MessageBoxProps {
  firstName: string;
  lastName: string;
  photoUrl: string;
  friendId: string;
  setShowMessageBox: (data: boolean) => void;
}

const MessageBox = ({
  firstName,
  lastName,
  friendId,
  photoUrl,
  setShowMessageBox,
}: MessageBoxProps) => {
  const { handleSubmit, register, getValues, setValue } = useForm();
  const dispatch = useDispatch();
  const scrollToBottom = useRef<HTMLDivElement>(null);

  const loggedInUserId = useSelector(
    (store: RootState) => store?.auth?.loggedInUser?._id
  );

  const { msgLoading, messages } = useSelector(
    (store: RootState) => store?.messages
  );

  const [allMessages, setAllMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (msgLoading) return;
    setAllMessages((prevMsg) => [...prevMsg, ...messages]);
  }, [friendId, msgLoading]);

  // whenever this component mounts I want to connect to socket io and on umounts disconnect
  //chat message will be between 2 people, so need the id of both to create a room
  useEffect(() => {
    //if friend & loggedInuserId not there, no connection
    if (friendId && loggedInUserId) {
      //api call to get all prev chats between the user
      dispatch(oldMsgRequest({ friendsId: friendId }));
      const socket = createSocketConnection();
      //alongside emitting an event I will send loggedInUserId + friendId
      socket.emit("joinChat", loggedInUserId, friendId);
      //listen to the event emiited from the server
      socket.on("messageRecieved", (message, fromId) => {
        if (fromId == loggedInUserId) return; //because I don't want to recieve my own msg from the server
        const messageWithUserId = {
          senderId: friendId,
          message,
        };

        setAllMessages((prev) => [...prev, messageWithUserId]);
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
  //incase of new message scroll to bottom
  useEffect(() => {
    if (scrollToBottom.current) {
      scrollToBottom.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  const handleSendMessage = () => {
    const message: string = getValues("messageInput");
    if (message.length == 0 || message == undefined) {
      return;
    }
    const msgWithSenderId = {
      senderId: loggedInUserId ?? "",
      message,
    };
    const socket = createSocketConnection();
    setAllMessages((prevMsg) => [...prevMsg, msgWithSenderId]);
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
        {allMessages.length > 0 &&
          allMessages?.map((data, index) => {
            return (
              <div key={index} className="">
                {/* if message is sent to you, render it onto left */}
                {data?.senderId == loggedInUserId ? (
                  <div className="flex justify-end px-2">
                    <div className=" max-w-fit px-4 rounded-sm my-2 py-1 bg-gray-800">
                      {data?.message}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-items-start">
                    {" "}
                    <div className=" max-w-fit px-4 rounded-sm my-2 py-1 bg-gray-800">
                      {data?.message}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        {/* empty div for auto scroll event incase of new messge */}
        <div ref={scrollToBottom}></div>
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
