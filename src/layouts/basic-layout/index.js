import { useContext } from "react"
import NavigationBar from "../../components/navigation-bar"
import AppContext from "../../context/app-context"
import './index.scss'

const BasicLayout = (props) => {
    const appContext = useContext(AppContext)
    return (
        <>
            <NavigationBar isAuth={appContext?.user}/>
            <section className="section">
                {props.children}
            </section>
        </>
    )
}

export default BasicLayout