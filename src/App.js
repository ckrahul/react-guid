import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import axios from 'axios';
import Carousel from './Components/Carousel';
import Posts from './Components/Posts'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';


const Home = ({carouselITems}) => (    
  <div>
    <Carousel sliders={carouselITems} />
    <Container className='text-center border border-secodary bg-light my-5 py-5'>
      <h2>Home Page.</h2>
      <p>Home content here...</p>
      <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to</p>
    </Container>
  </div>
)

const About = () => (
  <Container className='mt-5'>
    <div className='text-center'>
      <h2>About Page.</h2>
    </div>
  </Container>
)

const Portfolio = () => (
  <Container className='mt-5'>
    <div className='text-center'>
      <h2>Portfolio Page.</h2>
    </div>
  </Container>
)
// const Blog = () => (
//   <Container className='mt-5'>
//     <div className='text-center'>
//       <h2>Blog Page.</h2>
//     </div>
//   </Container>
// )
const PageNotFound = ({location}) => (
     <div className="text-center mt-5">
           <h3>Oops! That page <code>{location.pathname}</code> can’t be found.</h3>
           <p>It looks like nothing was found at this Page or URL.</p>
         </div>
 )


class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false, 
      carousel: []
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {

  const wp_api_carousel = ( 'https://thegoodartisan.com/wp-json/home/carousel/' );

    return axios.get(wp_api_carousel)
      .then(response => {
         const carousel = response.data;
         this.setState({ carousel });
         console.log('carousel', carousel);
      });  

  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar color="light" light expand="md">
            <Container>
              <NavbarBrand href="/">TheGoodArtisan</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/home">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/About">About</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/portfolio">Portfolio</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/news">News</NavLink>
                  </NavItem>               
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Options
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        Option 1
                      </DropdownItem>
                      <DropdownItem>
                        Option 2
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        Reset
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Container>
          </Navbar>

            <Switch>

              <Route exact path="/" render={() => <Home carouselITems={this.state.carousel} />} />
              <Route exact path="/home" render={() => <Home carouselITems={this.state.carousel} />} />
              <Route exact path="/about"  component={About} />
              <Route exact path="/portfolio"  component={Portfolio} />
              <Route path="/news" component={Posts} />
          
              <Route exact render={(props) => <PageNotFound {...props} />} />
           
            </Switch>    

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
