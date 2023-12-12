export function getNullableResolvedType(cSharpType, required) {
  return required ? cSharpType.replace('?', '') : cSharpType;
}
export function getNullableResolvedPrimaryKeyType(cSharpType, required, databaseType) {
  if (databaseType === 'mongodb') return 'string';
  if (required) {
    return cSharpType.replace('?', '');
  }
  return cSharpType;
}
export function isNumericPrimaryKey(primaryKeyType) {
  return ['long', 'long?', 'int', 'int?'].includes(primaryKeyType);
}
export function getPrimaryKeyType(entity) {
  return entity.primaryKeyType;
}

export function defaultValue(cSharpType) {
  let defaultValue;
  const defaultNumValue = 1;

  switch (cSharpType) {
    case 'string?':
    case 'string':
      defaultValue = '"AAAAAAAAAA"';
      break;
    case 'int':
    case 'int?':
      defaultValue = `${defaultNumValue}`;
      break;
    case 'long':
    case 'long?':
      defaultValue = `${defaultNumValue}L`;
      break;
    case 'float':
    case 'float?':
      defaultValue = `${defaultNumValue}F`;
      break;
    case 'double':
    case 'double?':
      defaultValue = `${defaultNumValue}D`;
      break;
    case 'decimal':
    case 'decimal?':
      defaultValue = `${defaultNumValue}M`;
      break;
    case 'DateTime':
    case 'DateTime?':
      defaultValue = 'DateTime.UnixEpoch';
      break;
    case 'bool':
    case 'bool?':
      defaultValue = 'false';
      break;
    case 'Guid':
    case 'Guid?':
      defaultValue = 'Guid.NewGuid()';
      break;
    default:
      defaultValue = null;
  }

  return defaultValue;
}

export function defaultNilValue(cSharpType) {
  let defaultValue;
  const defaultNumValue = 0;

  switch (cSharpType) {
    case 'string?':
    case 'string':
      defaultValue = '""';
      break;
    case 'int':
    case 'int?':
      defaultValue = `${defaultNumValue}`;
      break;
    case 'long':
    case 'long?':
      defaultValue = `${defaultNumValue}L`;
      break;
    case 'float':
    case 'float?':
      defaultValue = `${defaultNumValue}F`;
      break;
    case 'double':
    case 'double?':
      defaultValue = `${defaultNumValue}D`;
      break;
    case 'decimal':
    case 'decimal?':
      defaultValue = `${defaultNumValue}M`;
      break;
    case 'DateTime':
    case 'DateTime?':
      defaultValue = 'DateTime.UnixEpoch';
      break;
    case 'bool':
    case 'bool?':
      defaultValue = 'false';
      break;
    case 'Guid':
    case 'Guid?':
      defaultValue = 'Guid.NewGuid()';
      break;
    default:
      defaultValue = null;
  }

  return defaultValue;
}

export function updatedValue(cSharpType) {
  let updatedValue;
  const updatedNumValue = 2;

  switch (cSharpType) {
    case 'string':
    case 'string?':
      updatedValue = '"BBBBBBBBBB"';
      break;
    case 'int':
    case 'int?':
      updatedValue = `${updatedNumValue}`;
      break;
    case 'long':
    case 'long?':
      updatedValue = `${updatedNumValue}L`;
      break;
    case 'float':
    case 'float?':
      updatedValue = `${updatedNumValue}F`;
      break;
    case 'double':
    case 'double?':
      updatedValue = `${updatedNumValue}D`;
      break;
    case 'decimal':
    case 'decimal?':
      updatedValue = `${updatedNumValue}M`;
      break;
    case 'DateTime':
    case 'DateTime?':
      updatedValue = 'DateTime.UtcNow';
      break;
    case 'bool':
    case 'bool?':
      updatedValue = 'true';
      break;
    case 'Guid':
    case 'Guid?':
      updatedValue = 'Guid.NewGuid()';
      break;
    default:
      updatedValue = null;
  }

  return updatedValue;
}
