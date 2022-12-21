import React from "react";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../../context/theme-context";

class ThemedButton extends React.Component {
    render() {
        let props = this.props
        let theme = this.context
        return (
            <Button
                {...props}
                style={{
                    background: theme.background
                }}
            />
        )
    }
}
ThemedButton.contextType = ThemeContext

export default ThemedButton