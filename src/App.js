import React , { Suspense } from 'react';
import './App.css';
import {Navbar} from './components/Navbar';
import { Footer } from './components/Footer';
import Register from './components/pages/Register';
import CountriesSelect from './contexts/CountriesSelect'
import { AuthProvider } from './contexts/AuthContexts'
import { BrowserRouter as Router ,Route , Switch} from "react-router-dom";
import PageNotFound from './components/pages/PageNotFound';

const Login = React.lazy(() => import('./components/pages/Login'));
const Cards = React.lazy(() => import("./components/Cards"));
const Products = React.lazy(() => import("./components/pages/Products"));
const Home = React.lazy(() => import('./components/pages/Home'));

const suspenseStyle = {
  fontSize: "2.5rem",
  textAlign: "center",
  margin: "7rem",
  color: "#2a89d1ab",
};

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <CountriesSelect>
          <Router>
            <Suspense
              fallback={<div style={suspenseStyle}>Wait for Loading...</div>}
            >
              <Navbar />
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/products/:path*" component={Products}></Route>
                <Route path="/register" component={Register} />
                <Route exact path="/" component={Home} />
                <Route path="*">
                  <PageNotFound />
                </Route>
              </Switch>
              <Footer />
            </Suspense>
          </Router>
        </CountriesSelect>
      </AuthProvider>
    </div>
  );
}

export default App;
