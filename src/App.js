import React , { Component } from 'react';
import './App.css';
import queryString from 'query-string';


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

class PlaylistCounter extends Component{
  render(){
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
        <img />
        <input onKeyUp={event => this.props.onTextChange(event.target.value)} />
      </div>
    )
  }
}

class Playlist extends Component {
  render(){
    console.log(this.props.playlists)
    return(
      <div style={{...defaultStyle, width: '25%', display:'inline-block'}}>
        <img src={this.props.playlists.imageUrl}/>
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
   let parsed = queryString.parse(window.location.search);
   let accessToken = parsed.access_token;

   fetch('https://api.spotify.com/v1/me', {
     headers: {'Authorization': 'Bearer ' + accessToken}
   }).then((response)=>response.json())
   .then(data => this.setState({user: {name: data.display_name}}))
   
   fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {'Authorization': 'Bearer ' + accessToken}
  }).then((response)=>response.json())
  .then(data => this.setState({playlists: data.items.map(item => {
    console.log(item.images[0])
    return{
      name: item.name,
      imageUrl: item.images[0],
      songs: []
    }
 })
 })) 


  }


  render(){
    let playlistToRender = 
    this.state.user && 
    this.state.playlists ? 
    this.state.playlists.filter( playlist =>
      playlist.name.toLowerCase().includes(
        this.state.filterString.toLowerCase())
        ) : []
    return(
    <div className="App">
      {this.state.user ? 
      <div>
        <h1 style={{...defaultStyle, 'font-size': '54px'}}>
          {this.state.user.name}'s playlists
        </h1>
        <PlaylistCounter playlist={playlistToRender}/>
        <HoursCounter playlist={playlistToRender} />
        <Filter onTextChange={text => {
          this.setState({filterString: text})
        }}/>
        {playlistToRender.map(playlists => 
        <Playlist playlists={playlists} />
        )}
      </div> : <button onClick={()=> window.location='http://localhost:8888/login'}
      style={{padding: '20px', 'font-size': '45px', 'margin-top': '20px'}}>Sign in to Spotify</button>
  }
  </div>
  );
}}
  

export default App;
