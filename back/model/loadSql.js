const fs = require('fs/promises');


async function loadSql(modul, fpList) {
    modul.sql = {};
    async function load(name, fp) {
        const str = await fs.readFile(fp, { encoding: 'utf8' });
        modul.sql[name] = str;
    }
    const promiseArr = [];
    for (const name in fpList) {
        const promise = load(name, fpList[name]);
        promiseArr.push(promise);
    }
    await Promise.all(promiseArr);
}

module.exports = loadSql;
