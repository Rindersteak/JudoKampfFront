import React from 'react';
import './selectedTournament.css';
import logo from "./img/kadokan_logo.svg"


class Logo extends React.Component{
    render() {
        return(
            <p>ICH RAFF HIER GOANIX</p>
        );
    }

}



function App() {
  return (

    <div className="App">

        <div className='logo'>
            <Logo/>
        </div>


    </div>
  );
}

export default App;
