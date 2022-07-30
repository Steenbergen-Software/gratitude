import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Fragment, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Container } from '../business-view/business-view';
import { GraphqlType } from '../data-dictionary.types';
import GraphqlTypeLabel from '../graphql-type-label/graphql-type-label';

export interface DeveloperViewProps {
  graphqlTypes: GraphqlType[];
  tier: string;
}

export function DeveloperView({ graphqlTypes, tier }: DeveloperViewProps) {
  const { hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const anchor = hash.split('#')[1];

      if (anchor) {
        const anchorElement = document.getElementById(anchor);

        anchorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [hash]);

  return (
    <Container>
      <PrintStyle />
      <Table>
        <TableBody>
          {graphqlTypes
            .filter((t) => t.kind === 'OBJECT')
            .map((o) => (
              <Fragment key={o.name}>
                <TableRow>
                  <Header colSpan={3} id={o.name ?? ''}>
                    {o.name}
                  </Header>
                </TableRow>
                <TableRow>
                  <SubHeader>Field Name</SubHeader>
                  <SubHeader>Description</SubHeader>
                  <SubHeader>Code</SubHeader>
                </TableRow>
                {o.fields.map((f) => (
                  <TableRow key={`${o.name}.${f.name}`}>
                    <PropertyCell>
                      <span>{`${f.name} - `}</span>
                      <GraphqlTypeLabel graphqlType={f.type} />
                    </PropertyCell>
                    <DescriptionCell>{f.description}</DescriptionCell>
                    <CodeCell>{/* Code Sample goes here... */}</CodeCell>
                  </TableRow>
                ))}
              </Fragment>
            ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default DeveloperView;

const Header = styled(TableCell)`
  && {
    color: var(--dark-text);
    background-color: var(--secondary);
    font-size: 1.5rem;
    font-weight: 500;
    padding: 0.75rem;
  }
`;

const SubHeader = styled(TableCell)`
  && {
    color: var(--dark-text);
    background-color: var(--grey);
    font-size: 0.9rem;
    padding: 0.75rem;
  }
`;

const PropertyCell = styled(TableCell)`
  && {
    border-right: 1px solid var(--border);
    white-space: nowrap;
    span {
      font-weight: 500;
    }
  }
`;

const DescriptionCell = styled(TableCell)`
  && {
    border-right: 1px solid var(--border);
  }
`;

const CodeCell = styled(TableCell)``;

const PrintStyle = createGlobalStyle`
  @media print{
    & ${Container} {
      box-shadow:none;

    }

    & ${Header}, ${SubHeader}, ${PropertyCell}, ${DescriptionCell}, ${CodeCell} {
      && {
        color:#000000;
        border: 1px solid #000000;
      }
    }
  }
`;
