import Joi from 'joi';

export const validateReport = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        amount: Joi.number().required(),
    });
    return schema.validate(data);
};
