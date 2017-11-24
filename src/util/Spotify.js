const CLIENT_ID = '';
const REDIRECT_URI = 'http://localhost:3000';
let accessToken; // 77
// const baseAPIURL = 'https://api.spotify.com/v1/';

const Spotify = { // 76
    getAccessToken() { // 78
        // console.log('initial access token ', accessToken);
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            return accessToken;
          } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
            window.location = accessUrl;
          }
    },

    search(searchTerm) { // 85
        const accessToken = Spotify.getAccessToken();
            // console.log('access token ', accessToken);   
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
                {headers:{Authorization: `Bearer ${accessToken}`}})
        .then(response => {
            // console.log('response ', response);
            return response.json();
        }).then(jsonResponse => {
             // 87
             if (jsonResponse) {
                // console.log('returned jsonResponse\n', jsonResponse.tracks.items);
                let trackResults = jsonResponse.tracks.items.map(track => {
                   return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                });
                console.log('returned jsonResponse\n', trackResults);
                return trackResults;
             }
             return ([]);
        });
    },

    savePlaylist(playlistName, URIs) { // 90 91
        // console.log(playlistName);
        // console.log(URIs);

        if ( !(playlistName && URIs)) {
            return
        }
        let currentAccessToken = window.location.href.match(/access_token=([^&]*)/);
        // console.log('my access token: ', currentAccessToken[1]);
        // let headers = headers: {
        //     Authorization: `Bearer ${currentAccessToken[1]}`
        // };
        let my_ID = '';
        fetch("https//api/.spotify.com/v1/me", {headers: {
            Authorization: `Bearer ${currentAccessToken[1]}`
        }})
            .then(profile => {
                console.log('profile..: ', profile);
                my_ID = profile..json().id;
                return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${my_ID}/playlists`, {headers:{method: 'POST', 'Content-Type': 'application/json', body:{name: playlistName}}})
            })
                // 94
            .then(response =>{
                console.log('response...: ', response)
                const playlistID = response.id;
                return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${my_ID}/playlists/${playlistID}/tracks/${URIs}`, {headers:{method: 'POST','Content-Type': 'application/json'} })
            });
    }
}

export default Spotify; // 76