import './App.css';
import { GoogleLogin } from 'react-google-login';

function App() {

  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <div className="App">
      <GoogleLogin
        clientId="811500721671-j3ucp4m1iskpve2je2244fa9v4iibs57.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      // cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default App;
