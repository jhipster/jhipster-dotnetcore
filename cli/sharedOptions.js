const path = require('path');
module.exports = {
    outputPathCustomizer: paths => (paths ? path.normalize(paths).replace(/^src\\main\\webapp\\/g, 'src/main/webapp2/') : undefined)
};