const fs = require('fs');

/**
 * 用于在npm run gw后将相关js文件拷贝到指定目录
 */
const copyLibrary2Vendors = function () {
    // todo:判断文件是否存在
    copyFile("./node_modules/@goldwind/jsutils/dist/goldwind.jsutils.js", "./public/vendors/goldwind.jsutils.js")
}

function copyFile(from, to) {
    fs.exists(from, function (flag) {
        if (!flag) return
        fs.writeFileSync(to, fs.readFileSync(from));
    })
}
module.exports = {
    copyLibrary2Vendors
}