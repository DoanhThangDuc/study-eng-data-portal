"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateUserRefreshToken = generateUserRefreshToken;
exports.validateAccessToken = validateAccessToken;
const jwt = require("jsonwebtoken");
function generateAccessToken(tokenUser, jwtSecret, expiresIn) {
    const token = jwt.sign(tokenUser, jwtSecret, {
        algorithm: "HS256",
        header: {
            authorization: true,
        },
        expiresIn,
    });
    return { accessToken: token };
}
function generateUserRefreshToken(jwtSecret, sessionId, groupId) {
    const payload = {
        sessionId,
        groupId,
    };
    const token = jwt.sign(payload, jwtSecret, {
        algorithm: "HS256",
        header: {
            refresh: true,
            iat: Math.round(Date.now() / 1000),
        },
    });
    return token;
}
async function validateAccessToken(token, secret) {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    }
    catch (err) {
        throw new Error(err);
    }
}
//# sourceMappingURL=TokenUser.js.map