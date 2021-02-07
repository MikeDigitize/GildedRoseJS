import items from './inventory';
import update_quality, { update_brie, update_backstage_pass, update_conjured, update_regular_item } from './gilded_rose';

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
    const brieCopy = Object.assign({}, brie);
    const { name, sell_in, quality } = brieCopy;
    [name, sell_in, quality].forEach((item) => expect(item).toBeDefined());
    expect(sell_in).toBe(2);
    expect(quality).toBe(0);

    update_quality([brieCopy]);
    expect(brieCopy.sell_in).toBe(1);
    expect(brieCopy.quality).toBe(1);

    update_quality([brieCopy]);
    expect(brieCopy.sell_in).toBe(0);
    expect(brieCopy.quality).toBe(2);

    // sell_in < 0 quality increases twice as fast
    update_quality([brieCopy]);
    expect(brieCopy.sell_in).toBe(-1);
    expect(brieCopy.quality).toBe(4);

    update_quality([brieCopy]);
    expect(brieCopy.sell_in).toBe(-2);
    expect(brieCopy.quality).toBe(6);
  });

  it("should update a standard item - 'Elixir of the Mongoose' - as expected (decrease quality and sell_by by 1)", function () {
    const inventory = [...items];
    const elixir = inventory.find((item) => item.name === 'Elixir of the Mongoose');
    const elixirCopy = Object.assign({}, elixir);
    const { name, sell_in, quality } = elixirCopy;
    [name, sell_in, quality].forEach((item) => expect(item).toBeDefined());
    expect(sell_in).toBe(5);
    expect(quality).toBe(7);

    update_quality([elixirCopy]);
    expect(elixirCopy.sell_in).toBe(4);
    expect(elixirCopy.quality).toBe(6);

    elixirCopy.sell_in = 0;
    update_quality([elixirCopy]);
    expect(elixirCopy.sell_in).toBe(-1);
    expect(elixirCopy.quality).toBe(4);
  });

  it("should update a legendary item - 'Sulfuras, Hand of Ragnaros' - as expected (no decrease quality or sell_by)", function () {
    const inventory = [...items];
    const sulfuras = inventory.find((item) => item.name === 'Sulfuras, Hand of Ragnaros');
    const sulfurasCopy = Object.assign({}, sulfuras);
    const { name, sell_in, quality } = sulfurasCopy;
    [name, sell_in, quality].forEach((item) => expect(item).toBeDefined());
    expect(sell_in).toBe(0);
    expect(quality).toBe(80);

    // never changes
    update_quality([sulfurasCopy]);
    expect(sulfurasCopy.sell_in).toBe(0);
    expect(sulfurasCopy.quality).toBe(80);

    update_quality([sulfurasCopy]);
    expect(sulfurasCopy.sell_in).toBe(0);
    expect(sulfurasCopy.quality).toBe(80);

    update_quality([sulfurasCopy]);
    expect(sulfurasCopy.sell_in).toBe(0);
    expect(sulfurasCopy.quality).toBe(80);
  });
  it("should update a legendary item - 'Backstage passes to a TAFKAL80ETC concert' - as expected (more complex rules, see readme)", function () {
    const inventory = [...items];
    const pass = inventory.find(
      (item) => item.name === 'Backstage passes to a TAFKAL80ETC concert'
    );
    const passCopy = Object.assign({}, pass);
    const { name, sell_in, quality } = passCopy;
    [name, sell_in, quality].forEach((item) => expect(item).toBeDefined());
    expect(sell_in).toBe(15);
    expect(quality).toBe(20);

    // sell_in > 10
    update_quality([passCopy]);
    expect(passCopy.sell_in).toBe(14);
    expect(passCopy.quality).toBe(21);

    // sell in <= 10
    passCopy.sell_in = 10;
    update_quality([passCopy]);
    expect(passCopy.sell_in).toBe(9);
    expect(passCopy.quality).toBe(23);

    // sell in <= 5
    passCopy.sell_in = 5;
    update_quality([passCopy]);
    expect(passCopy.sell_in).toBe(4);
    expect(passCopy.quality).toBe(26);

    // sell in <= 0
    passCopy.sell_in = 0;
    update_quality([passCopy]);
    expect(passCopy.sell_in).toBe(-1);
    expect(passCopy.quality).toBe(0);
  });
  it('should update a conjured item - Conjured Mana Cake - as expected (degrades in quality twice as fast as other items)', function() {
    const inventory = [...items];
    const conjured = inventory.find(
      (item) => item.name === 'Conjured Mana Cake'
    );
    const conjuredCopy = Object.assign({}, conjured);
    const { name, sell_in, quality } = conjuredCopy;
    [name, sell_in, quality].forEach((item) => expect(item).toBeDefined());
    expect(sell_in).toBe(3);
    expect(quality).toBe(6);

    update_quality([conjuredCopy]);
    expect(conjuredCopy.sell_in).toBe(2);
    expect(conjuredCopy.quality).toBe(4);

    update_quality([conjuredCopy]);
    expect(conjuredCopy.sell_in).toBe(1);
    expect(conjuredCopy.quality).toBe(2);

    update_quality([conjuredCopy]);
    expect(conjuredCopy.sell_in).toBe(0);
    expect(conjuredCopy.quality).toBe(0);

    update_quality([conjuredCopy]);
    expect(conjuredCopy.sell_in).toBe(-1);
    expect(conjuredCopy.quality).toBe(0);
  });
});

