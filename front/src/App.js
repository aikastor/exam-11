import React, {Component, Fragment} from 'react';
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Products from "./containers/Products/Products";
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";
import NewProduct from "./containers/NewProduct/NewProduct";
import Register from "./containers/Register/Register";
import ProductPage from "./containers/ProductPage/ProductPage";
import Login from "./containers/Login/Login";

class App extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <Toolbar/>
        </header>
        <Container style={{marginTop: '20px'}}>
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path='/categories/:name' component={Products}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
          </Switch>
        </Container>
      </Fragment>
    );
  }
}

export default App;