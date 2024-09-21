const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) {
            res.status(401).json({"Error": "No roles"});
            return;
        }
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles);
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) {
            console.log("here");
            res.status(401).json({"ERROR": "Unauthorized"});
            return;
        }
        next();
    }
}

module.exports = verifyRoles;