// All Desert Grass types drop Plant Fiber with Flint Knife (15% chance)
// Shears drop the grass block itself
// Both tools take durability damage

// List of all desert grass blocks from Deserts and Dunes mod
const DESERT_GRASS_TYPES = [
    'deserts_and_dunes:desert_grass',
    'deserts_and_dunes:tall_desert_grass',
    'deserts_and_dunes:thin_desert_grass',
    'deserts_and_dunes:desert_fern',
    'deserts_and_dunes:brown_desert_grass',
    'deserts_and_dunes:tall_brown_desert_grass',
    'deserts_and_dunes:thin_brown_desert_grass',
    'deserts_and_dunes:brown_desert_fern',
    'deserts_and_dunes:light_desert_grass',
    'deserts_and_dunes:tall_light_desert_grass',
    'deserts_and_dunes:thin_light_desert_grass',
    'deserts_and_dunes:light_desert_fern',
    'deserts_and_dunes:green_desert_grass',
    'deserts_and_dunes:tall_green_desert_grass',
    'deserts_and_dunes:thin_green_desert_grass',
    'deserts_and_dunes:green_desert_fern'
];

BlockEvents.broken(event => {
    let block = event.getBlock();
    let player = event.getPlayer();
    let blockId = block.getId();
    
    // Check if the broken block is in our list
    if (DESERT_GRASS_TYPES.includes(blockId)) {
        
        let handItem = player.getMainHandItem();
        let handItemId = handItem.getId();
        
        // Get position for drops
        let x = block.getX() + 0.5;
        let y = block.getY() + 0.5;
        let z = block.getZ() + 0.5;
        let level = block.getLevel();
        
        // Function to damage tool
        let damageTool = (item) => {
            let currentDamage = item.getDamageValue();
            let maxDamage = item.getMaxDamage();
            
            if (currentDamage < maxDamage - 1) {
                item.setDamageValue(currentDamage + 1);
                return true; // Tool still exists
            } else {
                player.setMainHandItem(Item.of('air'));
                return false; // Tool broke
            }
        };
        
        // Remove the block first
        block.set('air');
        
        // Handle based on tool
        if (handItemId === 'tough_beginnings:flintknife') {
            // Damage the flint knife
            damageTool(handItem);
            
            // 15% chance to drop plant fiber on ground
            if (Math.random() < 0.15) {
                // Create item entity on ground
                let itemEntity = level.createEntity('item');
                itemEntity.setPosition(x, y, z);
                itemEntity.setItem('tough_beginnings:plantfiber');
                itemEntity.spawn();
            }
        }
        else if (handItemId === 'minecraft:shears') {
            // Damage the shears
            damageTool(handItem);
            
            // Drop the grass block itself on ground
            let itemEntity = level.createEntity('item');
            itemEntity.setPosition(x, y, z);
            itemEntity.setItem(blockId); // Drop the exact grass type that was broken
            itemEntity.spawn();
        }
        // Any other tool: drops nothing (block already removed)
    }
});