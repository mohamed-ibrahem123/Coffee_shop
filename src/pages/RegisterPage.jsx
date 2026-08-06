import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Register</h1>
      <form>
        <div>
          <label>Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>هل انت تمتلك حساب؟<Link to="/login">Login</Link></p>
    </div>
  );
}