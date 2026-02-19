// Located in: kubejs/server_scripts/loot_tables.js

LootJS.modifiers(event => {
  
  // 1. Standard Diamond Ore -> Diamond Shards
  // Only drops if harvested with a Diamond-tier tool (handled by tags)
  event.addBlockLootModifier('minecraft:diamond_ore')
    .removeLoot('minecraft:diamond') // Remove default diamond
    .not(n => n.hasEnchantment('minecraft:silk_touch'))
    .addWeightedLoot([2, 2], 'hardmodeores:diamondshard')
    .applyFortuneBonus();

  // 2. Rich Diamond Ore Logic
  event.addBlockLootModifier('hardmodeores:richdiamondore')
    .matchMainHand('#minecraft:needs_diamond_tool')
    .replaceLoot('hardmodeores:richdiamondore', 'minecraft:diamond_ore', true) // Replaces if NOT silk touch
    .modifyLoot('minecraft:diamond_ore', (stack) => {
       // Logic for fortune on the rich ore drop
       return stack;
    });

  // 3. Rich Deepslate Diamond Ore Logic
  event.addBlockLootModifier('hardmodeores:richdeepslatediamondore')
    .matchMainHand('#minecraft:needs_diamond_tool')
    .alt(
      // Silk Touch case
      item => item.hasEnchantment('minecraft:silk_touch').addLoot('hardmodeores:richdeepslatediamondore'),
      // Default case
      item => item.addLoot('minecraft:diamond').applyFortuneBonus()
    );
}); 