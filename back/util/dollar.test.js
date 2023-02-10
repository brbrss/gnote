const Dollar = require('./dollar');


test('count', () => {
    const d = new Dollar();
    expect(d.call()).toBe('$1');
    expect(d.call()).toBe('$2');
    for (let i = 0; i < 10; i++) {
        d.call();
    }
    expect(d.call()).toBe('$13');

});
