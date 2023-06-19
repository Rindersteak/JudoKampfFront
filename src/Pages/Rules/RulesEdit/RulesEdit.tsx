import React, { useState } from "react";
import "./RulesEdit.scss";

type MenuOption = "menuRulesAdults" | "menuRulesTeenagers" | "menuClasses";

const RulesEdit = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuOption | null>(null);

  const handleMenuClick = (menu: MenuOption) => {
    setSelectedMenu(menu);
  };

  const rulesContent = () => {
    return (
      <div className="mainContainerContent">
        <div className="inputContainer">
          <label className="inputLabel">Golden Score:</label>
          <input className="inputField"></input>
        </div>

        <div className="inputContainer">
          <label className="inputLabel">Anzahl Strafen:</label>
          <input className="inputField"></input>
        </div>

        <div className="eponWasariContainer">
          <div className="pointsEponWasariContainer">
            <div className="pointsEpponContainer">
              <label className="inputLabel">Punkte Ippon:</label>
              <input className="inputField"></input>
            </div>
            <div></div>
            <div className="pointsWasariContainer">
              <label className="inputLabel">Punkte Wasari:</label>
              <input className="inputField"></input>
            </div>
          </div>

          <div className="holdTimeEponWasari">
            <div className="holdTimeEpponContainer">
              <label className="inputLabel">Haltezeit Ippon:</label>
              <input className="inputField"></input>
            </div>

            <div></div>

            <div className="pointsWasariContainer">
              <label className="inputLabel">Haltezeit Wasari:</label>
              <input className="inputField"></input>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const classInputContent = () => {
    return <div></div>;
  };

  const classContent = () => {
    return (
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
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "menuRulesAdults":
        return rulesContent();
      case "menuRulesTeenagers":
        return rulesContent();
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
        Regeln Jugendliche
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
