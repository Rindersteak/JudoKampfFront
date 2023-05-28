import React from 'react';
import './TournamentTree.css';

const TournamentTree = () => {
  return (
    <div>
      <h1>2013 NCAA Tournament - Midwest Bracket</h1>
      <main id="tournament">
        <ul className="round round-1">
          <li className="spacer">&nbsp;</li>

          <li className="game game-top winner">
            <div className="player-box">
              Lousville <span>79</span>
            </div>
            <div className="connector"></div> {/* Line connector */}
          </li>
          <li className="game game-spacer">&nbsp;</li>
          <li className="game game-bottom">
            <div className="player-box">
              NC A&T <span>48</span>
            </div>
            <div className="connector"></div> {/* Line connector */}
          </li>

          {/* Additional players */}
          <li className="spacer">&nbsp;</li>

          <li className="game game-top winner">
            <div className="player-box">
              Colo St <span>84</span>
            </div>
            <div className="connector"></div> {/* Line connector */}
          </li>
          <li className="game game-spacer">&nbsp;</li>
          <li className="game game-bottom">
            <div className="player-box">
              Missouri <span>72</span>
            </div>
            <div className="connector"></div> {/* Line connector */}
          </li>

          <li className="spacer">&nbsp;</li>

          <li className="game game-top">
            <div className="player-box">
              Oklahoma St <span>55</span>
            </div>
            <div className="connector"></div> {/* Line connector */}
          </li>
          <li className="game game-spacer">&nbsp;</li>
          <li className="game game-bottom winner">
            <div className="player-box">
              Oregon <span>68</span>
            </div>
            <div className="connector"></div> {/* Line connector */}
          </li>

          <li className="spacer">&nbsp;</li>
     

                  {/* Additional players */}
                  <li className="spacer">&nbsp;</li>

<li className="game game-top winner">
  <div className="player-box">
    Colo St <span>84</span>
  </div>
  <div className="connector"></div> {/* Line connector */}
</li>
<li className="game game-spacer">&nbsp;</li>
<li className="game game-bottom">
  <div className="player-box">
    Test1 <span>72</span>
  </div>
  <div className="connector"></div> {/* Line connector */}
</li>

<li className="spacer">&nbsp;</li>

<li className="game game-top">
  <div className="player-box">
    Test2 <span>55</span>
  </div>
  <div className="connector"></div> {/* Line connector */}
</li>
<li className="game game-spacer">&nbsp;</li>
<li className="game game-bottom winner">
  <div className="player-box">
    Oregon <span>68</span>
  </div>
  <div className="connector"></div> {/* Line connector */}
</li>

<li className="spacer">&nbsp;</li>

          {/* Additional players */}
          <li className="spacer">&nbsp;</li>

          <li className="game game-top winner">
            <div className="player-box">
              Colo St <span>84</span>
            </div>
            <div className="connector"></div> {/* Line connector */}
          </li>
          <li className="game game-spacer">&nbsp;</li>
          <li className="game game-bottom">
            <div className="player-box">
              Missouri <span>72</span>
            </div>
            <div className="connector"></div> {/* Line connector */}
          </li>

          <li className="spacer">&nbsp;</li>

          <li className="game game-top">
            <div className="player-box">
              Test 3 <span>55</span>
            </div>
            <div className="connector"></div> {/* Line connector */}
          </li>
          <li className="game game-spacer">&nbsp;</li>
          <li className="game game-bottom winner">
            <div className="player-box">
              Test 4 <span>68</span>
            </div>
            <div className="connector"></div> {/* Line connector */}
          </li>

          <li className="spacer">&nbsp;</li>
        </ul>

        {/* Round 2 */}
        <ul className="round round-2">
          <li className="spacer">&nbsp;</li>
          <li className="game game-top winner">
            <div className="player-box">
              Lousville <span>79</span>
            </div>
            <div className="connector"></div> {/* Line connector */}
          </li>
          <li className="game game-spacer">&nbsp;</li>
          <li className="game game-bottom">
            <div className="player-box">
              Colo St <span>84</span>
            </div>
            <div className="connector"></div> {/* Line connector */}
          </li>
          <li className="spacer">&nbsp;</li>
        </ul>

        {/* Rest of the rounds... */}
      </main>
    </div>
  );
}

export default TournamentTree;
