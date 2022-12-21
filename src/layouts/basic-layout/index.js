import { useContext } from "react"
import NavigationBar from "../../components/navigation-bar"
import AppContext from "../../context/app-context"
import './index.scss'

const BasicLayout = (props) => {
    return (
        <>
            <NavigationBar/>
            <section className="section">
                {props.children}
            </section>
        </>
    )
}

export default BasicLayout