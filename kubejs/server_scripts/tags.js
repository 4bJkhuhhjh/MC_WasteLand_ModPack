// Located in: kubejs/server_scripts/tags.js

ServerEvents.tags('block', event => {
  const diamondBlocks = [
    'minecraft:diamond_ore',
    'minecraft:deepslate_diamond_ore',
    'minecraft:diamond_block'
  ]

  // Remove from iron tier and add to diamond tier
  event.remove('minecraft:needs_iron_tool', diamondBlocks)
  event.add('minecraft:needs_diamond_tool', diamondBlocks)
})