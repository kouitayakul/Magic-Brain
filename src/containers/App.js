import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import './App.css';
import 'tachyons';


const particlesOptions = {
            		particles: {
            			number: {
            				value: 25,
            				density: {
            					enable: true,
            					value_area: 200
            				}
            			},
                        shape: {
                            type: 'star'
                        },
                        size: {
                            value: 6,
                            random: true
                        },
                        line_linked: {
                            enable: false
                        
                        },
                        move: {
                            speed: 6
                        }
                    },
            		interactivity: {
            			detect_on: 'window',
					    events: {
					      onhover: {
					        enable: true,
					        mode: "repulse"
					      },
                          onclick: {
                            enable: true,
                            mode: 'bubble'
                          }
            			},
                        modes: {
                            bubble: {
                                size: 10
                            }
                          }
            		}
            	}
const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}
class App extends Component {
    constructor() {
        super();
        this.state = initialState;
        }

    loadUser = (data) => {
        this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }})
    }



    calculateFaceLoc = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const img = document.getElementById('faceImg');
        const width = Number(img.width); /* since img.width returns a string we need Number()*/
        const height = Number(img.height);
        console.log(clarifaiFace.top_row);
        return {
            leftCol: width * clarifaiFace.left_col,
            rightCol: width - (width * clarifaiFace.right_col),
            topRow: height * clarifaiFace.top_row,
            bottomRow: height - (height * clarifaiFace.bottom_row)
        }
    }

    displayBox = (box) => {
        this.setState({box: box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onButtonChange = () => {
        this.setState({imageUrl: this.state.input});
        fetch('https://salty-castle-48992.herokuapp.com/imageurl', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        input: this.state.input
                    })
                })
        .then(response => response.json())
        .then((response) => {
            if(response) {
                fetch('https://salty-castle-48992.herokuapp.com/image', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                })
                .then((response) => response.json())
                .then((count) => {
                    this.setState(Object.assign(this.state.user, {entries: count}))
                })
                .catch(console.log("Error"));
            }
            this.displayBox(this.calculateFaceLoc(response))
    })
        .catch((err) => console.error(err));
    }

    onRouteChange = (route) => {
        if(route === 'signout') {
            this.setState(initialState)
        }
        else if(route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    }

  render() {
    return (
      <div className="App">
      	<Particles className='particles' params={particlesOptions}/>
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home' 
            ? <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange} onButtonChange={this.onButtonChange}/>
                <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
            </div>
            : (
                this.state.route === 'signin'
                ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                : (
                    this.state.route === 'signout'
                    ? <Signin onRouteChange={this.onRouteChange}/>
                    : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    )
            )
        }
      </div>
    );
  }
}


export default App;
