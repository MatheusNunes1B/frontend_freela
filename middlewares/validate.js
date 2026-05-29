function validateRequiredFields(fields, body) {
    const missingFields = fields.filter((field) => body[field] === undefined || body[field] === null || body[field] === '');

    if (missingFields.length > 0) {
        return `Campos obrigatórios ausentes: ${missingFields.join(', ')}.`;
    }

    return null;
}

module.exports = { validateRequiredFields };
