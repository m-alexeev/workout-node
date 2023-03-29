type ValidationErrorSimple = {
    field: string,
    errors: {[type: string]: string},
}

type ValidationErrorObj = {
    valid?: boolean,
    errors: ValidationErrorSimple[]
}

export {ValidationErrorObj, ValidationErrorSimple}