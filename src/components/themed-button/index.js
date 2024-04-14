import React from "react";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../../context/theme-context";

class ThemedButton extends React.Component {
    render() {
        let props = this.props
        let themeProperty = this.context
        console.log('Theme :', themeProperty)
        return (
            <Button
                {...props}
                style={{
                    ...themeProperty.theme
                }}
            />
        )
    }
}
ThemedButton.contextType = ThemeContext

export default ThemedButton