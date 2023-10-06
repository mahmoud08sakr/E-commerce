

export const validate = (schema) => {
    return (req, res, next) => {


        let inputes = {...req.body, ...req.query , ...req.params}
        let { error } = schema.validate(inputes, { abortEarly: false });
        if (error) {
            let errors = error.details.map((detail) => detail.message)
            res.json({ message: "error from validate", errors })
        } else {
            next()
        }

    }
}