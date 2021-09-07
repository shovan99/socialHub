import React , { useEffect , createContext , useReducer , useContext } from "react"

import './App.css';
import Navbar from "./Components/Navbar"

import { BrowserRouter , Switch , Route , useHistory } from "react-router-dom"
import Home from './Components/Screens/Home';
import Profile from "./Components/Screens/Profile"
import Signup from "./Components/Screens/Signup"
import Login from "./Components/Screens/Login"

import CreatePost from "./Components/Screens/CreatePost"

import PostDetail from "./Components/Screens/PostDetail"

import UserProfile from "./Components/Screens/UserProfile"

import { reducer , initialState } from "./reducers/userReducer"

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const {state , dispatch} = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if( user ) {
        dispatch({ type: "USER" , payload: user })
        // history.push("/")
    }
    else {
      history.push("/login")
    }
  },[])
  return (
    <Switch>
      <Route exact path="/" component={Home}> <Home/> </Route>
      <Route exact path="/profile" component={Profile}> <Profile/> </Route>
      <Route exact path="/signup" component={Signup}> <Signup/> </Route>
      <Route exact path="/user/:userId" component={UserProfile}> <UserProfile/> </Route>
      <Route exact path="/postdetail/:postId" component={PostDetail}> <PostDetail/> </Route>
      <Route exact path="/login" component={Login}> <Login/> </Route>
      <Route exact path="/createpost" component={CreatePost}> <CreatePost/> </Route>
    </Switch>
  )
}

function App() {
  const [state , dispatch] = useReducer(reducer , initialState )
  return (
    <UserContext.Provider value={{ state , dispatch }} >
    <BrowserRouter>
      <Navbar/>
      <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
