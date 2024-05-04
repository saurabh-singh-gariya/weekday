import { CircularProgress } from "@mui/material";
import './Loading.css'

const Loading = () => {
  return (
    <div className="progress-container">
      <CircularProgress />
    </div>
  );
};

export default Loading;
