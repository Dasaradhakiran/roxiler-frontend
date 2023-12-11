import {ThreeDots} from "react-loader-spinner"
import './index.css'

const LoaderView = () => (
    <div className="loader-container" data-testid="loader">
        <ThreeDots color="#000000" height="50" width="50" />
    </div>
)

export default LoaderView