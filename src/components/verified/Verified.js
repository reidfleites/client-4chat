import { GrValidate } from "react-icons/gr";
import "./verified.css";

function Verified() {
  return (
    <div className="verified">
      <GrValidate />
      <h1>Congratulations!</h1>
      <h3>now your account is active</h3>
      <h2>please log in</h2>
    </div>
  );
}
export default Verified;
