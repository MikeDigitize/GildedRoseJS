## Spike notes

### Inventory rules
- Sell_in
    - Degrades by one every day
- Quality
    - Degrades by one every day
    - Quality can never be less than 0
    - Quality can never be more than 50

- Relationship
    - When sell_in is less than 0 quality degrades twice as fast

### Per item rules
- Aged brie increases in quality
- Sulfuras - legendary item - never descreases in quality or needs to be sold
- Sulfuras has a quality of 80
- Backstage passes increases in quality as it's sell_in value decreases; quality increases by 2 when there are 10 days or less
and by 3 when there are 5 days or less but quality drops to 0 after sell_in is less than 0

### Development constraints
- Cannot change Item class - three properties; name, sell_in, quality
- Cannot change Items property - array

## Program flow

- if NOT `brie` or `backstage pass`
    - if `quality > 0`
    - ignore `sulfuras`
    - increase `quality`
    - specific `conjured` logic

- if `brie` or `backstage pass`
    - if `quality < 50`
    - increase `quality`
    - specific `backstage pass` logic