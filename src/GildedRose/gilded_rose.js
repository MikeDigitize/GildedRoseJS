export default function update_quality(items = []) {
  for (var i = 0; i < items.length; i++) {
    if(items[i].name === 'Aged Brie') {
      return update_brie(items[i]);
    }
    if(items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
      return update_backstage_pass(items[i]);
    }
    if (items[i].name === 'Sulfuras, Hand of Ragnaros') {
      return update_sulfuras(items[i]);
    }
    if(items[i].name === 'Conjured Mana Cake') {
      return update_conjured(items[i]);
    }
    return update_regular_item(items[i]);
  }
}

export function update_brie(item) {
  const { quality } = item;
  item.sell_in--;
  if(quality < 50) {
    const increaseBy = item.sell_in >= 0 ? 1 : 2;
    item.quality += increaseBy;
  }
  if(item.quality > 50) {
    item.quality = 50;
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
  if(item.quality > 50) {
    item.quality = 50;
  }
  item.sell_in--;
  return item;
}

export function update_sulfuras(item) {
  return item;
}

export function update_conjured(item) {
  item.sell_in--;
  item.quality -= 2;
  if(item.quality < 0) {
    item.quality = 0;
  }
  return item;
}

export function update_regular_item(item) {
  item.sell_in--;
  const reduceBy = item.sell_in >= 0 ? 1 : 2;
  item.quality -= reduceBy;
  return item;
}