import { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";

function Notification(props: { message: string; error?: boolean }) {
  useEffect(() => {
    if (props.error) {
      toast.error(props.message, {
        position: "bottom-right",
      });
      return;
    }
    toast(props.message, {
      position: "bottom-right",
    });
  });
  return (
    <div>
      <ToastContainer />
    </div>
  );
}
export default Notification;
