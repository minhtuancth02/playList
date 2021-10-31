import React , { Suspense } from 'react';
import './App.css';
import {Navbar} from './components/Navbar';
import { Footer } from './components/Footer';
import Register from './components/pages/Register';
import CountriesSelect from './contexts/CountriesSelect'
import { AuthProvider } from './contexts/AuthContexts'
import { BrowserRouter as Router ,Route , Switch} from "react-router-dom";

const Login = React.lazy(() => import('./components/pages/Login'));
const Cards = React.lazy(() => import("./components/Cards"));
const Products = React.lazy(() => import("./components/pages/Products"));
const Home = React.lazy(() => import('./components/pages/Home'));


function App() {

  return (
    <div className="App">
      <Router>
        <Suspense
          fallback={
            <div
              style={{
                fontSize: "2.5rem",
                textAlign: "center",
                margin: "7rem",
                color: "#2a89d1ab",
              }}
            >
              Wait for Loading...
            </div>
          }
        >
          <AuthProvider>
            <CountriesSelect>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/products" component={Products} />
                <Route path="/register" component={Register} />
                <Route path="/Cards" component={Cards} />
              </Switch>
              <Footer />
            </CountriesSelect>
          </AuthProvider>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
