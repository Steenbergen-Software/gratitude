type GraphqlKind = 'ENUM' | 'LIST' | 'NON_NULL' | 'OBJECT' | 'SCALAR';

interface GraphqlEnumValue {
  name: string;
  description: string | null;
}

export interface GraphqlField {
  name: string;
  deprecationReason: string | null;
  description: string | null;
  isDeprecated: boolean;
  type: GraphqlType;
}

export interface GraphqlType {
  name: string | null;
  kind: GraphqlKind;
  enumValues: GraphqlEnumValue[];
  description: string | null;
  ofType: GraphqlType | null;
  fields: GraphqlField[];
}
