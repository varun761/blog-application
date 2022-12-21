import { string } from 'prop-types'

const ErrorMessage = ({ text }) => (<p className="text-danger mt-2">{text}</p>)

ErrorMessage.propTypes = {
     /** Text message */
    text: string
}

ErrorMessage.defaultProps = {
    text: ''
}

export default ErrorMessage