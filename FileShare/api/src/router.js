const chalk = require('chalk')

class AppRouter {
    constructor(app) {
        this.app = app
        this.setupRouters()
    }

    setupRouters() {

        const app = this.app
        
        console.log(chalk.green('App Routing is set up'))
    }
}

export default AppRouter