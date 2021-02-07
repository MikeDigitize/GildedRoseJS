import items from './inventory';
import update_quality from './gilded_rose';

describe('Gilded Rose', function () {

  it("should update a standard item - '+5 Dexterity Vest' - as expected (decrease quality and sell_by by 1)", function () {
    const inventory = [...items];
    const vest = inventory.find((item) => item.name === '+5 Dexterity Vest');
    const { name, sell_in, quality } = vest;
    [name, sell_in, quality].forEach((item) => expect(item).toBeDefined());
    expect(sell_in).toBe(10);
    expect(quality).toBe(20);

    update_quality([vest]);
    expect(vest.sell_in).toBe(9);
    expect(vest.quality).toBe(19);

    // degrades twice as fast
    vest.sell_in = 0;
    update_quality([vest]);
    expect(vest.sell_in).toBe(-1);
    expect(vest.quality).toBe(17);
  });

  it("should update brie - 'Aged Brie' - as expected (increase in quality by 1, sell_in decrease by 1)", function () {
    const inventory = [...items];
    const brie = inventory.find((item) => item.name === 'Aged Brie');
    const { name, sell_in, quality } = brie;
    [name, sell_in, quality].forEach((item) => expect(item).toBeDefined());
    expect(sell_in).toBe(2);
    expect(quality).toBe(0);

    update_quality([brie]);
    expect(brie.sell_in).toBe(1);
    expect(brie.quality).toBe(1);

    update_quality([brie]);
    expect(brie.sell_in).toBe(0);
    expect(brie.quality).toBe(2);

    // sell_in < 0 quality increases twice as fast
    update_quality([brie]);
    expect(brie.sell_in).toBe(-1);
    expect(brie.quality).toBe(4);

    update_quality([brie]);
    expect(brie.sell_in).toBe(-2);
    expect(brie.quality).toBe(6);
  });

  it("should update a standard item - 'Elixir of the Mongoose' - as expected (decrease quality and sell_by by 1)", function () {
    const inventory = [...items];
    const elixir = inventory.find((item) => item.name === 'Elixir of the Mongoose');
    const { name, sell_in, quality } = elixir;
    [name, sell_in, quality].forEach((item) => expect(item).toBeDefined());
    expect(sell_in).toBe(5);
    expect(quality).toBe(7);

    update_quality([elixir]);
    expect(elixir.sell_in).toBe(4);
    expect(elixir.quality).toBe(6);

    elixir.sell_in = 0;
    update_quality([elixir]);
    expect(elixir.sell_in).toBe(-1);
    expect(elixir.quality).toBe(4);
  });

  it("should update a legendary item - 'Sulfuras, Hand of Ragnaros' - as expected (no decrease quality or sell_by)", function () {
    const inventory = [...items];
    const sulfuras = inventory.find((item) => item.name === 'Sulfuras, Hand of Ragnaros');
    const { name, sell_in, quality } = sulfuras;
    [name, sell_in, quality].forEach((item) => expect(item).toBeDefined());
    expect(sell_in).toBe(0);
    expect(quality).toBe(80);

    // never changes
    update_quality([sulfuras]);
    expect(sulfuras.sell_in).toBe(0);
    expect(sulfuras.quality).toBe(80);

    update_quality([sulfuras]);
    expect(sulfuras.sell_in).toBe(0);
    expect(sulfuras.quality).toBe(80);

    update_quality([sulfuras]);
    expect(sulfuras.sell_in).toBe(0);
    expect(sulfuras.quality).toBe(80);
  });
  it("should update a legendary item - 'Backstage passes to a TAFKAL80ETC concert' - as expected (more complex rules, see readme)", function () {
    const inventory = [...items];
    const pass = inventory.find((item) => item.name === 'Backstage passes to a TAFKAL80ETC concert');
    const { name, sell_in, quality } = pass;
    [name, sell_in, quality].forEach((item) => expect(item).toBeDefined());
    expect(sell_in).toBe(15);
    expect(quality).toBe(20);

    // sell_in > 10
    update_quality([pass]);
    expect(pass.sell_in).toBe(14);
    expect(pass.quality).toBe(21);

    // sell in <= 10
    pass.sell_in = 10;
    update_quality([pass]);
    expect(pass.sell_in).toBe(9);
    expect(pass.quality).toBe(23);

    // sell in <= 5
    pass.sell_in = 5;
    update_quality([pass]);
    expect(pass.sell_in).toBe(4);
    expect(pass.quality).toBe(26);

    // sell in <= 0
    pass.sell_in = 0;
    update_quality([pass]);
    expect(pass.sell_in).toBe(-1);
    expect(pass.quality).toBe(0);

  });
});
