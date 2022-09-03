import { useContext } from "react"
import { Container } from "react-bootstrap"
import NavigationBar from "../../components/navigation-bar"
import AppContext from "../../context/app-context"

const BaseLayout = (props) => {
    const appContext = useContext(AppContext)
    return (
        <>
            {appContext ? JSON.stringify(appContext) : null}
            <NavigationBar isAuth={appContext?.user}/>
            {props.children}
        </>
    )
}

export default BaseLayout