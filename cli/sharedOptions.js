module.exports = {
    outputPathCustomizer: paths => (paths ? paths.replace(/^src\/main\/webapp([/$])/, 'src/main/webapp2$1') : undefined)
};