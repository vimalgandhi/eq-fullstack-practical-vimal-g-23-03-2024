const _ = require("lodash")
const Jwt = require("./helpers/jwt.helper");
const { userModel } = require("./models/users.model");
const constants = require("./constants")

const Middleware = {

    async userExists(email) {
        const user = await userModel.findOne({ email });
        return user;
    },

    destructPager(req, _, next) {
        const {
            page = constants.PAGER.page,
            limit = constants.PAGER.limit,
        } = req.query;

        req.pager = {
            page: +page,
            limit: +limit
        };
        next();
    },

    async auth(req, res, next) {
        if (req.headers.authorization && !_.isEmpty(req.headers.authorization)) {
            const tokenInfo = Jwt.decode(req.headers.authorization.toString().replace("Bearer ", ""));
            if (tokenInfo) {
                const _user = await userModel.findOne({ _id: tokenInfo.id })
                    .select(constants.DEFAULT_USER_MODAL_EXCLUDE)
                    .exec();

                if (_user) {
                    req.me = _user;
                    next();
                } else {
                    res.status(401).json({ error: "Unauthorized", code: 401 });
                    return;
                }
            } else {
                res.status(401).json({ error: "Unauthorized", code: 401 });
                return;
            }
        } else {
            res.status(401).json({ error: "Unauthorized", code: 401 });
            return;
        }
    },

    acl(roles) {
        let allowedRoles = roles;
        if (typeof roles === "string") {
            allowedRoles = [roles];
        }
        return (req, res, next) => {
            const { me: { role } } = req;
            allowedRoles.includes(role) ? next() : res.status(403).json({ error: "Access Denied" });
        }
    }
}

module.exports = Middleware;
