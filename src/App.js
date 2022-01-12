import './App.css';
import {MentorSlide} from './mentors.js'
import {StudentSlide} from './students.js'

function App() {
  return (
    <div className="App">
      <div className="App-header">
      <img src="img/logo.png" title="logo" alt="logo" />
      </div>
      <MentorSlide />
      <StudentSlide />
    </div>
  );
}

export default App;
