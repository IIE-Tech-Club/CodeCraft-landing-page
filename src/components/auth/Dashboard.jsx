import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { logout } from "../../services/authService";
import ProtectedRoute from "./ProtectedRoute";

const myInitiatives = [
  {
    id: "i-001",
    name: "Google Cloud AI Labs Series",
    roundEnds: "Feb 28, 2026",
    tags: ["Free", "In Person"],
    round: "Registration",
    actionLabel: "Dashboard"
  },
  {
    id: "i-002",
    name: "Smart Campus Sprint",
    roundEnds: "Mar 14, 2026",
    tags: ["Team", "Prototype"],
    round: "Idea Screening",
    actionLabel: "Continue"
  },
  {
    id: "i-003",
    name: "HealthTech Buildathon",
    roundEnds: "Apr 2, 2026",
    tags: ["Mentored", "Hybrid"],
    round: "Submission",
    actionLabel: "Open"
  }
];

const recommendedInitiatives = [
  {
    id: "r-001",
    name: "Future Energy Challenge",
    roundEnds: "May 11, 2026",
    tags: ["Hardware", "National"],
    round: "Registration",
    actionLabel: "View"
  },
  {
    id: "r-002",
    name: "EduTech Innovation Cup",
    roundEnds: "May 20, 2026",
    tags: ["Student", "Online"],
    round: "Registration",
    actionLabel: "Apply"
  }
];

const myApplications = [
  {
    id: "a-001",
    name: "Urban Mobility Hackweek",
    roundEnds: "Apr 30, 2026",
    tags: ["Reviewed", "Team"],
    round: "Result Pending",
    actionLabel: "Track"
  }
];

