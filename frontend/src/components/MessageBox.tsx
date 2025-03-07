import { X } from "lucide-react";

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
  const handleClose = () => {
    setShowMessageBox(false);
  };
  //send id, firstname, lastname, photoUrl to the message box
  //id of both from and to, to get the previous messages of both talking together
  //need the state variable as well to control the component
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
      <div className="flex flex-col    px-2 py-3 overflow-y-scroll">
        <div className="chat chat-start">
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">2 hours ago</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Seen</div>
        </div>
        <div className="chat chat-start  flex flex-col items-end">
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">2 hour ago</time>
          </div>
          <div className="chat-bubble">I loved you.</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="chat chat-start">
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">2 hours ago</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Seen</div>
        </div>
        <div className="chat chat-start  flex flex-col items-end">
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">2 hour ago</time>
          </div>
          <div className="chat-bubble">I loved you.</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="chat chat-start">
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">2 hours ago</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Seen</div>
        </div>
        <div className="chat chat-start  flex flex-col items-end">
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">2 hour ago</time>
          </div>
          <div className="chat-bubble">I loved you.</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="chat chat-start">
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">2 hours ago</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Seen</div>
        </div>
        <div className="chat chat-start  flex flex-col items-end">
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">2 hour ago</time>
          </div>
          <div className="chat-bubble">I loved you.</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="chat chat-start">
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">2 hours ago</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Seen</div>
        </div>
        <div className="chat chat-start  flex flex-col items-end">
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">2 hour ago</time>
          </div>
          <div className="chat-bubble">I loved you.</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
      </div>
      <div className="w-full flex justify-center px-2 gap-2 my-2">
        <input
          type="text"
          name=""
          id=""
          className="w-full p-2 rounded-md border border-white/30 outline-none"
        />
        <button
          type="submit"
          className="px-5 py-1  bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default MessageBox;
