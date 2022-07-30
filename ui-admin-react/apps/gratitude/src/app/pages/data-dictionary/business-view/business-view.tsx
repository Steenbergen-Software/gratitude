import { FiberManualRecord as DotIcon } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { GraphqlType } from '../data-dictionary.types';
import getRowsFromFields, { Row } from './get-rows-from-fields';

export interface BusinessViewProps {
  graphqlTypes: GraphqlType[];
  tier: string;
  tiers: string[];
}

export function BusinessView({ graphqlTypes, tier, tiers }: BusinessViewProps) {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    const residentialType = graphqlTypes.find((t) => t.name === 'Residential');

    if (residentialType) {
      setRows(getRowsFromFields([], residentialType.fields, graphqlTypes));
    }
  }, [graphqlTypes]);

  return (
    <Container>
      <PrintStyle />
      <Table>
        <TableHead>
          <StyledRow color="primary">
            <HeadCell>Field Name</HeadCell>
            <HeadCell align="center">Type</HeadCell>
            <HeadCell>Description</HeadCell>
            {!tier &&
              tiers.map((t) => (
                <HeadCell key={t} align="center">
                  {t}
                </HeadCell>
              ))}
          </StyledRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => (
            <StyledRow key={r.propertyPath}>
              <Cell>{r.propertyPath}</Cell>
              <Cell align="center">{r.type}</Cell>
              <Cell>{r.description}</Cell>
              {!tier &&
                tiers.map((t) => (
                  <Cell key={`${r.propertyPath}.${t}`} align="center">
                    <DotIconSmall fontSize="inherit" />
                  </Cell>
                ))}
            </StyledRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default BusinessView;

export const Container = styled(TableContainer)`
  & {
    color: var(--dark-text);
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
    border: 1px solid #ffffff;
  }
`;

const StyledRow = styled(TableRow)`
  border-bottom: 1px solid var(--border);
`;

const HeadCell = styled(TableCell)`
  &:not(:first-child) {
    border-left: 1px solid var(--light-text);
  }

  && {
    background-color: var(--primary);
    color: var(--light-text);
    text-transform: lowercase;

    &::first-letter {
      text-transform: uppercase;
    }
  }
`;

const DotIconSmall = styled(DotIcon)`
  color: #8e8e8e;
`;

const Cell = styled(TableCell)`
  &:not(:first-child) {
    border-left: 1px solid var(--border);
  }
`;

const PrintStyle = createGlobalStyle`
  @media print{
    & ${Container} {
      box-shadow:none;
    }

    & ${HeadCell}, ${Cell} {
      && {
        color:#000000;
        border: 1px solid #000000;
      }

    }
  }
`;
