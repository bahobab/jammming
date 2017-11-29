const CLIENT_ID = '';
// const REDIRECT_URI = 'http://localhost:3000';
const REDIRECT_URI = 'http://rfk.surge.sh';
let accessToken;
// const baseAPIURL = 'https://api.spotify.com/v1/';

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        // console.log('Expire in: ', expiresInMatch);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
          } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
            window.location = accessUrl;
          }
    },

    search(searchTerm) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
                {headers:{Authorization: `Bearer ${accessToken}`}})
        .then(response => {
            return response.json();
        }).then(jsonResponse => {
            // console.log('jsonResponse: ', jsonResponse);
             if (jsonResponse) {
                let trackResults = jsonResponse.tracks.items.map(track => {
                   return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                });
                return trackResults;
             }
             return ([]);
        });
    },

    savePlaylist(playlistName, URIs) {
        
        if ( !(playlistName && URIs)) {
            return
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let my_ID = '';
        return fetch("https://api.spotify.com/v1/me", {headers: headers})
            .then(profile => {
                return profile.json();
            })
            .then(jsonResponse => {
                my_ID = jsonResponse.id;
                return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${my_ID}/playlists`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({name: playlistName})
                   } )
                })
                    .then( playlistResponse =>  {
                        return playlistResponse.json()
                    })
                    .then(playlistJson => {
                        const playlistID = playlistJson.id;
                        return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${my_ID}/playlists/${playlistID}/tracks`, {
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({uris: URIs})
                        })
                    })
                
    }
}

export {Spotify};

// https://github.com/github/fetch#json