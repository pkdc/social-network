import './App.css';
import Card from './components/UI/Card';
import Form from './components/UI/Form';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className='wrapper'>
      <Form className="login">
        <LoginForm />
      </Form>
    </div>
    
  );
}

export default App;
