function Auth() {
    return (
        <a href='https://www.strava.com/oauth/authorize?client_id=100352&redirect_uri=http://localhost:3000/&response_type=code&scope=activity:read_all,activity:write'>
          <button>Auth</button>
        </a>
    )
}

export default Auth;