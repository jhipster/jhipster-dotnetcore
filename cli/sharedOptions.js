const normalize = require('normalize-path');
module.exports = {
    outputPathCustomizer: [
        paths => (paths ? normalize(paths).replace(/^src\/main\/webapp([\/$])/,  `${this.mainProjectDir}/ClientApp$1`) : undefined),
        paths => (paths ? normalize(paths).replace(/^src\/main\/webapp$/, `${this.mainProjectDir}/ClientApp`) : undefined)
    ]
};