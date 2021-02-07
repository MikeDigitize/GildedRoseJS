import items from './inventory';
import update_quality from './gilded_rose';

describe('Gilded rose Legendary item test suite', function () {
  it(`'Sulfuras, Hand of Ragnaros' never changes quality or sell_by`, function () {
    const inventory = [...items];
    const sulfuras = inventory.find((item) => item.name === 'Sulfuras, Hand of Ragnaros');
    const sulfurasCopy = Object.assign({}, sulfuras);
    expect(sulfurasCopy.sell_in).toBe(0);
    expect(sulfurasCopy.quality).toBe(80);

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
});

describe(`Gilded rose regular item test suite -
  Regular items -
    decrease by 1 in quality if the sell_in is greater than or equal to 0,
    decrease by 2 in quality if the sell_in is less than 0`, function () {
  it(`decrease by 1 in quality if the sell_in is greater than or equal to 0`, function () {
    const inventory = [...items];
    const elixir = inventory.find((item) => item.name === 'Elixir of the Mongoose');
    const elixirCopy = Object.assign({}, elixir);
    expect(elixirCopy.sell_in).toBe(5);
    expect(elixirCopy.quality).toBe(7);

    update_quality([elixirCopy]);
    expect(elixirCopy.sell_in).toBe(4);
    expect(elixirCopy.quality).toBe(6);

    elixirCopy.sell_in = 1;

    update_quality([elixirCopy]);
    expect(elixirCopy.sell_in).toBe(0);
    expect(elixirCopy.quality).toBe(5);

    const vest = inventory.find((item) => item.name === '+5 Dexterity Vest');
    const vestCopy = Object.assign({}, vest);
    expect(vestCopy.sell_in).toBe(10);
    expect(vestCopy.quality).toBe(20);

    update_quality([vestCopy]);
    expect(vestCopy.sell_in).toBe(9);
    expect(vestCopy.quality).toBe(19);

    vestCopy.sell_in = 1;

    update_quality([vestCopy]);
    expect(vestCopy.sell_in).toBe(0);
    expect(vestCopy.quality).toBe(18);
  });

  it(`decrease by 2 in quality if the sell_in is less than 0`, function () {
    const inventory = [...items];
    const elixir = inventory.find((item) => item.name === 'Elixir of the Mongoose');
    const elixirCopy = Object.assign({}, elixir);
    expect(elixirCopy.sell_in).toBe(5);
    expect(elixirCopy.quality).toBe(7);

    elixirCopy.sell_in = 0;

    update_quality([elixirCopy]);
    expect(elixirCopy.sell_in).toBe(-1);
    expect(elixirCopy.quality).toBe(5);

    update_quality([elixirCopy]);
    expect(elixirCopy.sell_in).toBe(-2);
    expect(elixirCopy.quality).toBe(3);

    const vest = inventory.find((item) => item.name === '+5 Dexterity Vest');
    const vestCopy = Object.assign({}, vest);
    expect(vestCopy.sell_in).toBe(10);
    expect(vestCopy.quality).toBe(20);

    vestCopy.sell_in = 0;

    update_quality([vestCopy]);
    expect(vestCopy.sell_in).toBe(-1);
    expect(vestCopy.quality).toBe(18);

    update_quality([vestCopy]);
    expect(vestCopy.sell_in).toBe(-2);
    expect(vestCopy.quality).toBe(16);
  });
});

describe(`Guilded rose Aged Brie test suite -
  Brie -
    increases by 1 in quality if the sell_in is greater than or equal to 0
    increases by 2 in quality if the sell_in is less than 0
    does not increase in quality past 50`, function () {
  it('should increases by 1 in quality if the sell_in is greater than or equal to 0', function () {
    const inventory = [...items];
    const brie = inventory.find((item) => item.name === 'Aged Brie');
    const brieCopy = Object.assign({}, brie);
    expect(brieCopy.sell_in).toBe(2);
    expect(brieCopy.quality).toBe(0);

    update_quality([brieCopy]);
    expect(brieCopy.sell_in).toBe(1);
    expect(brieCopy.quality).toBe(1);

    update_quality([brieCopy]);
    expect(brieCopy.sell_in).toBe(0);
    expect(brieCopy.quality).toBe(2);
  });
  it('should increases by 2 in quality if the sell_in is less than 0', function () {
    const inventory = [...items];
    const brie = inventory.find((item) => item.name === 'Aged Brie');
    const brieCopy = Object.assign({}, brie);
    expect(brieCopy.sell_in).toBe(2);
    expect(brieCopy.quality).toBe(0);

    brieCopy.sell_in = 0;

    update_quality([brieCopy]);
    expect(brieCopy.sell_in).toBe(-1);
    expect(brieCopy.quality).toBe(2);

    update_quality([brieCopy]);
    expect(brieCopy.sell_in).toBe(-2);
    expect(brieCopy.quality).toBe(4);
  });

  it('should have a maximum quality of 50', function () {
    const inventory = [...items];
    const brie = inventory.find((item) => item.name === 'Aged Brie');
    const brieCopy = Object.assign({}, brie);

    expect(brieCopy.sell_in).toBe(2);
    expect(brieCopy.quality).toBe(0);

    brieCopy.quality = 49;

    update_quality([brieCopy]);
    expect(brieCopy.sell_in).toBe(1);
    expect(brieCopy.quality).toBe(50);

    update_quality([brieCopy]);
    expect(brieCopy.sell_in).toBe(0);
    expect(brieCopy.quality).toBe(50);

    update_quality([brieCopy]);
    expect(brieCopy.sell_in).toBe(-1);
    expect(brieCopy.quality).toBe(50);
  });
});

describe(`Guilded rose Backstage pass test suite -
  Backstage passes -
    increases by 1 in quality if the sell_in is greater than 10
    increases by 2 in quality if the sell_in is less than or equal to 10 and greater than 5
    increases by 3 in quality if the sell_in is less than or equal to 5 and greater or equal to 0
    has a quality of 0 if sell_in date less than 0
    does not increase in quality past 50`, function () {
  it('increases by 1 in quality if the sell_in is greater than 10', function () {
    const inventory = [...items];
    const pass = inventory.find(
      (item) => item.name === 'Backstage passes to a TAFKAL80ETC concert'
    );
    const passCopy = Object.assign({}, pass);
    expect(passCopy.sell_in).toBe(15);
    expect(passCopy.quality).toBe(20);

    update_quality([passCopy]);
    expect(passCopy.sell_in).toBe(14);
    expect(passCopy.quality).toBe(21);

    update_quality([passCopy]);
    expect(passCopy.sell_in).toBe(13);
    expect(passCopy.quality).toBe(22);
  });
  it('increases by 2 in quality if the sell_in is less than or equal to 10 and greater than 5', function () {
    const inventory = [...items];
    const pass = inventory.find(
      (item) => item.name === 'Backstage passes to a TAFKAL80ETC concert'
    );
    const passCopy = Object.assign({}, pass);
    expect(passCopy.sell_in).toBe(15);
    expect(passCopy.quality).toBe(20);

    passCopy.sell_in = 10;

    update_quality([passCopy]);
    expect(passCopy.sell_in).toBe(9);
    expect(passCopy.quality).toBe(22);

    update_quality([passCopy]);
    expect(passCopy.sell_in).toBe(8);
    expect(passCopy.quality).toBe(24);
  });
  it('increases by 3 in quality if the sell_in is less than or equal to 5 and greater or equal to 0', function () {
    const inventory = [...items];
    const pass = inventory.find(
      (item) => item.name === 'Backstage passes to a TAFKAL80ETC concert'
    );
    const passCopy = Object.assign({}, pass);
    expect(passCopy.sell_in).toBe(15);
    expect(passCopy.quality).toBe(20);

    passCopy.sell_in = 5;

    update_quality([passCopy]);
    expect(passCopy.sell_in).toBe(4);
    expect(passCopy.quality).toBe(23);

    update_quality([passCopy]);
    expect(passCopy.sell_in).toBe(3);
    expect(passCopy.quality).toBe(26);

    update_quality([passCopy]);
    expect(passCopy.sell_in).toBe(2);
    expect(passCopy.quality).toBe(29);

    update_quality([passCopy]);
    expect(passCopy.sell_in).toBe(1);
    expect(passCopy.quality).toBe(32);

    update_quality([passCopy]);
    expect(passCopy.sell_in).toBe(0);
    expect(passCopy.quality).toBe(35);
  });
  it('has a quality of 0 if sell_in date less than 0', function () {
    const inventory = [...items];
    const pass = inventory.find(
      (item) => item.name === 'Backstage passes to a TAFKAL80ETC concert'
    );
    const passCopy = Object.assign({}, pass);
    expect(passCopy.sell_in).toBe(15);
    expect(passCopy.quality).toBe(20);

    passCopy.sell_in = 0;

    update_quality([passCopy]);
    expect(passCopy.sell_in).toBe(-1);
    expect(passCopy.quality).toBe(0);

    update_quality([passCopy]);
    expect(passCopy.sell_in).toBe(-2);
    expect(passCopy.quality).toBe(0);
  });
  it('does not increase in quality past 50', function () {
    const inventory = [...items];
    const pass = inventory.find(
      (item) => item.name === 'Backstage passes to a TAFKAL80ETC concert'
    );
    const passCopy = Object.assign({}, pass);
    expect(passCopy.sell_in).toBe(15);
    expect(passCopy.quality).toBe(20);

    passCopy.quality = 49;

    update_quality([passCopy]);
    expect(passCopy.sell_in).toBe(14);
    expect(passCopy.quality).toBe(50);

    update_quality([passCopy]);
    expect(passCopy.sell_in).toBe(13);
    expect(passCopy.quality).toBe(50);

    update_quality([passCopy]);
    expect(passCopy.sell_in).toBe(12);
    expect(passCopy.quality).toBe(50);
  });
});

describe(`Guilded rose Conjured items test suite -
  Conjured items -
    decrease by 2 in quality if the sell_in is greater than 0
    decrease by 4 in quality if the sell_in is less than 0`, function () {
  it('decrease by 2 in quality if the sell_in is greater than 0', function () {
    const inventory = [...items];
    const conjured = inventory.find((item) => item.name === 'Conjured Mana Cake');
    const conjuredCopy = Object.assign({}, conjured);
    expect(conjuredCopy.sell_in).toBe(3);
    expect(conjuredCopy.quality).toBe(6);

    update_quality([conjuredCopy]);
    expect(conjuredCopy.sell_in).toBe(2);
    expect(conjuredCopy.quality).toBe(4);

    update_quality([conjuredCopy]);
    expect(conjuredCopy.sell_in).toBe(1);
    expect(conjuredCopy.quality).toBe(2);

    update_quality([conjuredCopy]);
    expect(conjuredCopy.sell_in).toBe(0);
    expect(conjuredCopy.quality).toBe(0);
  });

  it('decrease by 4 in quality if the sell_in is less than 0', function () {
    const inventory = [...items];
    const conjured = inventory.find((item) => item.name === 'Conjured Mana Cake');
    const conjuredCopy = Object.assign({}, conjured);
    expect(conjuredCopy.sell_in).toBe(3);
    expect(conjuredCopy.quality).toBe(6);

    conjuredCopy.sell_in = 0;
    conjuredCopy.quality = 10;

    update_quality([conjuredCopy]);
    expect(conjuredCopy.sell_in).toBe(-1);
    expect(conjuredCopy.quality).toBe(6);

    update_quality([conjuredCopy]);
    expect(conjuredCopy.sell_in).toBe(-2);
    expect(conjuredCopy.quality).toBe(2);

    update_quality([conjuredCopy]);
    expect(conjuredCopy.sell_in).toBe(-3);
    expect(conjuredCopy.quality).toBe(0);
  });
});
