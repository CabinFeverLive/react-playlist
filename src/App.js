import React , { Component } from 'react';
import './App.css';


let defaultStyle = {
  color: '#fff'
}

let fakeServerData = {
  user: {
    name: 'David',
    playlists: [
      {
        name: 'My Favorites' , 
        songs: [
          {name: 'Beat It', duration: 1345}, 
          {name: 'My Milkshake', duration: 1342}, 
          {name: 'Protect ya neck!', duration: 3130}]
      },
      {
        name: 'Discover Weekly' , 
        songs: [
          {name: 'Shyness', duration: 1345}, 
          {name: 'Lay by', duration: 1342}, 
          {name: 'Locket', duration: 3130}]
      },
      {
        name: 'Another playlist - the best!' , 
        songs: [ 
          {name: 'Real Love', duration: 1345}, 
          {name: 'Volume', duration: 1342}, 
          {name: 'Chowder', duration: 3130}]
      },
      {
        name: 'Playlist - yeah!' , 
        songs: [ 
          {name: 'Oblivion', duration: 1345}, 
          {name: 'All Must Pass', duration: 1342}, 
          {name: 'Get em', duration: 3130}]
      },
    ]
  }
}

class PLaylistCounter extends Component{
  render(){
    console.log(this.props)
    return(
      <div style={{...defaultStyle, width: '40%', display:'inline-block'}}>
        <h2>{this.props.playlist.length} playlists</h2>
      </div>
    );
    
  }
}

class HoursCounter extends Component{
  render(){
    let allSongs = this.props.playlist.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    } , [])
    let totalDuration = allSongs.reduce((sum, eachSong)=> {
      return sum + eachSong.duration
    } ,0)
    
    return(
      <div style={{...defaultStyle, width: '40%', display:'inline-block'}}>
        <h2>{Math.floor(totalDuration/60)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component{
  render(){
    return(
      <div style={defaultStyle}>
        <img/>
        <input onKeyUp={event => this.props.onTextChange(event.target.value)} />
      </div>
    )
  }
}

class Playlist extends Component {
  render(){
    return(
      <div style={{...defaultStyle, width: '25%', display:'inline-block'}}>
        <img/>
        <h3>{this.props.playlists.name}</h3>
        <ul>
          {this.props.playlists.songs.map(song => 
            <li>{song.name}</li>)}
        </ul>
      </div>
    );
  }
}

class App extends Component {
   constructor(){
     super();
     this.state = {serverData: {},
     filterString: '',
  };
 }
 componentDidMount(){
   setTimeout(() =>{
     this.setState({serverData: fakeServerData})
   }, 1000);
 }
  render(){
    return(
    <div className="App">
      {this.state.serverData.user ? 
      <div>
        <h1 style={{...defaultStyle, 'font-size': '54px'}}>
          {this.state.serverData.user.name}'s playlists
        </h1>

        <PLaylistCounter playlist={this.state.serverData.user.playlists}/>
        <HoursCounter playlist={this.state.serverData.user.playlists} />
        
        <Filter onTextChange={text => {
          console.log(text)
          this.setState({filterString: text})
        }}/>
        {this.state.serverData.user.playlists.filter( playlist =>
          playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
        ).map(playlists => 
        <Playlist playlists={playlists} />
        )}
      </div> : <h1 style={defaultStyle}>Loading...</h1>
  }
  </div>
  );
}}
  

export default App;
