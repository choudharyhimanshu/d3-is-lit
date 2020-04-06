import React from "react";
import "./App.css";
import SimpleD3Circles from "./components/SimpleD3Circles";
import RacingBars from "./components/RacingBars";

enum ETabs {
  CIRCLES,
  RACING_BARS,
}

function App() {
  const [tab, setTab] = React.useState(ETabs.RACING_BARS);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button
            style={{ margin: 10 }}
            onClick={() => setTab(ETabs.RACING_BARS)}
          >
            Racing bars
          </button>
          <button style={{ margin: 10 }} onClick={() => setTab(ETabs.CIRCLES)}>
            Dancing Circle
          </button>
        </div>
        <hr />
        {tab === ETabs.CIRCLES && <SimpleD3Circles />}
        {tab === ETabs.RACING_BARS && <RacingBars />}
      </header>
    </div>
  );
}

export default App;
