import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Back to Home</Link>
    </div>
  );
}