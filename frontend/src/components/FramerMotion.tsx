import { motion, useDragControls } from "motion/react";
const FramerMotion = () => {
  const controls = useDragControls();
  return (
    // <motion.div
    //   className="w-20 h-20 bg-amber-500 absolute top-[50%] left-[50%] translate-x-[-50%] -translate-y-[50%] "
    //   initial={{ scale: 1 }}
    //   animate={{ scale: 2, transition: { duration: 2 }, rotate: 360 }}
    // />
    // <motion.div
    //   className="w-20 h-20 bg-amber-300 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    //   whileHover={{ scale: 1.1 }}
    //   whileTap={{ scale: 3.1 }}
    //   onHoverStart={() => console.log("Hover started")}
    // />
    <>
      <motion.div
        drag
        dragControls={controls}
        className="w-50 h-50 bg-red-400"
      ></motion.div>
    </>
  );
};
export default FramerMotion;
