import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import Counter from "./components/Counter";

function App() {
  
  return (
    <div>
      <Header />
      <MainContent />

      {/* 👇 Add your UserProfile here */}
      <UserProfile 
        name="Alice" 
        age={25} 
        bio="Loves hiking and photography" 
      />
      <MainContent />
      <Counter />
      <Footer />
    </div>
  );
}

export default App;





