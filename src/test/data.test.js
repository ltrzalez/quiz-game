import data from '../data.json'

test('check cantidad de preguntas', () => {        
    expect(data.length).toEqual(2);
})


/* convert to string to match the question*/
test('Preguntas existentes', () => {        
    expect(JSON.stringify(data)).toMatch(/como se llama el ateo/);
    expect(JSON.stringify(data)).toMatch(/cual no es un aka del ateo/);
    // expect(shoppingList).toContain('milk');
})