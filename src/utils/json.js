const toJSON = (schema) => {
  switch (schema.type) {
    case 'string':
      return ''
    case 'array':
      return [];
    case 'boolean':
      return true
    case 'null':
      return null;
    case 'number':
    case 'integer':
      return 0;
    case 'object': {
      const value = {};
      Object.keys(schema.properties).forEach((key) => {
        value[key] = toJSON(schema.properties[key]);
      });
      return value;
    }
    default:
      return;
  }
}

export const schemaToJSON = (schema) => {
  const json = toJSON(schema);
  return json;
};