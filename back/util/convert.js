
function toNumber(s, fallBack) {
    const x = Number(s);
    return x ? x : fallBack;
}

module.exports = toNumber;
