import { useEffect, useState } from "react";
import "./football.css";

export default function Football() {
  const [competitions, setCompetitions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedComp, setSelectedComp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchCompetitions = async () => {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch("http://localhost:4000/api/competitions");
        const data = await res.json();
        setCompetitions(data.competitions || []);
      } catch (e) {
        setErr("خطا در دریافت مسابقات: " + e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCompetitions();
  }, []);

  const loadTeams = async (comp) => {
    if (!comp || !comp.id) return;
    setSelectedComp(comp);
    setTeams([]);
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/api/competitions/${comp.id}/teams`);
      const json = await res.json();
      setTeams(json.teams || []);
    } catch (e) {
      setErr("خطا در دریافت تیم‌ها: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="football-container">
      <h2>لیست لیگ‌ها / رقابت‌ها</h2>
      {loading && <p className="loading">در حال دریافت اطلاعات ...</p>}
      {err && <p className="error">{err}</p>}

      <div className="football-grid">
        <div className="competitions">
          <ul>
            {competitions.map((c) => (
              <li
                key={c.id}
                onClick={() => loadTeams(c)}
                className={selectedComp?.id === c.id ? "selected" : ""}
              >
                <strong>{c.name}</strong>
                <div className="area">{c.area?.name} • {c.code || "—"}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="teams">
          <h3>
            تیم‌ها {selectedComp ? `در ${selectedComp.name}` : "(یکی را انتخاب کنید)"}
          </h3>

          <div className="teams-grid">
            {teams.length === 0 && !loading && <div>تیمی نمایش داده نمی‌شود.</div>}
            {teams.map((t) => (
              <div key={t.id} className="team-card">
                <div className="team-logo">
                  {t.crest && <img src={t.crest} alt={t.name} />}
                </div>
                <h4>{t.name}</h4>
                <div className="team-info">{t.shortName || t.tla}</div>
                <div className="team-info">
                  <strong>Stadium:</strong> {t.venue || "—"}
                </div>
                {t.website && (
                  <a href={t.website} target="_blank" rel="noreferrer" className="team-link">
                    وبسایت
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

