export default function update_quality(items = []) {
  for (var i = 0; i < items.length; i++) {
    if(items[i].name === 'Aged Brie') {
      return update_brie(items[i]);
    }
    if(items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
      return update_backstage_pass(items[i]);
    }
    if (items[i].quality > 0) {
      if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
        if(items[i].name === 'Conjured Mana Cake') {
          items[i].quality = items[i].quality - 2
        } else {
          items[i].quality = items[i].quality - 1
        }
      }
    }
    else if (items[i].quality < 50) {
      items[i].quality = items[i].quality + 1
    }
 
    if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < 0) {
      if (items[i].quality > 0) {
        if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
          items[i].quality = items[i].quality - 1;
        }
      }
    }
  }
}

export function update_brie(item) {
  const { quality } = item;
  item.sell_in--;
  if(quality < 50) {
    const increaseBy = item.sell_in >= 0 ? 1 : 2;
    item.quality += increaseBy;
  }
  return item;
}

export function update_backstage_pass(item) {
  const { sell_in } = item;
  if(sell_in > 10) {
    item.quality++;
  }
  else if(sell_in <= 10 && sell_in > 5) {
    item.quality += 2;
  }
  else if(sell_in <= 5 && sell_in > 0) {
    item.quality += 3;
  }
  else {
    item.quality = 0;
  }
  item.sell_in--;
  return item;
}
