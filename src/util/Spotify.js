const CLIENT_ID = 'a73c249bf19e412ab5f0c534503c6632';
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
                // console.log('returned jsonResponse\n', trackResults);
                return trackResults;
             }
             return ([]);
        });
    },

    savePlaylist(playlistName, URIs) { // 90 91
        
        if ( !(playlistName && URIs)) {
            return
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken} `};
        let my_ID = '';
        return fetch("https://api.spotify.com/v1/me", {headers: { Authorization: `Bearer ${accessToken} `}})
            .then(profile => {
                console.log('profile..: ', profile);
                return profile.json();
            })
            .then(jsonResponse => {
                my_ID = jsonResponse.id;
                console.log('MY ID... ', my_ID);

                return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${my_ID}/playlists`, {
                    headers: {
                    Authorization: `Bearer ${accessToken}`},
                    method: 'POST',
                    body: JSON.stringify({name: playlistName})
                   } )
                })
                // 94
                    .then( playlistResponse =>  {
                        return playlistResponse.json()
                    })
                    .then(playlistJson => {
                        console.log('PLaylist JSON', playlistJson.id);
                        const playlistID = playlistJson.id;

                        return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${my_ID}/playlists/${playlistID}/tracks`, {
                            headers: {
                            Authorization:`Bearer ${accessToken}`},
                            method: 'POST',
                            body: JSON.stringify({uris: URIs})
                        })
                    })
                
    }
}

export default Spotify; // 76