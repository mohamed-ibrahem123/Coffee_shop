import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Login</h1>
      <form>
        <div>
          <label>Email</label>
          <input type="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>لا يوجد حساب؟<Link to="/register">Register</Link></p>
    </div>
  );
}