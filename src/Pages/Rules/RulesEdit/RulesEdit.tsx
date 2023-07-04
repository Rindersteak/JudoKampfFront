import React, { useState, useEffect } from "react";
import "./RulesEdit.scss";
import {getRules} from "../../../API/rulesAPI";
import { useLocation } from "react-router-dom";
import {RulesData, ClassData} from "../../../types";

type MenuOption = "menuRulesAdults" | "menuRulesTeenagers" | "menuClasses";

const RulesEdit = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuOption | null>(null);
  const [rulesData, setRulesData] = useState<RulesData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const [womenClassNames, setWomenClassNames] = useState([
    { id: 0, name: "Weibliche Jugend U11" },
    { id: 1, name: "Weibliche Jugend U13" },
    { id: 2, name: "Weibliche Jugend U15" },
    { id: 3, name: "Frauen U18" },
    { id: 4, name: "Frauen" }
  ]);
  
  const [menClassNames, setMenClassNames] = useState([
    { id: 0, name: "Männliche Jugend U11" },
    { id: 1, name: "Männliche Jugend U13" },
    { id: 2, name: "Männliche Jugend U15" },
    { id: 3, name: "Männer U18" },
    { id: 4, name: "Männer" }
  ]);

  const location = useLocation(); // get current URL
  const tournamentId = location.pathname.split("/").pop() || "";

  const [selectedClass, setSelectedClass] = useState<string | null>(null);


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


  const [className, setClassName] = useState("");
  const [ageLimit, setAgeLimit] = useState("");
  const [fightDuration, setFightDuration] = useState("");
  const [weight1, setWeight1] = useState("");
  const [weight2, setWeight2] = useState("");
  const [weight3, setWeight3] = useState("");
  const [weight4, setWeight4] = useState("");
  const [weight5, setWeight5] = useState("");


  useEffect(() => {
    const fetchRules = async () => {
      try {
        const data = await getRules(tournamentId);
        console.log(data)
        setRulesData(data);

      // set the values to their variables

      } catch (error) {
        console.error("Error loading tournament:", error);
      }
    };
  
    fetchRules();
  }, [tournamentId]);


  const handleMenuClick = (menu: MenuOption) => {
    setSelectedMenu(menu);
    setSelectedClass(null); // Reset selected class
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
            value={anzahlStrafenAdult}
            onChange={(e) => setAnzahlStrafenAdult(e.target.value)}
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
              <label className="inputLabel">Punkte Wasari:</label>
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
              <label className="inputLabel">Haltezeit Wasari:</label>
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
              <label className="inputLabel">Punkte Wasari:</label>
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
              <label className="inputLabel">Haltezeit Wasari:</label>
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

  const rulesInputContent = (selectedClass:string) => {
    // Define variables to hold the relevant state values based on the selected class
    let classData;
    let className;
    let ageLimit;
    let fightDuration;
    let weight1;
    let weight2;
    let weight3;
    let weight4;
    let weight5;
  
    // Assign values to the variables based on the selected class
    switch (selectedClass) {
      case "Weibliche Jugend U11":
        classData = rulesData?.femaleYouthU11; // Assuming you have appropriate data in rulesData for each class
        break;
      case "Weibliche Jugend U13":
        classData = rulesData?.femaleYouthU13;
        break;
      case "Weibliche Jugend U15":
        classData = rulesData?.femaleYouthU15;
        break;
      case "Frauen U18":
        classData = rulesData?.womenU18;
        break;
      case "Frauen":
        classData = rulesData?.women;
        break;
      case "Männliche Jugend U11":
        classData = rulesData?.maleYouthU11;
        break;
      case "Männliche Jugend U13":
        classData = rulesData?.maleYouthU13;
        break;
      case "Männliche Jugend U15":
        classData = rulesData?.maleYouthU15;
        break;
      case "Männer U18":
        classData = rulesData?.menU18;
        break;
      case "Männer":
        classData = rulesData?.men;
        break;
      default:
        classData = null;
    }
  
    // Extract the relevant state values from classData if available
    if (classData) {
      className = classData.className || "";
      ageLimit = classData.ageLimit || "";
      fightDuration = classData.fightDuration || "";
      weight1 = classData.weights[0] || "";
      weight2 = classData.weights[1] || "";
      weight3 = classData.weights[2] || "";
      weight4 = classData.weights[3] || "";
      weight5 = classData.weights[4] || "";
    }

      return (
        <div className="classesInputContent">
          <div className="inputContainer">
            <label className="inputLabel">Klassenname</label>
            <input
              className="inputField"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </div>
    
          <div className="ageLimitAndFightDurationContainer">
            <div className="ageLimitContainer">
              <label className="inputLabel">Altersgrenze</label>
              <input
                className="inputField"
                value={ageLimit}
                onChange={(e) => setAgeLimit(e.target.value)}
              />
            </div>
            <div></div>
            <div className="fightDurationContainer">
              <label className="inputLabel">Kampfzeit (min)</label>
              <input
                className="inputField"
                value={fightDuration}
                onChange={(e) => setFightDuration(e.target.value)}
              />
            </div>
          </div>
    
          <div className="inputContainer">
            <label className="inputLabel">Gewicht (kg)</label>
            <input
              className="inputField marginToOtherFields"
              value={weight1}
              onChange={(e) => setWeight1(e.target.value)}
            />
            <input
              className="inputField marginToOtherFields"
              value={weight2}
              onChange={(e) => setWeight2(e.target.value)}
            />
            <input
              className="inputField marginToOtherFields"
              value={weight3}
              onChange={(e) => setWeight3(e.target.value)}
            />
            <input
              className="inputField marginToOtherFields"
              value={weight4}
              onChange={(e) => setWeight4(e.target.value)}
            />
            <input
              className="inputField marginToOtherFields"
              value={weight5}
              onChange={(e) => setWeight5(e.target.value)}
            />
          </div>
        </div>
    );
  }

 const classContent = () => {
  const renderClassInputContent = () => {
    if (selectedClass) {
      switch (selectedClass) {
        case "Weibliche Jugend U11":
        case "Weibliche Jugend U13":
        case "Weibliche Jugend U15":
        case "Frauen U18":
        case "Frauen":
        case "Männliche Jugend U11":
        case "Männliche Jugend U13":
        case "Männliche Jugend U15":
        case "Männer U18":
        case "Männer":
          return rulesInputContent(selectedClass);
        default:
          return <div>Select a class option</div>;
      }
    } else {
      return <div>Select a class option</div>;
    }
  };

  return (
    <div className="mainContentContainer">
      <div className="womenAgeClassesContainer">
        <div className="category">Frauen</div>
        {womenClassNames.map((classOption) => (
          <div
            className={`rows ${selectedClass === classOption.name ? "selected" : ""}`}
            onClick={() => setSelectedClass(classOption.name)}
            key={classOption.id}
          >
            {classOption.name}
          </div>
        ))}
      </div>
      <div className="menAgeClassesContainer">
        <div className="category">Männer</div>
        {menClassNames.map((classOption) => (
          <div
            className={`rows ${selectedClass === classOption.name ? "selected" : ""}`}
            onClick={() => setSelectedClass(classOption.name)}
            key={classOption.id}
          >
            {classOption.name}
          </div>
        ))}
      </div>

      {renderClassInputContent()}
    </div>
  );
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
