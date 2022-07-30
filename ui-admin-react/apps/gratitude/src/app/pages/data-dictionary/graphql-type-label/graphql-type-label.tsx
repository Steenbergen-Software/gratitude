import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { GraphqlType } from '../data-dictionary.types';

export interface GraphqlTypeLabelProps {
  graphqlType: GraphqlType;
}

export function GraphqlTypeLabel({ graphqlType }: GraphqlTypeLabelProps) {
  return (
    <>
      {graphqlType.kind === 'ENUM' && (
        <>
          <span>Enum</span>
          <span>&lt;</span>
          <span>{graphqlType.name}</span>
          <span>&gt;</span>
        </>
      )}
      {graphqlType.kind === 'LIST' && graphqlType.ofType && (
        <>
          <span>List</span>
          <span>&lt;</span>
          <GraphqlTypeLabel graphqlType={graphqlType.ofType} />
          <span>&gt;</span>
        </>
      )}
      {graphqlType.kind === 'NON_NULL' && graphqlType.ofType && (
        <>
          <GraphqlTypeLabel graphqlType={graphqlType.ofType} />
          <span>!</span>
        </>
      )}
      {graphqlType.kind === 'OBJECT' && (
        <span>
          <Link component={RouterLink} to={{ hash: `#${graphqlType.name}` }}>
            {graphqlType.name}
          </Link>
        </span>
      )}
      {graphqlType.kind === 'SCALAR' && <span>{graphqlType.name}</span>}
    </>
  );
}

export default GraphqlTypeLabel;
