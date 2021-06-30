import { Route, Redirect } from "react-router"


const PrivateRender = (props) => {
    const firstLogin=localStorage.getItem('firstLogin')
    return firstLogin ? <Route {...props} />: <Redirect to='/'/>
}
export default PrivateRender
