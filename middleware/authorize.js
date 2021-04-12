export default ({ redirect, route, $auth }) => {
  if (route.path !== '/login' && !$auth.loggedIn) {
    return redirect('/login')
  }
}
