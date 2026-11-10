import Calendar from "./components/Calendar/Calendar";
import "./App.css";

function App() {
  const now = new Date(2017, 2, 8); // 8 марта 2017 (месяцы с 0)

  return (
    <div className="App">
      <Calendar date={now} />
    </div>
  );
}

export default App;
 

