import { render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import DataDictionary from './data-dictionary';

describe('DataDictionary', () => {
  const server = setupServer(
    rest.get('assets/temporary-introspection.json', (req, res, ctx) => {
      return res(
        ctx.json({
          data: {
            __schema: {
              types: [
                {
                  name: 'ACUnit',
                  kind: 'OBJECT',
                  description: null,
                  enumValues: [],
                  ofType: null,
                  interfaces: [],
                  possibleTypes: [],
                  fields: [
                    {
                      deprecationReason: null,
                      isDeprecated: false,
                      name: 'geometry',
                      description: 'Geometry of each ac unit occurrence within the parcel.',
                      type: {
                        kind: 'SCALAR',
                        name: 'Map',
                        ofType: null,
                      },
                    },
                    {
                      deprecationReason: null,
                      isDeprecated: false,
                      name: 'area',
                      description: 'Area measurement of each ac unit occurrence within the parcel.',
                      type: {
                        kind: 'SCALAR',
                        name: 'Float',
                        ofType: null,
                      },
                    },
                    {
                      deprecationReason: null,
                      isDeprecated: false,
                      name: 'roofIou',
                      description:
                        'Calculation of (area of object overlapping roof)/(area of object). Used to determine if the object is on the roof. Value ≥50% indicates the ac unit is located on the roof.',
                      type: {
                        kind: 'SCALAR',
                        name: 'Float',
                        ofType: null,
                      },
                    },
                  ],
                },
                {
                  name: 'ACUnitOverview',
                  kind: 'OBJECT',
                  description: null,
                  enumValues: [],
                  ofType: null,
                  interfaces: [],
                  possibleTypes: [],
                  fields: [
                    {
                      deprecationReason: null,
                      isDeprecated: false,
                      name: 'totalCt',
                      description: 'Total count of ac units within the parcel.',
                      type: {
                        kind: 'NON_NULL',
                        name: null,
                        ofType: {
                          kind: 'SCALAR',
                          name: 'Int',
                          ofType: null,
                        },
                      },
                    },
                    {
                      deprecationReason: null,
                      isDeprecated: false,
                      name: 'onGroundCt',
                      description: 'Total count of ac units on ground within the parcel.',
                      type: {
                        kind: 'NON_NULL',
                        name: null,
                        ofType: {
                          kind: 'SCALAR',
                          name: 'Int',
                          ofType: null,
                        },
                      },
                    },
                    {
                      deprecationReason: null,
                      isDeprecated: false,
                      name: 'onRoofCt',
                      description: 'Total count of ac units on roof within the parcel.',
                      type: {
                        kind: 'NON_NULL',
                        name: null,
                        ofType: {
                          kind: 'SCALAR',
                          name: 'Int',
                          ofType: null,
                        },
                      },
                    },
                  ],
                },
              ],
            },
          },
        })
      );
    })
  );

  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render successfully', async () => {
    const { baseElement } = render(<DataDictionary />);

    expect(baseElement).toBeTruthy();
  });
});
