import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Clients from './components/clients/Clients';
import ClientAdd from './components/clients/ClientAdd';
import ClientEdit from './components/clients/ClientEdit';
import ClientSingle from './components/clients/ClientSingle';
import Products from './components/products/Products';
import ProductAdd from './components/products/ProductAdd';
import ProductEdit from './components/products/ProductEdit';
import ProductSingle from './components/products/ProductSingle';
import Feedbacks from './components/feedbacks/Feedbacks';
import FeedbackAdd from './components/feedbacks/FeedbackAdd';
import FeedbackEdit from './components/feedbacks/FeedbackEdit';
import FeedbackSingle from './components/feedbacks/FeedbackSingle';
import AboutUs from "./components/about/About";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/clients" component={Clients} />
      <Route exact path="/client/create" component={ClientAdd} />
      <Route exact path="/client/edit/:id" component={ClientEdit} />
      <Route exact path="/client/view/:id" component={ClientSingle} />
      <Route path="/products" component={Products} />
      <Route exact path="/product/create" component={ProductAdd} />
      <Route exact path="/product/edit/:id" component={ProductEdit} />
      <Route exact path="/product/view/:id" component={ProductSingle} />
      <Route path="/feedbacks" component={Feedbacks} />
      <Route exact path="/feedback/create" component={FeedbackAdd} />
      <Route exact path="/feedback/edit/:id" component={FeedbackEdit} />
      <Route exact path="/feedback/view/:id" component={FeedbackSingle} />
      <Route exact path="/about" component={AboutUs} />
    </BrowserRouter>
  );
}

export default App;
