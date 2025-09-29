import { useState, useEffect } from "react";

function Arsenal() {
  const [team, setteam] = useState({});
  useEffect(() => {
    const fechdata = async () => {
      const res = await fetch(
        "https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=Arsenal"
      );
      const data = await res.json();
    };
    fechdata();
  }, []);

  return <div>heelomfwmf</div>;
}

export default Arsenal;
