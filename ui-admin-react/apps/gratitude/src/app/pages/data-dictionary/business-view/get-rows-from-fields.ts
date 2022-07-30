import { GraphqlField, GraphqlType } from '../data-dictionary.types';

export interface Row {
  propertyPath: string;
  type: string | null;
  description: string | null;
}

function getRowsFromFields(path: string[] = [], fields: GraphqlField[], types: GraphqlType[]): Row[] {
  const rows: Row[] = [];

  return fields.reduce((p, c) => {
    const rows: Row[] = [];

    const type = types.find((t) => t.name === (c.type.name ?? c.type.ofType?.name ?? c.type.ofType?.ofType?.name));

    if (!type) {
      throw Error('An issue occurred while parsing the graphql schema.');
    }

    if (type.kind === 'SCALAR') {
      rows.push({
        description: c.description,
        propertyPath: [...path, c.name].join('.'),
        type: type.name,
      });
    } else if (type.kind === 'NON_NULL') {
      const ofType = types.find((t) => t.name === c.type.ofType?.name);

      if (!ofType) {
        throw Error('An issue occurred while parsing the graphql schema.');
      }

      if (ofType.kind === 'SCALAR') {
        rows.push({
          description: c.description,
          propertyPath: [...path, c.name].join('.'),
          type: ofType.name,
        });
      }
    } else if (type.kind === 'OBJECT') {
      rows.push(...getRowsFromFields([...path, c.name], type.fields, types));
    }

    return [...p, ...rows];
  }, rows);
}

export default getRowsFromFields;
