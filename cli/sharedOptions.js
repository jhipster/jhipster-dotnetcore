const normalize = require('normalize-path');
module.exports = {
    outputPathCustomizer: paths => (paths ? normalize(paths).replace(/^src\/main\/webapp([\/$])/g, 'src/main/webapp2$1') : undefined)
};