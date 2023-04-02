export interface ValidationErrorSimple {
  field: string,
  errors: {[type: string]: string}
}

