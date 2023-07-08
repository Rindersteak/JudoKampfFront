import React, { useState, useEffect } from "react";
import "./RulesEdit.scss";
import {getRules} from "../../../API/rulesAPI";
import { useLocation } from "react-router-dom";
import {
  deleteTournament,
  postTournament,
  getTournaments,
} from "../../../API/tournamentAPI";
import { Tournament } from "../../../types";

type MenuOption = "menuRulesAdults" | "menuRulesTeenagers" | "menuClasses";

const RulesEdit = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuOption | null>(null);
  const [rulesData, setRulesData] = useState(null);
  const [error, setError] = useState<Error | null>(null);
  const [tournament, setTournament] = useState<Tournament | null>(null);
// ...
const [selectedOption, setSelectedOption] = useState<string | null>(null);
// ...

  const location = useLocation(); // get current URL
  const tournamentId = location.pathname.split("/").pop() || "";

  const [goldenScoreAdult, setGoldenScoreAdult] = useState("");
  const [anzahlStrafenAdult, setAnzahlStrafenAdult] = useState("");
  const [punkteIpponAdult, setPunkteIpponAdult] = useState("");
  const [punkteWasariAdult, setPunkteWasariAdult] = useState("");
  const [haltezeitIpponAdult, setHaltezeitIpponAdult] = useState("");
  const [haltezeitWasariAdult, setHaltezeitWasariAdult] = useState("");

  const [goldenScoreYouth, setGoldenScoreYouth] = useState("");
  const [anzahlStrafenYouth, setAnzahlStrafenYouth] = useState("");
  const [punkteIpponYouth, setPunkteIpponYouth] = useState("");
  const [punkteWasariYouth, setPunkteWasariYouth] = useState("");
  const [haltezeitIpponYouth, setHaltezeitIpponYouth] = useState("");
  const [haltezeitWasariYouth, setHaltezeitWasariYouth] = useState("");

   // Funktion zum Abrufen der Turnierdetails anhand der ID
   useEffect(() => {
    const fetchTournament = async () => {
      try {
        const tournaments = await getTournaments();
        const tournament = getTournamentDetailsById(
          tournamentId ?? undefined,
          tournaments
        );
        setTournament(tournament);
        const selectedTournament = tournaments.find(
          (t: Tournament) => t.id === tournament?.id
        );
        console.log(selectedTournament);
        if (selectedTournament) {
          setGoldenScoreAdult(selectedTournament.rule.goldenScoreAdult);

          setAnzahlStrafenAdult(selectedTournament.rule.foulsAdult);
          setPunkteIpponAdult(selectedTournament.rule.pointsIpponAdult);
          setPunkteWasariAdult(selectedTournament.rule.pointsWazaariAdult);
          setHaltezeitIpponAdult(selectedTournament.rule.holdingTimeIpponAdult);
          setHaltezeitWasariAdult(selectedTournament.rule.holdingTimeWazaariAdult);


          setGoldenScoreYouth(selectedTournament.rule.goldenScoreYouth);

          setAnzahlStrafenYouth(selectedTournament.rule.foulsYouth);
          setPunkteIpponYouth(selectedTournament.rule.pointsIpponYouth);
          setPunkteWasariYouth(selectedTournament.rule.pointsWazaariYouth);
          setHaltezeitIpponYouth(selectedTournament.rule.holdingTimeIpponYouth);
          setHaltezeitWasariYouth(selectedTournament.rule.holdingTimeWazaariYouth);

        }
      } catch (error) {
        console.error("Error loading tournament:", error);
      }
    };

    fetchTournament();
  }, [tournamentId]);

  const getTournamentDetailsById = (
    tournamentId: string | undefined,
    tournaments: Tournament[]
  ): Tournament | null => {
    if (!tournamentId) {
      console.log("keine ID");
      return null;
    }
    const tournament = tournaments.find((t) => t.id === parseInt(tournamentId));
    //console.log(tournament)
    return tournament || null;
  };


  const handleMenuClick = (menu: MenuOption) => {
    setSelectedMenu(menu);
  };

  const rulesContentAdult = () => {
    return (
      <div className="mainContainerContent">
        <div className="inputContainer">
          <label className="inputLabel">Golden Score:</label>
          <select
            className="inputField"
            value={goldenScoreAdult}
            onChange={(e) => setGoldenScoreAdult(e.target.value)}
          >
            <option value="option1">Ja, beschränkt</option>
            <option value="option2">Ja, unbeschränkt</option>
            <option value="option3">Nein</option>
          </select>
        </div>

        <div className="inputContainer">
          <label className="inputLabel">Anzahl Strafen:</label>
          <input
            className="inputField"
            type = "text"
            id = "anzahlStrafenAdult"
            value={anzahlStrafenAdult}
            onChange={(event) => setAnzahlStrafenAdult(event.target.value)}
          />
        </div>

        <div className="eponWasariContainer">
          <div className="pointsEponWasariContainer">
            <div className="pointsEpponContainer">
              <label className="inputLabel">Punkte Ippon:</label>
              <input className="inputField"
            value={punkteIpponAdult}
            onChange={(e) => setPunkteIpponAdult(e.target.value)}
          />
            </div>
            <div></div>
            <div className="pointsWasariContainer">
              <label className="inputLabel">Punkte Waza-ari:</label>
              <input className="inputField"
                      value={punkteWasariAdult}
                      onChange={(e) => setPunkteWasariAdult(e.target.value)}
                    />
            </div>
          </div>

          <div className="holdTimeEponWasari">
            <div className="holdTimeEpponContainer">
              <label className="inputLabel">Haltezeit Ippon:</label>
              <input className="inputField"
                      value={haltezeitIpponAdult}
                      onChange={(e) => setHaltezeitIpponAdult(e.target.value)}
                    />
            </div>

            <div></div>

            <div className="pointsWasariContainer">
              <label className="inputLabel">Haltezeit Waza-ari:</label>
              <input className="inputField"
                      value={haltezeitWasariAdult}
                      onChange={(e) => setHaltezeitWasariAdult(e.target.value)}
                    />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const rulesContentYouth = () => {
    return (
      <div className="mainContainerContent">
        <div className="inputContainer">
          <label className="inputLabel">Golden Score:</label>
          <select
            className="inputField"
            value={goldenScoreYouth}
            onChange={(e) => setGoldenScoreYouth(e.target.value)}
          >
            <option value="option1">Ja, beschränkt</option>
            <option value="option2">Ja, unbeschränkt</option>
            <option value="option3">Nein</option>
          </select>
        </div>

        <div className="inputContainer">
          <label className="inputLabel">Anzahl Strafen:</label>
          <input className="inputField"
                      value={anzahlStrafenYouth}
                      onChange={(e) => setAnzahlStrafenYouth(e.target.value)}
                    />
        </div>

        <div className="eponWasariContainer">
          <div className="pointsEponWasariContainer">
            <div className="pointsEpponContainer">
              <label className="inputLabel">Punkte Ippon:</label>
              <input className="inputField"
                      value={punkteIpponYouth}
                      onChange={(e) => setPunkteIpponYouth(e.target.value)}
                    />
            </div>
            <div></div>
            <div className="pointsWasariContainer">
              <label className="inputLabel">Punkte Waza-ari:</label>
              <input className="inputField"
                      value={punkteWasariYouth}
                      onChange={(e) => setPunkteWasariYouth(e.target.value)}
                    />
            </div>
          </div>

          <div className="holdTimeEponWasari">
            <div className="holdTimeEpponContainer">
              <label className="inputLabel">Haltezeit Ippon:</label>
              <input className="inputField"
                      value={haltezeitIpponYouth}
                      onChange={(e) => setHaltezeitIpponYouth(e.target.value)}
                    />
            </div>

            <div></div>

            <div className="pointsWasariContainer">
              <label className="inputLabel">Haltezeit Waza-ari:</label>
              <input className="inputField"
                      value={haltezeitWasariYouth}
                      onChange={(e) => setHaltezeitWasariYouth(e.target.value)}
                    />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleCategoryOptionClick = (option: string) => {
    setSelectedOption(option);
  };

      





  const classContent = () => {
    if (selectedOption === "Weibliche Jugend U11") {
      // Render content for Weibliche Jugend U11
      return (
        <div>
          <div className="mainContentContainer">
          <div className="womenAgeClassesContainer">
          <div className="category">Frauen</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U11")}>
            Weibliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U13")}>
            Weibliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U15")}>
            Weibliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen U18")}>
            Frauen U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen")}>
            Frauen
          </div>

        </div>
        <div className="menAgeClassesContainer">
          <div className="category">Männer</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U11")}>
            Männliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U13")}>
          Männliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U15")}>
          Männliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer U18")}>
          Männer U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer")}>
          Männer
          </div>
        </div>
        <div className="classesInputContent">
          <div className="inputContainer">
            <label className="inputLabel">Klassenname</label>
            <input className="inputField"></input>
          </div>

          <div className="ageLimitAndFightDurationContainer">
            <div className="ageLimitContainer">
              <label className="inputLabel">Altersgrenze</label>
              <input className="inputField"></input>
            </div>
            <div></div>
            <div className="fightDurationContainer">
              <label className="inputLabel">Kampfzeit (min)</label>
              <input className="inputField"></input>
            </div>
          </div>

          <div className="inputContainer">
            <label className="inputLabel">Gewicht (kg)</label>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
          </div>
        </div>
      </div>
        </div>
      );
    } else if (selectedOption === "Weibliche Jugend U13") {
      // Render content for Weibliche Jugend U13
      return (
        <div>
          <div className="mainContentContainer">
          <div className="womenAgeClassesContainer">
          <div className="category">Frauen</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U11")}>
            Weibliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U13")}>
            Weibliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U15")}>
            Weibliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen U18")}>
            Frauen U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen")}>
            Frauen
          </div>

        </div>
        <div className="menAgeClassesContainer">
          <div className="category">Männer</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U11")}>
            Männliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U13")}>
          Männliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U15")}>
          Männliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer U18")}>
          Männer U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer")}>
          Männer
          </div>
        </div>

        <div className="classesInputContent">
          <div className="inputContainer">
            <label className="inputLabel">Klassenname</label>
            <input className="inputField"></input>
          </div>

          <div className="ageLimitAndFightDurationContainer">
            <div className="ageLimitContainer">
              <label className="inputLabel">Altersgrenze</label>
              <input className="inputField"></input>
            </div>
            <div></div>
            <div className="fightDurationContainer">
              <label className="inputLabel">Kampfzeit (min)</label>
              <input className="inputField"></input>
            </div>
          </div>

          <div className="inputContainer">
            <label className="inputLabel">Gewicht (kg)</label>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
          </div>
        </div>
      </div>
        </div>
      );
    } else if (selectedOption === "Weibliche Jugend U15") {
      // Render content for Weibliche Jugend U15
      return (
        <div>
          <div className="mainContentContainer">
          <div className="womenAgeClassesContainer">
          <div className="category">Frauen</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U11")}>
            Weibliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U13")}>
            Weibliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U15")}>
            Weibliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen U18")}>
            Frauen U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen")}>
            Frauen
          </div>

        </div>
        <div className="menAgeClassesContainer">
          <div className="category">Männer</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U11")}>
            Männliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U13")}>
          Männliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U15")}>
          Männliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer U18")}>
          Männer U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer")}>
          Männer
          </div>
        </div>

        <div className="classesInputContent">
          <div className="inputContainer">
            <label className="inputLabel">Klassenname</label>
            <input className="inputField"></input>
          </div>

          <div className="ageLimitAndFightDurationContainer">
            <div className="ageLimitContainer">
              <label className="inputLabel">Altersgrenze</label>
              <input className="inputField"></input>
            </div>
            <div></div>
            <div className="fightDurationContainer">
              <label className="inputLabel">Kampfzeit (min)</label>
              <input className="inputField"></input>
            </div>
          </div>

          <div className="inputContainer">
            <label className="inputLabel">Gewicht (kg)</label>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
          </div>
        </div>
      </div>
        </div>
      );
    } else if (selectedOption === "Frauen U18") {
      // Render content for Frauen U18
      return (
        <div>
          <div className="mainContentContainer">
          <div className="womenAgeClassesContainer">
          <div className="category">Frauen</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U11")}>
            Weibliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U13")}>
            Weibliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U15")}>
            Weibliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen U18")}>
            Frauen U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen")}>
            Frauen
          </div>

        </div>
        <div className="menAgeClassesContainer">
          <div className="category">Männer</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U11")}>
            Männliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U13")}>
          Männliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U15")}>
          Männliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer U18")}>
          Männer U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer")}>
          Männer
          </div>
        </div>

        <div className="classesInputContent">
          <div className="inputContainer">
            <label className="inputLabel">Klassenname</label>
            <input className="inputField"></input>
          </div>

          <div className="ageLimitAndFightDurationContainer">
            <div className="ageLimitContainer">
              <label className="inputLabel">Altersgrenze</label>
              <input className="inputField"></input>
            </div>
            <div></div>
            <div className="fightDurationContainer">
              <label className="inputLabel">Kampfzeit (min)</label>
              <input className="inputField"></input>
            </div>
          </div>

          <div className="inputContainer">
            <label className="inputLabel">Gewicht (kg)</label>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
          </div>
        </div>
      </div>
        </div>
      );
    } else if (selectedOption === "Frauen") {
      // Render content for Frauen
      return (
        <div>
          <div className="mainContentContainer">
          <div className="womenAgeClassesContainer">
          <div className="category">Frauen</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U11")}>
            Weibliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U13")}>
            Weibliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U15")}>
            Weibliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen U18")}>
            Frauen U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen")}>
            Frauen
          </div>

        </div>
        <div className="menAgeClassesContainer">
          <div className="category">Männer</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U11")}>
            Männliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U13")}>
          Männliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U15")}>
          Männliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer U18")}>
          Männer U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer")}>
          Männer
          </div>
        </div>

        <div className="classesInputContent">
          <div className="inputContainer">
            <label className="inputLabel">Klassenname</label>
            <input className="inputField"></input>
          </div>

          <div className="ageLimitAndFightDurationContainer">
            <div className="ageLimitContainer">
              <label className="inputLabel">Altersgrenze</label>
              <input className="inputField"></input>
            </div>
            <div></div>
            <div className="fightDurationContainer">
              <label className="inputLabel">Kampfzeit (min)</label>
              <input className="inputField"></input>
            </div>
          </div>

          <div className="inputContainer">
            <label className="inputLabel">Gewicht (kg)</label>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
          </div>
        </div>
      </div>
        </div>
      );
    } else if (selectedOption === "Männliche Jugend U11") {
      // Render content for Weibliche Jugend U11
      return (
        <div>
          <div className="mainContentContainer">
          <div className="womenAgeClassesContainer">
          <div className="category">Frauen</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U11")}>
            Weibliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U13")}>
            Weibliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U15")}>
            Weibliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen U18")}>
            Frauen U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen")}>
            Frauen
          </div>

        </div>
        <div className="menAgeClassesContainer">
          <div className="category">Männer</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U11")}>
            Männliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U13")}>
          Männliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U15")}>
          Männliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer U18")}>
          Männer U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer")}>
          Männer
          </div>
        </div>

        <div className="classesInputContent">
          <div className="inputContainer">
            <label className="inputLabel">Klassenname</label>
            <input className="inputField"></input>
          </div>

          <div className="ageLimitAndFightDurationContainer">
            <div className="ageLimitContainer">
              <label className="inputLabel">Altersgrenze</label>
              <input className="inputField"></input>
            </div>
            <div></div>
            <div className="fightDurationContainer">
              <label className="inputLabel">Kampfzeit (min)</label>
              <input className="inputField"></input>
            </div>
          </div>

          <div className="inputContainer">
            <label className="inputLabel">Gewicht (kg)</label>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
          </div>
        </div>
      </div>
        </div>
      );
    } else if (selectedOption === "Männliche Jugend U13") {
      // Render content for Weibliche Jugend U13
      return (
        <div>
          <div className="mainContentContainer">
          <div className="womenAgeClassesContainer">
          <div className="category">Frauen</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U11")}>
            Weibliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U13")}>
            Weibliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U15")}>
            Weibliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen U18")}>
            Frauen U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen")}>
            Frauen
          </div>

        </div>
        <div className="menAgeClassesContainer">
          <div className="category">Männer</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U11")}>
            Männliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U13")}>
          Männliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U15")}>
          Männliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer U18")}>
          Männer U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer")}>
          Männer
          </div>
        </div>

        <div className="classesInputContent">
          <div className="inputContainer">
            <label className="inputLabel">Klassenname</label>
            <input className="inputField"></input>
          </div>

          <div className="ageLimitAndFightDurationContainer">
            <div className="ageLimitContainer">
              <label className="inputLabel">Altersgrenze</label>
              <input className="inputField"></input>
            </div>
            <div></div>
            <div className="fightDurationContainer">
              <label className="inputLabel">Kampfzeit (min)</label>
              <input className="inputField"></input>
            </div>
          </div>

          <div className="inputContainer">
            <label className="inputLabel">Gewicht (kg)</label>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
          </div>
        </div>
      </div>
        </div>
      );
    } else if (selectedOption === "Männliche Jugend U15") {
      // Render content for Weibliche Jugend U15
      return (
        <div>
          <div className="mainContentContainer">
          <div className="womenAgeClassesContainer">
          <div className="category">Frauen</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U11")}>
            Weibliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U13")}>
            Weibliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U15")}>
            Weibliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen U18")}>
            Frauen U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen")}>
            Frauen
          </div>

        </div>
        <div className="menAgeClassesContainer">
          <div className="category">Männer</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U11")}>
            Männliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U13")}>
          Männliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U15")}>
          Männliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer U18")}>
          Männer U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer")}>
          Männer
          </div>
        </div>

        <div className="classesInputContent">
          <div className="inputContainer">
            <label className="inputLabel">Klassenname MU15</label>
            <input className="inputField"></input>
          </div>

          <div className="ageLimitAndFightDurationContainer">
            <div className="ageLimitContainer">
              <label className="inputLabel">Altersgrenze</label>
              <input className="inputField"></input>
            </div>
            <div></div>
            <div className="fightDurationContainer">
              <label className="inputLabel">Kampfzeit (min)</label>
              <input className="inputField"></input>
            </div>
          </div>

          <div className="inputContainer">
            <label className="inputLabel">Gewicht (kg)</label>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
          </div>
        </div>
      </div>
        </div>
      );
    } else if (selectedOption === "Männer U18") {
      // Render content for Frauen U18
      return (
        <div>
          <div className="mainContentContainer">
          <div className="womenAgeClassesContainer">
          <div className="category">Frauen</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U11")}>
            Weibliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U13")}>
            Weibliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U15")}>
            Weibliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen U18")}>
            Frauen U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen")}>
            Frauen
          </div>

        </div>
        <div className="menAgeClassesContainer">
          <div className="category">Männer</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U11")}>
            Männliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U13")}>
          Männliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U15")}>
          Männliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer U18")}>
          Männer U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer")}>
          Männer
          </div>
        </div>

        <div className="classesInputContent">
          <div className="inputContainer">
            <label className="inputLabel">Klassenname</label>
            <input className="inputField"></input>
          </div>

          <div className="ageLimitAndFightDurationContainer">
            <div className="ageLimitContainer">
              <label className="inputLabel">Altersgrenze</label>
              <input className="inputField"></input>
            </div>
            <div></div>
            <div className="fightDurationContainer">
              <label className="inputLabel">Kampfzeit (min)</label>
              <input className="inputField"></input>
            </div>
          </div>

          <div className="inputContainer">
            <label className="inputLabel">Gewicht (kg)</label>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
          </div>
        </div>
      </div>
        </div>
      );
    } else if (selectedOption === "Männer") {
      // Render content for Frauen
      return (
        <div>
          <div className="mainContentContainer">
          <div className="womenAgeClassesContainer">
          <div className="category">Frauen</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U11")}>
            Weibliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U13")}>
            Weibliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U15")}>
            Weibliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen U18")}>
            Frauen U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen")}>
            Frauen
          </div>

        </div>
        <div className="menAgeClassesContainer">
          <div className="category">Männer</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U11")}>
            Männliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U13")}>
          Männliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U15")}>
          Männliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer U18")}>
          Männer U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer")}>
          Männer
          </div>
        </div>

        <div className="classesInputContent">
          <div className="inputContainer">
            <label className="inputLabel">Klassenname Männer</label>
            <input className="inputField"></input>
          </div>

          <div className="ageLimitAndFightDurationContainer">
            <div className="ageLimitContainer">
              <label className="inputLabel">Altersgrenze</label>
              <input className="inputField"></input>
            </div>
            <div></div>
            <div className="fightDurationContainer">
              <label className="inputLabel">Kampfzeit (min)</label>
              <input className="inputField"></input>
            </div>
          </div>

          <div className="inputContainer">
            <label className="inputLabel">Gewicht (kg)</label>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
          </div>
        </div>
      </div>
        </div>
      );
    } else {
      // Render default content
      return (
        <div>
          <div className="mainContentContainer">
        <div className="womenAgeClassesContainer">
          <div className="category">Frauen</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U11")}>
            Weibliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U13")}>
            Weibliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Weibliche Jugend U15")}>
            Weibliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen U18")}>
            Frauen U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Frauen")}>
            Frauen
          </div>

        </div>
        <div className="menAgeClassesContainer">
          <div className="category">Männer</div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U11")}>
            Männliche Jugend U11
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U13")}>
          Männliche Jugend U13
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männliche Jugend U15")}>
          Männliche Jugend U15
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer U18")}>
          Männer U18
          </div>
          <div className="rows" onClick={() => handleCategoryOptionClick("Männer")}>
          Männer
          </div>
        </div>
      </div>
      <div className="mainContentContainer">
        <div className="womenAgeClassesContainer">
          <div className="category">Frauen</div>
          <div className="rows">Weibliche Jugend U11</div>
          <div className="rows">Weibliche Jugend U13</div>
          <div className="rows">Weibliche Jugend U15</div>
          <div className="rows">Frauen U18</div>
          <div className="rows">Frauen</div>

        </div>
        <div className="menAgeClassesContainer">
          <div className="category">Männer</div>
          <div className="rows">Männliche Jugend U11</div>
          <div className="rows">Männliche Jugend U13</div>
          <div className="rows">Männliche Jugend U15</div>
          <div className="rows">Männer U18</div>
          <div className="rows">Männer</div>
        </div>
        </div>
        <div className="classesInputContent">
          <div className="inputContainer">
            <label className="inputLabel">Klassenname</label>
            <input className="inputField"></input>
          </div>

          <div className="ageLimitAndFightDurationContainer">
            <div className="ageLimitContainer">
              <label className="inputLabel">Altersgrenze</label>
              <input className="inputField"></input>
            </div>
            <div></div>
            <div className="fightDurationContainer">
              <label className="inputLabel">Kampfzeit (min)</label>
              <input className="inputField"></input>
            </div>
          </div>

          <div className="inputContainer">
            <label className="inputLabel">Gewicht (kg)</label>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
            <input className="inputField marginToOtherFields"></input>
          </div>
        </div>
      
        </div>
      );
    }
  };


  const renderContent = () => {
    switch (selectedMenu) {
      case "menuRulesAdults":
        return rulesContentAdult();
      case "menuRulesTeenagers":
        return rulesContentYouth();
      case "menuClasses":
        return classContent();
      default:
        return <div>Bitte wähle oben eine Option aus</div>;
    }
  };

  return (
    <div className="fightModeContainer">
      <div className="headerBanner headerBannerGridArea">
        <h1 className="titleStyleList">Kampfmodus / Regelwerk anpassen</h1>
      </div>
      <div
        className={`menuRulesAdults ${
          selectedMenu === "menuRulesAdults" ? "selected" : ""
        }`}
        onClick={() => handleMenuClick("menuRulesAdults")}
      >
        Regeln Erwachsene
      </div>

      <div
        className={`menuRulesTeenagers ${
          selectedMenu === "menuRulesTeenagers" ? "selected" : ""
        }`}
        onClick={() => handleMenuClick("menuRulesTeenagers")}
      >
        Regeln Jugend
      </div>

      <div
        className={`menuClasses ${
          selectedMenu === "menuClasses" ? "selected" : ""
        }`}
        onClick={() => handleMenuClick("menuClasses")}
      >
        Klassen
      </div>

      <div className="contentContainer">{renderContent()}</div>
    </div>
  );
};

export default RulesEdit;
