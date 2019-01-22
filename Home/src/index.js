import logMessage from './js/logger'
import './css/style.css'

logMessage("Index ...")

if (module.hot) {
    module.hot.accept()
}