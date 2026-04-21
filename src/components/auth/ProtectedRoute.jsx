import { useState, useEffect } from "react";
import { subscribeToAuthChanges } from "../../services/authService";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((usr) => {
      if (!usr) {
        window.location.href = "/";
      } else {
        setUser(usr);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#030812",
        color: "#00f2fe",
        fontFamily: "'Orbitron', sans-serif"
      }}>
        Loading Access...
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
