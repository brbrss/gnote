const { DbConnectionError, NotFoundError, AuthenticationError, OperationError } = require('./modelError');

const loadSql = require('./loadSql');

let crypto = require('crypto');

const FP_LIST = {
    'insert': './sql/auth/insert.sql',
    'findByName': './sql/auth/findByUsername.sql',
};

const Auth = {};

Auth.init = async function () {
    await loadSql(this, FP_LIST);
}


Auth.hashFun = function (password, salt, cb) {
    crypto.pbkdf2(password, salt, 320000, 32, 'sha256', cb);
}

Auth.hashFunPromise = function (password, salt) {
    function pfun(res, rej) {
        let _cb = function (err, derivedKey) {
            if (err) {
                rej(err);
            } else {
                res(derivedKey.toString('hex'));
            }
        }
        Auth.hashFun(password, salt, _cb);
    }
    return new Promise(pfun);
}

/**
 * Returns user id if succeeded.
 * @param {String} username 
 * @param {String} password 
 * @returns user id
 */
Auth.create = async function (username, password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const hashedPw = await this.hashFunPromise(password, salt);
    try {
        const res = await this.client.query(this.sql['insert'], [username, salt, hashedPw]);
        return Number(res.rows[0].user_id);
    } catch (err) {
        if (err.code = '23505') { //23505 	unique_violation
            throw new OperationError('Usernamed already exists', { cause: err });
        }
        throw new DbConnectionError(err.message, { cause: err });
    }
}

/**
 * Throws error if credential doesn't match.
 * Returns user id if credential matches.
 * 
 * @param {String} username 
 * @param {String} password 
 * @returns user id 
 */
Auth.verify = async function (username, password) {
    let res;
    try {
        res = await this.client.query(this.sql['findByName'], [username]);
    } catch (err) {
        throw new DbConnectionError(err.message, { cause: err });
    }
    if (res.rows.length === 0) {
        throw new AuthenticationError('Username not found');
    }
    const salt = res.rows[0].salt;
    const hashedPw = res.rows[0].hashed_pw;
    const userId = res.rows[0].user_id;
    if (hashedPw === await this.hashFunPromise(password, salt)) {
        return Number(userId);
    } else {
        throw new AuthenticationError('Password does not match');
    }
}

module.exports = Auth;
