const CLIENT_ID = '';
const REDIRECT_URI = 'http://localhost:3000';
const accessToken = ''; // 77
// const baseAPIURL = 'https://api.spotify.com/v1/';

const Spotify = { // 76
    getAccessToken() { // 78
        console.log('initial access token ', accessToken);
        if (accessToken) {
            return new Promise(resolve => resolve(accessToken));
        }
            // 79
        return fetch('https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize/?client_id=' + CLIENT_ID + '&response_type=code&redirect_uri=' + REDIRECT_URI)
            .then(response => { 
                console.log('response from token request', response);
                const url = window.location.href;
                console.log('url ', url);
                if (url.match(/expires_in=([^&]*)/) && url.match(/access_token=([^&]*)/)) {
                    console.log("working")
                    } else { 
                    console.log("error")
                    }

                // if (url.match(/expires_in=([^&]*)/) && url.match(/access_token=([^&]*)/)) {
                //     const expiresIn = response.json().expires_in;
                //     let accessToken = response.json().access_token;
                //     console.log('WORKING: returned access-token ', accessToken);
                //     window.setTimeout(() => {
                //         accessToken = ''
                //     }, expiresIn * 1000);
                //     window.history.pushState('Access Token', null, '/');
                    
                //     return accessToken;

                // } else { // 83
                //     console.log('NOT WORKING: returned access-token ', accessToken);
                //     window.location = `https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize?
                //     client_id=${CLIENT_ID}
                //     &response_type=token
                //     &scope=playlist-modify-public
                //     &redirect_uri=${REDIRECT_URI}`
                // }
            })
    },

    search(searchTerm) { // 85
        Spotify.getAccessToken().then(accessToken =>{
            console.log('access token ', accessToken);   
            return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
                {headers:{Authorization: `Bearer ${accessToken}`}})})
        .then(response => {
            console.log('response ', response);
            return response.json();
        }).then(jsonResponse => {
             // 87
             console.log('returned jsonResponse\n', jsonResponse);
             if (jsonResponse) {
                
                return jsonResponse.map(track => (
                    {
                        ID: track.id,
                        Name: track.name,
                        Artist: track.artist[0].name,
                        Album: track.album.name,
                        URI: track.uri
                    }
                ));
             }
             return ([]);
        });
    },

    savePlaylist(playlistName, URIs) { // 90 91
        if ( !(playlistName&&URIs)) {
            return
        }
        let currentAccessToken = window.location.href.match(/access_token=([^&]*)/);
        let headers = {
            Authorization: {Bearer: currentAccessToken}
        };
        let my_ID = '';
        fetch("https://cors-anywhere.herokuapp.com/https//api/.spotify.com/v1/me")
            .then(profile => {
                my_ID = profile.json().id;
                return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${my_ID}/playlists`, {headers:{method: 'POST', 'Content-Type': 'application/json', body:{name: playlistName}}})
            })
                // 94
        .then(response =>{
            const playlistID = response.json().id;
            fetch(`https://api.spotify.com/v1/users/${my_ID}/playlists/${playlistID}/tracks/${URIs}`, {headers:{method: 'POST','Content-Type': 'application/json'} })
        })
    }
}

export default Spotify; // 76