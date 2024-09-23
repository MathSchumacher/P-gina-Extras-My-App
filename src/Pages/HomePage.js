import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
 // Para decodificar o token do Google
import './HomePage.css';

import Animation1 from '../animations/Animation1726605491927.json';
import Animation2 from '../animations/Animation1726605565366.json';

const HomePage = () => {
  const navigate = useNavigate();
  const [locationInfo, setLocationInfo] = useState({
    country: '',
    city: '',
    coordinates: ''
  });
  const [error, setError] = useState('');
  const [isAnimating1, setIsAnimating1] = useState(false);
  const [isAnimating2, setIsAnimating2] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // Armazena informações do usuário

  const goToLooksPage = () => navigate('/looks');
  const goToPortfolioPage = () => navigate('/port');
  const goToLogosPage = () => navigate('/logos');
  const goToDrag_DropPage = () => navigate('/drag');
  const goToRegisterPage= () => navigate('/regis');

  useEffect(() => {
    const getLocation = async () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by this browser.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get('https://map-geocoding.p.rapidapi.com/json', {
              params: {
                latlng: `${latitude},${longitude}`
              },
              headers: {
                'x-rapidapi-host': 'map-geocoding.p.rapidapi.com',
                'x-rapidapi-key': '18986945c4msh759530dfa731063p1c191ajsn6e34a8cb1555'
              }
            });

            const results = response.data.results;
            if (results.length > 0) {
              const addressComponents = results[0].address_components;
              const country = addressComponents.find(comp => comp.types.includes('country'))?.long_name || 'N/A';
              const city = addressComponents.find(comp => comp.types.includes('locality'))?.long_name || 'N/A';
              setLocationInfo({
                country,
                city,
                coordinates: `Lat: ${latitude}, Lon: ${longitude}`
              });
            } else {
              setLocationInfo({
                country: 'N/A',
                city: 'N/A',
                coordinates: `Lat: ${latitude}, Lon: ${longitude}`
              });
            }
          } catch (error) {
            console.error('Error fetching location data:', error);
            setError('Unable to retrieve location data');
          }
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setError('Permission to access location was denied.');
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            setError('Location information is unavailable.');
          } else if (error.code === error.TIMEOUT) {
            setError('The request to get user location timed out.');
          } else if (error.code === error.UNKNOWN_ERROR) {
            setError('An unknown error occurred.');
          }
        }
      );
    };

    getLocation();
  }, []);

  const handleMouseEnter = (animIndex) => {
    if (animIndex === 1) {
      setIsAnimating1(true);
      setTimeout(() => setIsAnimating1(false), 10000);
    } else if (animIndex === 2) {
      setIsAnimating2(true);
      setTimeout(() => setIsAnimating2(false), 10000);
    }
  };

  const handleMouseLeave = (animIndex) => {
    if (animIndex === 1) {
      setIsAnimating1(false);
    } else if (animIndex === 2) {
      setIsAnimating2(false);
    }
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'F1':
        event.preventDefault();
        goToLooksPage();
        break;
      case 'F2':
        event.preventDefault();
        goToPortfolioPage();
        break;
      case 'F3':
        event.preventDefault();
        goToLogosPage();
        break;
      case 'F4':
        event.preventDefault();
        goToDrag_DropPage();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleDownloadClick = () => {
    const link = document.createElement('a');
    link.href = `${process.env.PUBLIC_URL}/downloads/Everything_goes_on.m4a`;
    link.download = 'Everything_goes_on.m4a';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  return (
    <GoogleOAuthProvider clientId="864492743338-odah9sc6nrhuccb0t2p15jeadrok1d7m.apps.googleusercontent.com">
      <div className="homepage-container">
        <header className="header">
          {!isLoggedIn ? (
            <>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  setUserInfo(decoded);
                  setIsLoggedIn(true);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </>
          ) : (
            <>
              <p>Welcome, {userInfo?.name}</p>
              <button className='Logoutbutton' onClick={handleLogout}>Logout</button>
            </>
          )}
        </header>
        <h1>Home Page</h1>
        <div className="animated-container">
          <div className="download-info">
            Download Song ↓
          </div>
          <div 
            className="animation-box left"
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={() => handleMouseLeave(1)}
            onClick={handleDownloadClick}
          >
            {isAnimating1 ? (
              <Lottie animationData={Animation1} loop={true} />
            ) : (
              <img className="staticimg1" src={`${process.env.PUBLIC_URL}/images/staticanimation1.png`} alt="Static Image 1" />
            )}
          </div>
          <div 
            className="animation-box above"
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={() => handleMouseLeave(2)}
          >
            {isAnimating2 ? (
              <Lottie animationData={Animation2} loop={true} />
            ) : (
              <img className="staticimg2" src={`${process.env.PUBLIC_URL}/images/staticanimation2.png`} alt="Static Image 2" />
            )}
          </div>
        </div>
        <div className="location-info">
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <p><strong>Country:</strong> {locationInfo.country} <br />
               <strong>Coordinates:</strong> {locationInfo.coordinates}</p>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default HomePage;

/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import './HomePage.css';

// Importando as animações diretamente da pasta src/animations
import Animation1 from '../animations/Animation1726605491927.json';
import Animation2 from '../animations/Animation1726605565366.json';

const HomePage = () => {
  const navigate = useNavigate();
  const [locationInfo, setLocationInfo] = useState({
    country: '',
    city: '',
    coordinates: ''
  });
  const [error, setError] = useState('');
  const [isAnimating1, setIsAnimating1] = useState(false);
  const [isAnimating2, setIsAnimating2] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false); // Estado para controlar a visibilidade do menu de login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Novo estado para controlar o login

  const goToLooksPage = () => navigate('/looks');
  const goToPortfolioPage = () => navigate('/port');
  const goToLogosPage = () => navigate('/logos');
  const goToDrag_DropPage = () => navigate('/drag');
  const goToRegisterPage= () => navigate('/regis');

  useEffect(() => {
    const getLocation = async () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by this browser.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get('https://map-geocoding.p.rapidapi.com/json', {
              params: {
                latlng: `${latitude},${longitude}`
              },
              headers: {
                'x-rapidapi-host': 'map-geocoding.p.rapidapi.com',
                'x-rapidapi-key': '18986945c4msh759530dfa731063p1c191ajsn6e34a8cb1555'
              }
            });

            const results = response.data.results;
            if (results.length > 0) {
              const addressComponents = results[0].address_components;
              const country = addressComponents.find(comp => comp.types.includes('country'))?.long_name || 'N/A';
              const city = addressComponents.find(comp => comp.types.includes('locality'))?.long_name || 'N/A';
              setLocationInfo({
                country,
                city,
                coordinates: `Lat: ${latitude}, Lon: ${longitude}`
              });
            } else {
              setLocationInfo({
                country: 'N/A',
                city: 'N/A',
                coordinates: `Lat: ${latitude}, Lon: ${longitude}`
              });
            }
          } catch (error) {
            console.error('Error fetching location data:', error);
            setError('Unable to retrieve location data');
          }
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setError('Permission to access location was denied.');
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            setError('Location information is unavailable.');
          } else if (error.code === error.TIMEOUT) {
            setError('The request to get user location timed out.');
          } else if (error.code === error.UNKNOWN_ERROR) {
            setError('An unknown error occurred.');
          }
        }
      );
    };

    getLocation();
  }, []);

  const handleMouseEnter = (animIndex) => {
    if (animIndex === 1) {
      setIsAnimating1(true);
      setTimeout(() => setIsAnimating1(false), 10000);
    } else if (animIndex === 2) {
      setIsAnimating2(true);
      setTimeout(() => setIsAnimating2(false), 10000);
    }
  };

  const handleMouseLeave = (animIndex) => {
    if (animIndex === 1) {
      setIsAnimating1(false);
    } else if (animIndex === 2) {
      setIsAnimating2(false);
    }
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'F1':
        event.preventDefault();
        goToLooksPage();
        break;
      case 'F2':
        event.preventDefault();
        goToPortfolioPage();
        break;
      case 'F3':
        event.preventDefault();
        goToLogosPage();
        break;
      case 'F4':
        event.preventDefault();
        goToDrag_DropPage();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleDownloadClick = () => {
    const link = document.createElement('a');
    link.href = `${process.env.PUBLIC_URL}/downloads/Everything_goes_on.m4a`; // Substitua pelo caminho do seu arquivo para download
    link.download = 'Everything_goes_on.m4a'; // Nome do arquivo para download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLoginClick = () => {
    setShowLoginMenu(!showLoginMenu);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para autenticação do usuário
    console.log('Login:', username, password);
    setIsLoggedIn(true); // Simula o login bem-sucedido
    setShowLoginMenu(false); // Fecha o menu de login
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Desconecta o usuário
    setUsername('');
    setPassword('');
  };

  return (
    <div className="homepage-container">
      <header className="header">
        {!isLoggedIn ? (
          <>
            <button className='Registerbutton' onClick={goToRegisterPage}>Sign In</button>
            <button className='Loginbutton' onClick={handleLoginClick}>Login</button>
          </>
        ) : (
          <button className='Logoutbutton' onClick={handleLogout}>Logout</button>
        )}
        <nav className="dropdown">
          <button className="dropbtn">Menu</button>
          <div className="dropdown-content">
            <a href="" onClick={goToLooksPage}>Looks Page <span className="shortcut">(F1)</span></a>
            <a href="" onClick={goToPortfolioPage}>Portfolio Page <span className="shortcut">(F2)</span></a>
            <a href="" onClick={goToLogosPage}>Logos Page <span className="shortcut">(F3)</span></a>
            <a href="" onClick={goToDrag_DropPage}>Drag&Drop Page <span className="shortcut">(F4)</span></a>
          </div>
        </nav>
        {showLoginMenu && !isLoggedIn && (
          <div className="login-menu">
            <form onSubmit={handleLoginSubmit}>
              <label>
                Username: 
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
              <label>
                Password: 
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Login</button>
            </form>
          </div>
        )}
      </header>
      <h1>Home Page</h1>
      <div className="animated-container">
        <div className="download-info">
          Download Song ↓
        </div>
        <div 
          className="animation-box left"
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={() => handleMouseLeave(1)}
          onClick={handleDownloadClick}
        >
          {isAnimating1 ? (
            <Lottie animationData={Animation1} loop={true} />
          ) : (
            <img className="staticimg1" src={`${process.env.PUBLIC_URL}/images/staticanimation1.png`} alt="Static Image 1" />
          )}
        </div>
        <div 
          className="animation-box above"
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={() => handleMouseLeave(2)}
        >
          {isAnimating2 ? (
            <Lottie animationData={Animation2} loop={true} />
          ) : (
            <img className="staticimg2" src={`${process.env.PUBLIC_URL}/images/staticanimation2.png`} alt="Static Image 2" />
          )}
        </div>
      </div>
      <div className="location-info">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <p><strong>Country:</strong> {locationInfo.country} <br />
             <strong>Coordinates:</strong> {locationInfo.coordinates}</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;*/