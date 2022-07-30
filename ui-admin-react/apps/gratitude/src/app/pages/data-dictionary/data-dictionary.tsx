import { Print as PrintIcon } from '@mui/icons-material';
import { Button, MenuItem, Select, SelectChangeEvent, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import BusinessView from './business-view/business-view';
import { GraphqlType } from './data-dictionary.types';
import DeveloperView from './developer-view/developer-view';
//import { useFetchGraphql } from '../../hooks';

export function DataDictionary() {
  // const { data, error, fetchGraphql, loading } = useFetchGraphql();

  const [introspection, setIntrospection] = useState<GraphqlType[]>([]);
  const [tier, setTier] = useState<string>('');
  const [tiers, setTiers] = useState<string[]>([]);
  const [view, setView] = useState<'business' | 'developer'>('business');

  useEffect(() => {
    fetch('assets/temporary-introspection.json')
      .then((r) => r.json())
      .then((d: { data: { __schema: { types: GraphqlType[] } } }) => {
        if (d) {
          setIntrospection(d.data.__schema.types);

          const tierType = d.data.__schema.types.find((t) => t.name === 'Tier');

          if (tierType) {
            setTiers(tierType.enumValues.map((v) => v.name));
          }
        }
      });

    /*
    fetchGraphql(`
    query GetTypesQuery {
      __schema {
        types {
            name
            kind
            description
            enumValues {
                name
                description
            }
            ofType {
                kind
                name
            }
            interfaces {
                kind
                name
            }
            possibleTypes {
                kind
                name
            }
            fields {
                name
                description
                type {
                    kind
                    name
                    ofType {
                        kind
                        name
                    }
                }
            }
        }
      }
    }
    `);*/
  }, []);

  const handleTierChange = (e: SelectChangeEvent<string>) => {
    setTier(e.target.value);
  };

  return (
    <Container>
      <PrintStyle />
      <Title>Data Dictionary</Title>
      <Header>
        <ToggleButtonGroup value={view} exclusive>
          <StyledButton onClick={() => setView('business')} value="business">
            Business View
          </StyledButton>
          <StyledButton onClick={() => setView('developer')} value="developer">
            Developer View
          </StyledButton>
        </ToggleButtonGroup>

        <StyledSelect displayEmpty value={tier} onChange={handleTierChange}>
          <MenuItem key="Show all" value={''}>
            Show all
          </MenuItem>
          {tiers.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </StyledSelect>
        <PrintContainer>
          <PrintButton size="small" onClick={() => window.print()}>
            Print page <PrintIcon />
          </PrintButton>
        </PrintContainer>
      </Header>
      {view === 'business' && <BusinessView graphqlTypes={introspection} tier={tier} tiers={tiers} />}
      {view === 'developer' && <DeveloperView graphqlTypes={introspection} tier={tier} />}
    </Container>
  );
}

export default DataDictionary;

const Container = styled.div`
  padding: 5rem;
`;

const Header = styled.div`
  display: flex;
  gap: 2.5rem;
  height: 40px;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--primary);
  font-weight: 400;
  letter-spacing: 0.83px;
`;

const PrintContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: end;
`;

const PrintButton = styled(Button)`
  && {
    display: flex;
    gap: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const StyledButton = styled(ToggleButton)`
  && {
    width: 17ch;
    color: var(--dark-text);
    background-color: var(--grey);
    font-size: 0.9rem;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.35px;
    text-transform: capitalize;
    border: none;

    &:hover {
      background-color: var(--grey-hover);
    }

    &.Mui-selected {
      color: var(--light-text);
      background-color: var(--primary);
      box-shadow: var(--shadow);

      &:hover {
        background-color: var(--primary-hover);
      }
    }
  }
`;

const StyledSelect = styled(Select)`
  && {
    width: 40ch;
    font-size: 0.8rem;
    border-color: var(--border);
    background-color: var(--grey);

    &:hover {
      background-color: var(--grey-hover);

      & fieldset {
        border-color: var(--border-hover);
      }
    }
  }
` as typeof Select;

const PrintStyle = createGlobalStyle`
  @media print {
    & ${Container} {
      padding:0;
      height:100vh;
    }

    .MuiDrawer-root, header, footer {
      display: none !important;
    }

    html, body {
      height:100vh;
    }
  }
  `;
