import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp'
import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp'
import HomeSharpIcon from '@material-ui/icons/HomeSharp'
import {IconButton} from '@material-ui/core'
import {grey} from '@material-ui/core/colors'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import {UserAvatar} from '../users/UserAvatar'
import {logout} from './authSlice'
import instaLogo from '../../images/instaLogo.png'

export const NavBar = ({userId}) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    history.push('/login')
  }

  const toUserProfile = () => {
    history.push('/')
  }

  return (
    <div className="navbar">
      <img className="navbar__instaLogo" src={instaLogo} alt="logo" onClick={toUserProfile} />
      <div className="navbar__headerIcons">
        <IconButton className="navbar__iconButton" onClick={toUserProfile}>
          <HomeSharpIcon fontSize="large" style={{color: grey[900]}} />
        </IconButton>
        <IconButton className="navbar__iconButton">
          <FavoriteSharpIcon fontSize="large" />
        </IconButton>
        <UserAvatar userId={userId} size="medium" />
        <Box ml={2}>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </div>
    </div>
  )
}
