import * as selectors from './selectors'

var testState = {
    collections: {
        data: {
            ['test-1']: {
                id: 1,
                name: 'test-1',
                items: [
                    {
                        id: 1,
                        name: 'test item 1',
                        imageUrl: 'test image 1',
                        price: 10,
                    },
                    {
                        id: 2,
                        name: 'test item 2',
                        imageUrl: 'test image 2',
                        price: 10,
                    },
                    {
                        id: 3,
                        name: 'test item 3',
                        imageUrl: 'test image 3',
                        price: 10,
                    },
                    {
                        id: 4,
                        name: 'test item 4',
                        imageUrl: 'test image 4',
                        price: 10,
                    },
                    {
                        id: 5,
                        name: 'test item 5',
                        imageUrl: 'test image 5',
                        price: 10,
                    }
                ]
            },
            ['test-2']: {
                id: 2,
                name: 'test-2',
                items: [
                    {
                        id: 2,
                        name: 'test item 2',
                        imageUrl: 'test image 2',
                        price: 20
                    }
                ]
            }
        },
    }
}

it('selectCollectionRoutes selector should properly return collection names', () => {
    expect(selectors.selectCollectionRoutes(testState)).toEqual(['test-1', 'test-2'])
})

it('selectCollectionItemsPreview selector should properly return first 4 items in each collection', () => {
    var result = selectors.selectCollectionItemsPreview(testState)
    expect(result[0]).toEqual({
        ...testState.collections.data['test-1'],
        items: testState.collections.data['test-1'].items.slice(0, 4)
    })
    expect(result[1]).toEqual({
        ...testState.collections.data['test-2'],
        items: testState.collections.data['test-2'].items.slice(0, 4)
    })
})

it('selectItemsByCollectionName selector should properly return items of particular collection', () => {
    var result = selectors.selectItemsByCollectionName(testState, 'test-1')

    expect(result).toEqual(testState.collections.data['test-1'].items)
})