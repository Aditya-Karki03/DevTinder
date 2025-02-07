interface IProps {
  message: string;
}
const Notification = (props: IProps) => {
  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-info">
        <span>{props?.message}</span>
      </div>
    </div>
  );
};

export default Notification;
