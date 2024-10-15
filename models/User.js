const client = require('../config/db')

const selectAll = async () => {
    const x = await client.query(`
        SELECT * FROM users;
        `)
    return x.rows;
}

const selectWhere = async (field, value) => {
    const x = await client.query(`
        SELECT * FROM users
        WHERE ${field} = '${value}';
        `)
    return x.rows;
}

const insert = async (name, email, mobile, password) => {
    try {
        await client.query(`
            INSERT INTO users (name, email, mobile, password)
            VALUES ('${name}', '${email}', '${mobile}', '${password}');
        `);
    } catch (err) {
        console.log(err.message);
    }
};


module.exports = { selectAll, selectWhere, insert }