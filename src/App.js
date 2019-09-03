import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
// import Rank from './components/Rank/Rank';
import ReactLoading from 'react-loading';

const app = new Clarifai.App({
  apiKey: '07ba2c8146194e4588be3af6f846109d'
});

const particlesOption = {
  particles: {
    number: {
      values: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      isLoading: true
    }
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  cal = (data) => {
    console.log(data);
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = async () => {
    this.setState({ isLoading: true });
    const inputImg = document.getElementById('inputValue');
    if (inputImg.value) {
      await this.setState({ input: inputImg.value });
      await this.setState({ imageURL: inputImg.value });
    } else {
      await this.setState({ imageURL: this.state.input });
    }
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(async response => {
        await this.displayFaceBox(this.cal(response));
        this.setState({ isLoading: false });
      })
      .catch(err => console.log(err));
  }

  onGenerateImage = () => {
    this.setState({ isLoading: true });
    this.setState({ input: '' });
    this.setState({ imageURL: '' });
    this.setState({ box: {} });
    const inputImg = document.getElementById('inputValue');
    inputImg.value = '';
    fetch('https://loremflickr.com/500/480/face,portrait,people/all')
      .then((response) => {
        // console.log(response);
        const inputImg = document.getElementById('inputValue');
        const imgURL = response.url;
        inputImg.value = imgURL;
        this.setState({ isLoading: false });
      }
      )
      .catch(err => {
        console.log('Error :-S', err)
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoading ? <ReactLoading className='loading' type='spinningBubbles' color='cylon' height={667} width={600} /> : ''}
        <Particles className='particles'
          params={particlesOption} />
        <Navigation />
        <Logo />
        {/* <Rank /> */}
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
          onGenerateImage={this.onGenerateImage} />
        <FaceRecognition
          box={this.state.box}
          imageURL={this.state.imageURL} />
      </div>
    );
  }
}

export default App;
