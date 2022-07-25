import React, {useEffect} from 'react';
import './App.css';
import {startGame} from "./game";
import {PassengerDetail} from "./components/PassengerDetail";

function App() {

  React.useEffect(() => {
    startGame();
  }, []);

  // const {ids, setIds} = TxStreetContainer.useContainer();
  const [ids, setIds] = React.useState<string[]>([]);

  window.showWin = (id: string) => {
    setIds((_ids) => [..._ids, id]);
  }

  useEffect(() =>{
    console.log(JSON.stringify(ids));
  }, [ids]);

  // setInterval(() => {
  //   console.log(JSON.stringify(ids));
  // }, 1000);

  return (
    <div className="App">
      {
        ids.map((id) => (
          <PassengerDetail id={id} key={id} handleClose={() => setIds(ids.filter((d) => d !== id))}></PassengerDetail>
        ))
      }
    </div>
  );
}

export default App;
