import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import './Mobile.css'
import formula from '../abis/Formula.json'
import Navbar from './Navbar'
import Footer from './Footer'
import Main from './Main'

//Declare from package
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {

    async componentWillMount() {
      await this.loadWeb3()
      await this.loadBlockchainData()
    }

    async loadWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      }
      else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    }

    async loadBlockchainData() {
      const web3 = window.web3
      // Load account
      const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
      //network ID
      const networkId = await web3.eth.net.getId()
      const networkData = formula.networks[networkId]
      if(networkData) {
        const Formula = web3.eth.Contract(formula.abi, networkData.address)
        this.setState({ Formula })
        const imagesCount = await Formula.methods.imageCount().call()
        this.setState({ imagesCount })
        // Load images
        for (var i = 1; i <= imagesCount; i++) {
          const image = await Formula.methods.images(i).call()
          this.setState({
            images: [...this.state.images, image]
          })
        }
        // Sort images. Show highest tipped images first
      this.setState({
        images: this.state.images.sort((a,b) => b.tipAmount - a.tipAmount )
      })
        this.setState({ loading: false })
      } else {
        window.alert('formula contract not deployed to detected network')
      }
    }

  captureFile = event => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

    uploadImage = description => {
        console.log("Submitting file to ipfs...")

        //adding file to the IPFS
        ipfs.add(this.state.buffer, (error, result) => {
          console.log('Ipfs result', result)
          if(error) {
            console.error(error)
            return
          }

        this.setState({ loading: true })
        this.state.Formula.methods.uploadImage(result[0].hash, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })
        })
      })
    }

      tipImageOwner = (id, tipAmount) => {
    this.setState({ loading: true })
    this.state.Formula.methods.tipImageOwner(id).send({ from: this.state.account, value: tipAmount }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      Formula: null,
      images: [],
      loading: true
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <section id="loader-container"><div id="loader" className="text-center"><p>Loading...</p></div></section>
          : <Main
              images={this.state.images}
              captureFile={this.captureFile}
              uploadImage={this.uploadImage}
              tipImageOwner={this.tipImageOwner}
            />
          }
      <Footer/>
      </div>
      
    );
  }
}

export default App;