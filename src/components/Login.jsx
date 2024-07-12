import React, { createContext, useState, useContext } from 'react';
import '../App.css';

const ContextoAutenticacao = createContext();

const ProvedorAutenticacao = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const login = (nomeUsuario, emailUsuario) => {
    setUsuario({ nome: nomeUsuario, email: emailUsuario });
  };

  const logout = () => {
    setUsuario(null);
  };

  return (
    <ContextoAutenticacao.Provider value={{ usuario, login, logout }}>
      {children}
    </ContextoAutenticacao.Provider>
  );
};

const Login = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const { usuario, login } = useContext(ContextoAutenticacao);

  const handleLogin = () => {
    login(nomeUsuario, emailUsuario);
  };

  return (
    <div className={`login-container ${usuario ? 'minimized' : ''}`}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Nome de Usuário"
        value={nomeUsuario}
        onChange={(e) => setNomeUsuario(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={emailUsuario}
        onChange={(e) => setEmailUsuario(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const Saudacao = () => {
  const { usuario, logout } = useContext(ContextoAutenticacao);

  if (!usuario) {
    return null;
  }

  return (
    <div className="saudacao-container">
      <h1>Bem-vindo, {usuario.nome}!</h1>
      <p>{usuario.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const App = () => {
  return (
    <ProvedorAutenticacao>
      <div className="container">
        <Login />
        <Saudacao />
      </div>
    </ProvedorAutenticacao>
  );
};

export default App;
