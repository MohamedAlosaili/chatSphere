import { CgSpinner } from "react-icons/cg";

const LoadingSpinner = () => (
  <div className="grid h-full place-items-center">
    <div className="flex items-center gap-2">
      <CgSpinner size={20} className="animate-[spin_0.5s_linear_infinite;]" />{" "}
      Loading . . .
    </div>
  </div>
);

export default LoadingSpinner;
