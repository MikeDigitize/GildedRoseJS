# The Gilded Rose JavaScript

## A Refactoring Kata
Adding a new feature to a giant unwieldy function with no tests in JavaScript. Yikes!

### Approach
Four branches -
  - Spike: Digging into how the feature works, making notes, then retrofitting tests to give confidence when making changes
  - Spike2: Adding the new feature to existing code, with tests
  - Refactor: Taking a feature of the requirement of the huge function, abstracting the logic out, then refactoring that aspect of the big function and tests pass (repeat)
  - Tidy: Finalise test suite so every feature is tested across every requirement (tidy branch then merged back into master upon completion)

### Spec
Hi and welcome to team Gilded Rose.

As you know, we are a small inn with a prime location in a prominent city ran
by a friendly innkeeper named Allison.  We also buy and sell only the finest
goods. Unfortunately, our goods are constantly degrading in quality as they
approach their sell by date.

We have a system in place that updates our inventory for us. It was developed
by a no-nonsense type named Leeroy, who has moved on to new adventures. Your
task is to add the new feature to our system so that we can begin selling a
new category of items.

First an introduction to our system:

  - All items have a *sell_in* value which denotes the number of days we have to
    sell the item

  - All items have a *quality* value which denotes how valuable the item is

  - At the end of each day our system lowers both values for every item

Pretty simple, right? Well this is where it gets interesting:

  - Once the *sell_in* days is less then zero, *quality* degrades twice as fast

  - The *quality* of an item is never negative

  - "Aged Brie" actually increases in *quality* the older it gets

  - The *quality* of an item is never more than 50

  - "Sulfuras", being a legendary item, never has to be sold nor does it
    decrease in *quality*

  - "Backstage passes", like aged brie, increases in *quality* as it's *sell_in*
    value decreases; *quality* increases by 2 when there are 10 days or less
    and by 3 when there are 5 days or less but *quality* drops to 0 after the
    concert

We have recently signed a supplier of conjured items. This requires an update
to our system:

  - "Conjured" items degrade in *quality* twice as fast as normal items

Feel free to make any changes to the *update_quality* method and add any new
code as long as everything still works correctly. However, do not alter the
*Item* class or *items* property as those belong to the goblin in the corner
who will insta-rage and one-shot you as he doesn't believe in shared code
ownership.

Just for clarification, an item can never have its *quality* increase above 50,
however "Sulfuras" is a legendary item and as such its *quality* is 80 and it
never alters.

Sources:
  <http://iamnotmyself.com/2011/02/13/refactor-this-the-gilded-rose-kata/>
  <https://github.com/professor/GildedRose>

### Starting Files
If you want to try it the starting files are in the root of the directory. Fork the repo and delete the `Gilded Rose` in the `src` to start over.  

#### TL;DR (Spoilers)
There's lots of ways to tackle this. Mine went from...

```javascript
export default function update_quality() {
  for (var i = 0; i < items.length; i++) {
    if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (items[i].quality > 0) {
        if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
          items[i].quality = items[i].quality - 1
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1
        if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
        }
      }
    }
    if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < 0) {
      if (items[i].name != 'Aged Brie') {
        if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].quality > 0) {
            if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
              items[i].quality = items[i].quality - 1
            }
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
        }
      }
    }
  }
}
```
to...

```javascript
export default function update_quality(items = []) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].name === 'Sulfuras, Hand of Ragnaros') {
      return update_sulfuras(items[i]);
    }

    items[i].sell_in--;

    if (items[i].name === 'Aged Brie') {
      return update_brie(items[i]);
    }
    if (items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
      return update_backstage_pass(items[i]);
    }

    if (items[i].name === 'Conjured Mana Cake') {
      return update_conjured(items[i]);
    }
    return update_regular_item(items[i]);
  }
}
```