describe('Guilded rose refactor', function() {
  it("should update brie - 'Aged Brie' - as expected (increase in quality by 1, sell_in decrease by 1)", function () {
    const inventory = [...items];
    const brie = inventory.find((item) => item.name === 'Aged Brie');
    const brieCopy = Object.assign({}, brie);
    const { name, sell_in, quality } = brieCopy;
    [name, sell_in, quality].forEach((item) => expect(item).toBeDefined());
    expect(sell_in).toBe(2);
    expect(quality).toBe(0);

    update_brie(brieCopy);
    expect(brieCopy.sell_in).toBe(1);
    expect(brieCopy.quality).toBe(1);

    update_brie(brieCopy);
    expect(brieCopy.sell_in).toBe(0);
    expect(brieCopy.quality).toBe(2);

    // sell_in < 0 quality increases twice as fast
    update_brie(brieCopy);
    expect(brieCopy.sell_in).toBe(-1);
    expect(brieCopy.quality).toBe(4);

    update_brie(brieCopy);
    expect(brieCopy.sell_in).toBe(-2);
    expect(brieCopy.quality).toBe(6);

  });

  it("should update a legendary item - 'Backstage passes to a TAFKAL80ETC concert' - as expected (more complex rules, see readme)", function () {
    const inventory = [...items];
    const pass = inventory.find(
      (item) => item.name === 'Backstage passes to a TAFKAL80ETC concert'
    );
    const passCopy = Object.assign({}, pass);
    const { name, sell_in, quality } = passCopy;
    [name, sell_in, quality].forEach((item) => expect(item).toBeDefined());
    expect(sell_in).toBe(15);
    expect(quality).toBe(20);

    // sell_in > 10
    update_backstage_pass(passCopy);
    expect(passCopy.sell_in).toBe(14);
    expect(passCopy.quality).toBe(21);

    // sell in <= 10
    passCopy.sell_in = 10;
    update_backstage_pass(passCopy);
    expect(passCopy.sell_in).toBe(9);
    expect(passCopy.quality).toBe(23);

    // sell in <= 5
    passCopy.sell_in = 5;
    update_backstage_pass(passCopy);
    expect(passCopy.sell_in).toBe(4);
    expect(passCopy.quality).toBe(26);

    // sell in <= 0
    passCopy.sell_in = 0;
    update_backstage_pass(passCopy);
    expect(passCopy.sell_in).toBe(-1);
    expect(passCopy.quality).toBe(0);
  });
  it("should update a legendary item - 'Sulfuras, Hand of Ragnaros' - as expected (no decrease quality or sell_by)", function () {
    const inventory = [...items];
    const sulfuras = inventory.find((item) => item.name === 'Sulfuras, Hand of Ragnaros');
    const sulfurasCopy = Object.assign({}, sulfuras);
    const { name, sell_in, quality } = sulfurasCopy;
    [name, sell_in, quality].forEach((item) => expect(item).toBeDefined());
    expect(sell_in).toBe(0);
    expect(quality).toBe(80);

    // never changes
    update_quality(sulfurasCopy);
    expect(sulfurasCopy.sell_in).toBe(0);
    expect(sulfurasCopy.quality).toBe(80);

    update_quality(sulfurasCopy);
    expect(sulfurasCopy.sell_in).toBe(0);
    expect(sulfurasCopy.quality).toBe(80);

    update_quality(sulfurasCopy);
    expect(sulfurasCopy.sell_in).toBe(0);
    expect(sulfurasCopy.quality).toBe(80);
  });
  it('should update a conjured item - Conjured Mana Cake - as expected (degrades in quality twice as fast as other items)', function() {
    const inventory = [...items];
    const conjured = inventory.find(
      (item) => item.name === 'Conjured Mana Cake'
    );
    const conjuredCopy = Object.assign({}, conjured);
    const { name, sell_in, quality } = conjuredCopy;
    [name, sell_in, quality].forEach((item) => expect(item).toBeDefined());
    expect(sell_in).toBe(3);
    expect(quality).toBe(6);

    update_conjured(conjuredCopy);
    expect(conjuredCopy.sell_in).toBe(2);
    expect(conjuredCopy.quality).toBe(4);

    update_conjured(conjuredCopy);
    expect(conjuredCopy.sell_in).toBe(1);
    expect(conjuredCopy.quality).toBe(2);

    update_conjured(conjuredCopy);
    expect(conjuredCopy.sell_in).toBe(0);
    expect(conjuredCopy.quality).toBe(0);

    update_conjured(conjuredCopy);
    expect(conjuredCopy.sell_in).toBe(-1);
    expect(conjuredCopy.quality).toBe(0);
  });

  it("should update a standard item - 'Elixir of the Mongoose' - as expected (decrease quality and sell_by by 1)", function () {
    const inventory = [...items];
    const elixir = inventory.find((item) => item.name === 'Elixir of the Mongoose');
    const elixirCopy = Object.assign({}, elixir);
    const { name, sell_in, quality } = elixirCopy;
    [name, sell_in, quality].forEach((item) => expect(item).toBeDefined());
    expect(sell_in).toBe(5);
    expect(quality).toBe(7);

    update_regular_item(elixirCopy);
    expect(elixirCopy.sell_in).toBe(4);
    expect(elixirCopy.quality).toBe(6);

    elixirCopy.sell_in = 0;
    update_regular_item(elixirCopy);
    expect(elixirCopy.sell_in).toBe(-1);
    expect(elixirCopy.quality).toBe(4);
  });
});

describe('Gilded rose refactored code test suite', function() {
  it(`'Sulfuras, Hand of Ragnaros' never changes quality or sell_by`, function () {
    const inventory = [...items];
    const sulfuras = inventory.find((item) => item.name === 'Sulfuras, Hand of Ragnaros');
    const sulfurasCopy = Object.assign({}, sulfuras);
    const { name, sell_in, quality } = sulfurasCopy;
    [name, sell_in, quality].forEach((item) => expect(item).toBeDefined());
    expect(sell_in).toBe(0);
    expect(quality).toBe(80);

    // never changes
    update_quality([sulfurasCopy]);
    expect(sulfurasCopy.sell_in).toBe(0);
    expect(sulfurasCopy.quality).toBe(80);

    update_quality([sulfurasCopy]);
    expect(sulfurasCopy.sell_in).toBe(0);
    expect(sulfurasCopy.quality).toBe(80);

    update_quality([sulfurasCopy]);
    expect(sulfurasCopy.sell_in).toBe(0);
    expect(sulfurasCopy.quality).toBe(80);
  });
})