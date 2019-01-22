import logMessage from './js/logger'
import './css/style.css'

logMessage("Index ...")

if (typeof(module.hot) !== 'undefined') {
    module.hot.accept()
}