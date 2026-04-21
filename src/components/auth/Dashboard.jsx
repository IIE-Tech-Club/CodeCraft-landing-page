import { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { logout } from "../../services/authService";
import ProtectedRoute from "./ProtectedRoute";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Current user will be available here because of ProtectedRoute
    setUser(auth.currentUser);
  }, []);

  return (
    <ProtectedRoute>
      <div className="dash-container">
        <header className="dash-header">
          <div className="dash-brand">CODE<span>CRAFT</span></div>
          <button onClick={logout} className="dash-logout">Terminate Session</button>
        </header>

        <main className="dash-main">
          <div className="dash-welcome">
            <h1>Hacker Dashboard</h1>
            <p>Welcome back, {user?.email}</p>
          </div>

          <div className="dash-grid">
            <div className="dash-card">
              <h3>System Status</h3>
              <div className="status-item">
                <span className="dot active"></span> Access Granted
              </div>
              <div className="status-item">
                <span className="dot active"></span> Network Connected
              </div>
            </div>

            <div className="dash-card">
              <h3>Profile Info</h3>
              <div className="info-row">
                <span>UID:</span> <code>{user?.uid}</code>
              </div>
              <div className="info-row">
                <span>Email:</span> {user?.email}
              </div>
              <div className="info-row">
                <span>Registered:</span> {user?.metadata?.creationTime ? new Date(user?.metadata?.creationTime).toLocaleDateString() : 'Unknown'}
              </div>
            </div>
            
            <div className="dash-card span-2">
              <h3>Next Steps</h3>
              <ul className="dash-steps">
                <li>Form your team (2-4 members) before deadlines.</li>
                <li>Submit your PPT before 20 September.</li>
                <li>Prepare for live demo showing hardware and software integration.</li>
              </ul>
            </div>
          </div>
        </main>

        <style>{`
          .dash-container { min-height:100vh; background:#030812; color:#f0f6ff; font-family:'Space Grotesk', sans-serif; display:flex; flex-direction:column; }
          .dash-header { display:flex; justify-content:space-between; align-items:center; padding:1.5rem 2rem; border-bottom:1px solid rgba(0,242,254,0.1); background:rgba(255,255,255,0.01); }
          .dash-brand { font-family:'Orbitron', sans-serif; font-size:1.25rem; font-weight:900; }
          .dash-brand span { color:#00f2fe; }
          .dash-logout { background:rgba(255,0,0,0.1); color:#ff4e4e; border:1px solid rgba(255,0,0,0.2); border-radius:6px; padding:0.55rem 1rem; cursor:pointer; font-size:0.8rem; font-family:'Orbitron', sans-serif; text-transform:uppercase; transition:all 0.2s; }
          .dash-logout:hover { background:rgba(255,0,0,0.2); }
          
          .dash-main { max-width:1000px; margin:0 auto; padding:3rem 2rem; width:100%; flex:1; }
          .dash-welcome h1 { font-family:'Orbitron', sans-serif; font-size:2.5rem; margin:0 0 0.5rem 0; color:#00f2fe; }
          .dash-welcome p { color:#94a3b8; font-size:1.1rem; margin-bottom:3rem; }

          .dash-grid { display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; }
          .dash-card { background:rgba(6,13,30,0.7); border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:1.5rem; position:relative; overflow:hidden; }
          .dash-card::before { content:''; position:absolute; top:0; left:0; width:12px; height:12px; border-top:2px solid rgba(0,242,254,0.4); border-left:2px solid rgba(0,242,254,0.4); }
          .dash-card h3 { font-family:'Orbitron', sans-serif; font-size:1rem; text-transform:uppercase; letter-spacing:0.1em; color:#f0f6ff; margin:0 0 1.25rem 0; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:0.75rem; }
          
          .span-2 { grid-column:1 / -1; }

          .status-item { display:flex; align-items:center; gap:0.5rem; margin-bottom:0.75rem; font-size:0.9rem; color:#94a3b8; }
          .dot { width:8px; height:8px; border-radius:50%; background:#4ade80; box-shadow:0 0 8px #4ade80; }
          
          .info-row { display:flex; margin-bottom:0.75rem; font-size:0.9rem; }
          .info-row span { width:100px; color:#64748b; }
          .info-row code { background:rgba(0,242,254,0.1); padding:0.2rem 0.4rem; border-radius:4px; color:#00f2fe; font-family:monospace; }

          .dash-steps { margin:0; padding-left:1.25rem; color:#94a3b8; font-size:0.95rem; line-height:1.7; }
          .dash-steps li { margin-bottom:0.5rem; }

          @media (max-width: 768px) {
            .dash-grid { grid-template-columns:1fr; }
            .dash-main { padding:2rem 1.5rem; }
            .dash-welcome h1 { font-size: 2rem; }
          }
        `}</style>
      </div>
    </ProtectedRoute>
  );
}