const tabs = [
  { id: "my-initiatives", label: "My Initiatives" },
  { id: "recommended", label: "Recommended Initiatives" },
  { id: "applications", label: "My Applications" }
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("my-initiatives");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Current user will be available here because of ProtectedRoute
    setUser(auth.currentUser);
  }, []);

  const currentRows =
    activeTab === "my-initiatives"
      ? myInitiatives
      : activeTab === "recommended"
        ? recommendedInitiatives
        : myApplications;

  const filteredRows = currentRows.filter((row) => {
    if (!searchText.trim()) return true;
    return row.name.toLowerCase().includes(searchText.toLowerCase());
  });

  const profileName =
    user?.displayName ||
    user?.email?.split("@")[0]?.replace(/[._]/g, " ") ||
    "Student";

  const initials = profileName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <ProtectedRoute>
      <div className="student-shell">
        <header className="hero-strip">
          <div className="hero-top-row">
            <div className="hero-brand">CODECRAFT Student Hub</div>
            <button className="hero-logout" onClick={logout}>Logout</button>
          </div>

          <div className="hero-copy">
            <h1>Student Dashboard</h1>
            <p>Manage initiatives, deadlines, and submissions from one practical workspace.</p>
          </div>

          <div className="hero-travel-dots" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </header>

        <main className="student-main">
          <aside className="left-column">
            <section className="profile-card">
              <div className="profile-head">
                <div className="avatar-wrap">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Student avatar" className="avatar-img" />
                  ) : (
                    <span className="avatar-fallback">{initials || "S"}</span>
                  )}
                </div>

                <div className="profile-copy">
                  <h2>{profileName}</h2>
                  <p>{user?.email || "No email available"}</p>
                </div>
              </div>

              <div className="profile-badges">
                <span className="pill level">Update Profile</span>
                <span className="pill role">Innovator</span>
              </div>

              <div className="profile-meta">
                <div>
                  <span>UID</span>
                  <strong>{user?.uid?.slice(0, 12) || "N/A"}</strong>
                </div>
                <div>
                  <span>Joined</span>
                  <strong>
                    {user?.metadata?.creationTime
                      ? new Date(user.metadata.creationTime).toLocaleDateString()
                      : "Unknown"}
                  </strong>
                </div>
              </div>
            </section>

            <section className="stats-card">
              <h3>Statistics</h3>

              <div className="stats-item">
                <span>Active Initiatives</span>
                <strong>{myInitiatives.length}</strong>
              </div>

              <div className="stats-item">
                <span>Submitted</span>
                <strong>{myApplications.length}</strong>
              </div>
            </section>
          </aside>

          <section className="board-card">
            <div className="board-header">
              <div className="tab-row" role="tablist" aria-label="Dashboard tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <label className="search-box" aria-label="Search initiatives">
                <input
                  type="text"
                  placeholder="Search initiatives"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                />
              </label>
            </div>

            <div className="board-copy">
              <h3>{tabs.find((tab) => tab.id === activeTab)?.label}</h3>
              <p>Access a complete listing of initiatives you are participating in or tracking.</p>
              <span className="board-note">This is your primary dashboard view.</span>
            </div>

            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Initiative Name</th>
                    <th>Tags</th>
                    <th>Ongoing Round</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRows.length ? (
                    filteredRows.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <div className="initiative-cell">
                            <span className="initiative-mark" aria-hidden="true">CC</span>
                            <div>
                              <strong>{row.name}</strong>
                              <small>Round Ends On : {row.roundEnds}</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="tag-list">
                            {row.tags.map((tag) => (
                              <span className="tag-pill" key={`${row.id}-${tag}`}>{tag}</span>
                            ))}
                          </div>
                        </td>
                        <td>{row.round}</td>
                        <td>
                          <button className="action-btn">{row.actionLabel}</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="empty-row" colSpan="4">
                        No initiatives found for your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="board-footer">
              <div className="rows-per-page">
                Rows per page
                <select defaultValue="10" aria-label="Rows per page">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>

              <div className="pager">
                <button aria-label="Previous page">{"<"}</button>
                <button className="page-active" aria-label="Page 1">1</button>
                <button aria-label="Next page">{">"}</button>
              </div>
            </div>
          </section>
        </main>

        <style>{`
          .student-shell {
            min-height: 100vh;
            background:
              radial-gradient(circle at 85% -10%, rgba(31, 95, 217, 0.14), transparent 40%),
              linear-gradient(180deg, #eef3fb 0%, #eef1f7 38%, #e9edf5 100%);
            color: #27374d;
            font-family: 'Space Grotesk', sans-serif;
            padding: 1.25rem;
          }

          .hero-strip {
            border-radius: 20px;
            padding: 1.2rem 1.5rem 1.8rem;
            background:
              radial-gradient(circle at 20% -40%, rgba(71, 197, 255, 0.35), transparent 55%),
              linear-gradient(135deg, #0e2c71 0%, #153f91 38%, #19358e 100%);
            color: #f8fbff;
            position: relative;
            overflow: hidden;
            box-shadow: 0 16px 28px rgba(10, 30, 84, 0.25);
            margin-bottom: 1rem;
          }

          .hero-strip::after {
            content: "";
            position: absolute;
            inset: 0;
            background-image: repeating-linear-gradient(
              -8deg,
              rgba(255, 255, 255, 0.14) 0,
              rgba(255, 255, 255, 0.14) 1px,
              transparent 1px,
              transparent 16px
            );
            opacity: 0.32;
            pointer-events: none;
            z-index: 0;
          }

          .hero-top-row,
          .hero-copy {
            position: relative;
            z-index: 2;
          }

          .hero-travel-dots {
            position: absolute;
            inset: -8% -4%;
            overflow: hidden;
            pointer-events: none;
            z-index: 1;
            transform: rotate(-8deg);
            transform-origin: center;
            opacity: 0.88;
            mix-blend-mode: screen;
          }

          .hero-travel-dots span {
            --dot-size: 6px;
            position: absolute;
            left: -14%;
            top: 24%;
            width: var(--dot-size);
            height: var(--dot-size);
            border-radius: 999px;
            background: #84efff;
            box-shadow: 0 0 10px rgba(0, 242, 254, 0.95), 0 0 22px rgba(0, 242, 254, 0.5);
            animation: hero-dot-travel 8s linear infinite;
          }

          .hero-travel-dots span::after {
            content: "";
            position: absolute;
            top: 50%;
            left: -42px;
            width: 42px;
            height: 1px;
            transform: translateY(-50%);
            background: linear-gradient(90deg, transparent, rgba(0, 242, 254, 0.45));
          }

          .hero-travel-dots span:nth-child(1) {
            top: 16%;
            --dot-size: 5px;
            animation-duration: 9.4s;
            animation-delay: -1.2s;
          }

          .hero-travel-dots span:nth-child(2) {
            top: 26%;
            --dot-size: 6px;
            animation-duration: 8.3s;
            animation-delay: -3.8s;
          }

          .hero-travel-dots span:nth-child(3) {
            top: 38%;
            --dot-size: 4px;
            animation-duration: 7.7s;
            animation-delay: -2.3s;
          }

          .hero-travel-dots span:nth-child(4) {
            top: 52%;
            --dot-size: 7px;
            animation-duration: 8.8s;
            animation-delay: -5.6s;
          }

          .hero-travel-dots span:nth-child(5) {
            top: 66%;
            --dot-size: 5px;
            animation-duration: 7.3s;
            animation-delay: -4.5s;
          }

          .hero-travel-dots span:nth-child(6) {
            top: 78%;
            --dot-size: 6px;
            animation-duration: 8.1s;
            animation-delay: -6.7s;
          }

          .hero-travel-dots span:nth-child(7) {
            top: 88%;
            --dot-size: 4px;
            animation-duration: 9.1s;
            animation-delay: -7.8s;
          }

          @keyframes hero-dot-travel {
            0% {
              transform: translateX(0);
              opacity: 0;
            }

            8% {
              opacity: 0.9;
            }

            92% {
              opacity: 0.75;
            }

            100% {
              transform: translateX(126%);
              opacity: 0;
            }
          }

          .hero-top-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.3rem;
          }

          .hero-brand {
            font-family: 'Orbitron', sans-serif;
            font-size: 0.95rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
          }

          .hero-logout {
            border: 0;
            background: rgba(255, 255, 255, 0.14);
            color: #f6f9ff;
            border-radius: 999px;
            padding: 0.45rem 0.95rem;
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            transition: background 0.2s ease;
          }

          .hero-logout:hover {
            background: rgba(255, 255, 255, 0.25);
          }

          .hero-copy h1 {
            margin: 0;
            font-size: clamp(1.4rem, 2.4vw, 2rem);
            font-family: 'Orbitron', sans-serif;
            letter-spacing: 0.02em;
          }

          .hero-copy p {
            margin: 0.45rem 0 0;
            color: rgba(238, 246, 255, 0.9);
            max-width: 760px;
          }

          .student-main {
            display: grid;
            grid-template-columns: 300px minmax(0, 1fr);
            gap: 1rem;
            align-items: start;
          }

          .left-column {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .profile-card,
          .stats-card,
          .board-card {
            background: #fdfefe;
            border: 1px solid #dce5f2;
            border-radius: 16px;
            box-shadow: 0 8px 20px rgba(60, 75, 98, 0.08);
          }

          .profile-card {
            padding: 1rem;
          }

          .profile-head {
            display: flex;
            align-items: center;
            gap: 0.85rem;
            margin-bottom: 0.85rem;
          }

          .avatar-wrap {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            overflow: hidden;
            background: linear-gradient(135deg, #5fb0ff, #2856a8);
            flex-shrink: 0;
            display: grid;
            place-items: center;
            border: 3px solid #f7faff;
            box-shadow: 0 6px 14px rgba(40, 86, 168, 0.28);
          }

          .avatar-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .avatar-fallback {
            color: #f6fbff;
            font-weight: 700;
            font-size: 1.2rem;
          }

          .profile-copy h2 {
            margin: 0;
            font-size: 1.28rem;
            color: #21314c;
            text-transform: capitalize;
          }

          .profile-copy p {
            margin: 0.22rem 0 0;
            color: #61728d;
            font-size: 0.9rem;
            overflow-wrap: anywhere;
          }

          .profile-badges {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.55rem;
            margin-bottom: 0.85rem;
          }

          .pill {
            text-align: center;
            font-weight: 700;
            border-radius: 10px;
            padding: 0.48rem 0.55rem;
            font-size: 0.78rem;
            text-transform: uppercase;
            letter-spacing: 0.03em;
          }

          .pill.level {
            background: #e5eefc;
            color: #2d57be;
          }

          .pill.role {
            background: #e5f8eb;
            color: #1e8c43;
          }

          .profile-meta {
            display: grid;
            gap: 0.6rem;
          }

          .profile-meta div {
            display: flex;
            justify-content: space-between;
            gap: 0.8rem;
            border-top: 1px dashed #d9e2ef;
            padding-top: 0.55rem;
          }

          .profile-meta span {
            color: #667891;
            font-size: 0.82rem;
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }

          .profile-meta strong {
            color: #20324f;
            font-size: 0.88rem;
            max-width: 140px;
            text-align: right;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .stats-card {
            padding: 1rem;
          }

          .stats-card h3 {
            margin: 0 0 0.85rem;
            color: #233553;
            font-size: 1.08rem;
          }

          .stats-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            padding: 0.72rem 0.78rem;
            border-radius: 12px;
            border: 1px solid #e1e9f5;
            background: #f4f7fc;
            margin-top: 0.62rem;
          }

          .stats-item span {
            color: #4e6180;
          }

          .stats-item strong {
            color: #1f3356;
            font-size: 1.24rem;
          }

          .board-card {
            padding: 1rem;
          }

          .board-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.9rem;
            flex-wrap: wrap;
          }

          .tab-row {
            background: #edf1f8;
            border: 1px solid #dae2f1;
            border-radius: 12px;
            display: flex;
            flex-wrap: wrap;
            gap: 0.3rem;
            padding: 0.3rem;
          }

          .tab-btn {
            border: 0;
            border-radius: 9px;
            background: transparent;
            color: #4f6180;
            padding: 0.55rem 0.92rem;
            font-weight: 700;
            font-size: 0.92rem;
          }

          .tab-btn.active {
            background: #ffffff;
            color: #2a3d5d;
            box-shadow: 0 2px 8px rgba(73, 88, 113, 0.14);
          }

          .search-box {
            min-width: 260px;
            flex: 1;
            max-width: 360px;
          }

          .search-box input {
            width: 100%;
            border: 1px solid #d7e0ef;
            border-radius: 12px;
            font-size: 0.92rem;
            padding: 0.64rem 0.86rem;
            color: #293c5b;
            background: #fcfdff;
          }

          .search-box input:focus {
            outline: 2px solid rgba(34, 108, 208, 0.2);
            border-color: #9fb6e2;
          }

          .board-copy {
            margin-top: 1rem;
            margin-bottom: 0.8rem;
          }

          .board-copy h3 {
            margin: 0;
            color: #243655;
            font-size: 1.62rem;
          }

          .board-copy p {
            margin: 0.4rem 0 0.52rem;
            color: #657791;
          }

          .board-note {
            display: inline-block;
            background: #e8efff;
            color: #325ebe;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            padding: 0.42rem 0.62rem;
          }

          .table-scroll {
            overflow-x: auto;
            border: 1px solid #dde5f2;
            border-radius: 14px;
            background: #ffffff;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            min-width: 780px;
          }

          th {
            text-align: left;
            color: #536783;
            font-size: 0.88rem;
            text-transform: uppercase;
            letter-spacing: 0.03em;
            padding: 0.88rem;
            border-bottom: 1px solid #e3eaf6;
            background: #f8fbff;
          }

          td {
            padding: 0.88rem;
            border-bottom: 1px solid #ecf1f9;
            color: #334863;
            vertical-align: middle;
          }

          tbody tr:last-child td {
            border-bottom: 0;
          }

          .initiative-cell {
            display: flex;
            gap: 0.72rem;
            align-items: center;
          }

          .initiative-mark {
            width: 42px;
            height: 42px;
            border-radius: 10px;
            background: linear-gradient(135deg, #1d58bf, #66a2ff);
            color: #f7fbff;
            display: grid;
            place-items: center;
            font-size: 0.72rem;
            font-family: 'Orbitron', sans-serif;
            letter-spacing: 0.06em;
            flex-shrink: 0;
          }

          .initiative-cell strong {
            display: block;
            font-size: 1rem;
            color: #2a3e5d;
          }

          .initiative-cell small {
            display: block;
            margin-top: 0.22rem;
            color: #6f8199;
            font-size: 0.82rem;
          }

          .tag-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.35rem;
          }

          .tag-pill {
            border: 1px solid #dbe5f4;
            border-radius: 999px;
            background: #f6f9ff;
            color: #4b5f81;
            font-size: 0.78rem;
            padding: 0.2rem 0.52rem;
            white-space: nowrap;
          }

          .action-btn {
            border: 1px solid #5c88d8;
            background: #f7fbff;
            color: #3569bf;
            border-radius: 9px;
            font-size: 0.78rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 0.45rem 0.72rem;
          }

          .action-btn:hover {
            background: #e8f1ff;
          }

          .empty-row {
            text-align: center;
            color: #7a8ca5;
            padding: 1.7rem;
          }

          .board-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 0.82rem;
            gap: 0.8rem;
            flex-wrap: wrap;
          }

          .rows-per-page {
            color: #5d708d;
            font-size: 0.92rem;
            display: flex;
            align-items: center;
            gap: 0.52rem;
          }

          .rows-per-page select {
            border: 1px solid #cad8ee;
            border-radius: 8px;
            background: #ffffff;
            padding: 0.35rem 0.45rem;
            color: #304563;
          }

          .pager {
            display: flex;
            gap: 0.4rem;
          }

          .pager button {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            border: 1px solid #d4dfef;
            background: #ffffff;
            color: #4c5f7f;
            font-weight: 700;
          }

          .pager .page-active {
            border-color: #356abd;
            background: #356abd;
            color: #ffffff;
          }

          /* Dark theme override to align dashboard with site look and feel. */
          .student-shell {
            background:
              radial-gradient(circle at 84% -12%, rgba(0, 242, 254, 0.15), transparent 42%),
              linear-gradient(180deg, #06101f 0%, #040c18 45%, #030812 100%);
            color: #e8f2ff;
          }

          .hero-strip {
            background:
              radial-gradient(circle at 18% -40%, rgba(0, 242, 254, 0.28), transparent 56%),
              linear-gradient(135deg, #0b2155 0%, #102a67 36%, #0a1e4a 100%);
            color: #eaf7ff;
            box-shadow: 0 16px 28px rgba(2, 10, 28, 0.45);
          }

          .hero-strip::after {
            opacity: 0.22;
          }

          .hero-copy p {
            color: rgba(220, 236, 255, 0.88);
          }

          .hero-logout {
            background: rgba(3, 8, 18, 0.36);
            border: 1px solid rgba(190, 220, 255, 0.22);
            color: #e6f5ff;
          }

          .hero-logout:hover {
            background: rgba(0, 242, 254, 0.16);
          }

          .left-column {
            background: rgba(6, 13, 30, 0.64);
            border: 1px solid rgba(152, 178, 219, 0.18);
            border-radius: 16px;
            box-shadow: 0 10px 18px rgba(1, 7, 20, 0.3);
            padding: 0.92rem;
            gap: 0.75rem;
          }

          .profile-card,
          .stats-card {
            background: transparent;
            border: 0;
            box-shadow: none;
          }

          .board-card {
            background: rgba(6, 13, 30, 0.86);
            border: 1px solid rgba(152, 178, 219, 0.18);
            box-shadow: 0 12px 22px rgba(1, 7, 20, 0.38);
          }

          .profile-copy h2 {
            color: #ebf4ff;
          }

          .profile-copy p {
            color: #9eb4d2;
          }

          .pill.level {
            background: rgba(74, 132, 234, 0.22);
            color: #9cc8ff;
            border: 1px solid rgba(131, 174, 243, 0.35);
          }

          .pill.role {
            background: rgba(46, 173, 102, 0.2);
            color: #8de2ac;
            border: 1px solid rgba(102, 209, 143, 0.32);
          }

          .profile-meta div {
            border-top-color: rgba(133, 155, 191, 0.32);
          }

          .profile-meta span {
            color: #8ea6c8;
          }

          .profile-meta strong {
            color: #deecff;
          }

          .stats-card {
            padding: 0.9rem 0 0;
            margin-top: 0.15rem;
            border-top: 1px solid rgba(133, 155, 191, 0.24);
          }

          .stats-card h3 {
            color: #dcebff;
          }

          .stats-item {
            border: 0;
            border-bottom: 1px dashed rgba(129, 152, 194, 0.34);
            border-radius: 0;
            background: transparent;
            margin-top: 0;
            padding: 0.72rem 0.08rem;
          }

          .stats-card .stats-item:last-child {
            border-bottom: 0;
            padding-bottom: 0.1rem;
          }

          .stats-item span {
            color: #a4b9d6;
          }

          .stats-item strong {
            color: #e5f1ff;
          }

          .tab-row {
            background: transparent;
            border: 0;
            padding: 0;
            gap: 0.45rem;
          }

          .tab-btn {
            color: #9ab1d1;
            border: 1px solid transparent;
            border-radius: 999px;
          }

          .tab-btn.active {
            background: rgba(0, 242, 254, 0.12);
            border-color: rgba(0, 242, 254, 0.36);
            color: #dcf9ff;
            box-shadow: none;
          }

          .search-box input {
            border-color: rgba(132, 164, 208, 0.28);
            background: rgba(5, 12, 24, 0.96);
            color: #dbeaff;
          }

          .search-box input::placeholder {
            color: #7f96b6;
          }

          .search-box input:focus {
            outline: 2px solid rgba(0, 242, 254, 0.2);
            border-color: rgba(0, 242, 254, 0.55);
          }

          .board-copy h3 {
            color: #e7f1ff;
          }

          .board-copy p {
            color: #a1b6d2;
          }

          .board-note {
            background: transparent;
            color: #8deeff;
            border: 0;
            padding: 0;
          }

          .board-note::before {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #6bdfff;
            box-shadow: 0 0 10px rgba(0, 242, 254, 0.5);
            display: inline-block;
            margin-right: 0.45rem;
          }

          .table-scroll {
            border: 0;
            border-radius: 0;
            background: transparent;
          }

          th {
            color: #98accb;
            border-bottom-color: rgba(118, 143, 184, 0.34);
            background: transparent;
          }

          td {
            border-bottom-color: rgba(107, 132, 174, 0.26);
            color: #d4e5ff;
          }

          .initiative-mark {
            background: linear-gradient(135deg, #0f5de3, #00cbe9);
            color: #f4fbff;
          }

          .initiative-cell strong {
            color: #ebf4ff;
          }

          .initiative-cell small {
            color: #91a8c8;
          }

          .tag-pill {
            border: 0;
            border-radius: 0;
            background: transparent;
            color: #a9c4e8;
            padding: 0;
            font-size: 0.83rem;
          }

          .tag-pill + .tag-pill {
            padding-left: 0.7rem;
            position: relative;
          }

          .tag-pill + .tag-pill::before {
            content: "•";
            color: rgba(148, 177, 220, 0.75);
            position: absolute;
            left: 0;
            top: 0;
          }

          .action-btn {
            border: 0;
            background: transparent;
            color: #86d4ff;
            padding: 0;
            text-decoration: underline;
            text-decoration-color: rgba(134, 212, 255, 0.55);
            text-underline-offset: 0.2em;
          }

          .action-btn:hover {
            background: transparent;
            color: #c5e7ff;
            text-decoration-color: rgba(197, 231, 255, 0.9);
          }

          @media (hover: none), (pointer: coarse) {
            .hero-logout,
            .action-btn,
            .pager button {
              touch-action: manipulation;
            }

            .hero-logout:hover {
              background: rgba(3, 8, 18, 0.36);
            }

            .action-btn:hover {
              background: transparent;
              color: #86d4ff;
              text-decoration-color: rgba(134, 212, 255, 0.55);
            }

            .hero-logout:active,
            .action-btn:active,
            .pager button:active {
              opacity: 0.86;
            }
          }

          .empty-row {
            color: #8ea4c4;
          }

          .rows-per-page {
            color: #96accb;
          }

          .rows-per-page select {
            border-color: rgba(129, 160, 203, 0.36);
            background: rgba(10, 19, 37, 0.95);
            color: #d4e6ff;
          }

          .pager button {
            border: 0;
            background: transparent;
            color: #a8c1e3;
            width: auto;
            height: auto;
            border-radius: 0;
            padding: 0.18rem 0.4rem;
          }

          .pager .page-active {
            border: 0;
            background: transparent;
            color: #6bdeff;
          }

          @media (prefers-reduced-motion: reduce) {
            .hero-travel-dots span {
              animation: none;
              opacity: 0.35;
            }
          }

          @media (max-width: 1080px) {
            .student-main {
              grid-template-columns: 1fr;
            }

            .left-column {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 760px) {
            .student-shell {
              padding: 0.9rem;
            }

            .hero-strip {
              padding: 1rem 1rem 1.45rem;
            }

            .hero-top-row {
              margin-bottom: 1rem;
            }

            .left-column {
              grid-template-columns: 1fr;
            }

            .profile-badges {
              grid-template-columns: 1fr;
            }

            .search-box {
              min-width: 0;
              max-width: none;
              width: 100%;
            }

            .board-copy h3 {
              font-size: 1.28rem;
            }
          }
        `}</style>
      </div>
    </ProtectedRoute>
  );
}
