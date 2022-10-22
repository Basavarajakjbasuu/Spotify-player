const CLIENT_ID = "02bfed7678d44411876528b8b3c325c4"
const scopes = "user-top-read user-follow-read playlist-read-private user-library-read"
const REDIRECT_URI = "http://localhost:3000/login/login.html"
const ACCESS_TOKEN_KEY = "accessToken"
const APP_URL = "http://localhost:3000"

// Authorising the user 
const authorizeUser = () => {
  const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}&show_dailog=true`
  window.open(url, "login", "width=600, height=400")
}

document.addEventListener("DOMContentLoaded" , () => {
  const loginButton = document.getElementById('login-to-spotify');
  loginButton.addEventListener('click', authorizeUser)
})

// Storing expiresIn time, AccsseToken and Token type in localStorage
window.setItemsLocalStorage = ({accessToken, tokenType, expiresIn}) =>{
  localStorage.setItem("expriesIn", expiresIn)
  localStorage.setItem("accessToken", accessToken)
  localStorage.setItem("tokenType", tokenType)
  window.location.href = APP_URL
}

window.addEventListener('load', ()=>{
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  // If acessToken is there then redirect to dashBoard
  if(accessToken) {
    window.location.href = `${APP_URL}/dashboard/dashboard.html`
  }

  // login page is opened in popup or not
  if(window.opener !== null && !window.opener.closed) {
    window.focus()

    // if there any erorr it will close
    if(window.location.href.includes("error")) {
      window.close
    }
    
    // if there is no error then get hash from location
    const {hash} = window.location;
    const searchParams = new URLSearchParams(hash);
    const accessToken = searchParams.get("#access_token")

    const  tokenType = searchParams.get("token_type")
    const expiresIn = searchParams.get("expires_in")
    if(accessToken) {
      window.close();
      // this openner will set itmes in local storage
      window.opener.setItemsLocalStorage({accessToken, tokenType, expiresIn})
      
    }else {
      window.close()
    }
  }
})