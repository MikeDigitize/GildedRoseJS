import items from './inventory';
import update_quality from './gilded_rose';

describe('Gilded Rose', function () {
  it("should update a standard item - '+5 Dexterity Vest' - as expected", function () {
    const inventory = [...items];
    const vest = inventory.find((item) => item.name === '+5 Dexterity Vest');
    const { name, sell_in, quality } = vest;
    [name, sell_in, quality].forEach((item) => expect(item).toBeDefined());
    expect(sell_in).toBe(10);
    expect(quality).toBe(20);

    update_quality([vest]);
    expect(vest.sell_in).toBe(9);
    expect(vest.quality).toBe(19);
  });
});
