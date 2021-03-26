import fire from '../fire'

const handleLogout = () => {
  fire.auth().signOut()
  localStorage.removeItem('user_id')
  localStorage.removeItem('user_email')
  window.location.href = "/";
}

export { handleLogout}