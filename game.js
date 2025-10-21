// global use function rolling 1-100
const chance = () => Math.floor(Math.random()*100+1)

// global use function for dmg calculation
const damage = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

// player object
// crit deals 2x dmg
const playerInfo = {
    baseStats: {
            health: 100,
            attackMin: 3,
            attackMax: 5,
            evade: 0,
            critChance: 0
        },
    actualStats: {
            health: 100,
            healthMax: 100,
            attackMin: 3,
            attackMax: 5,
            evade: 0,
            critChance: 0
        },
    armorSet: {
        armor: {
            health: 0
        },
        sword: {
            attackMin: 0,
            attackMax: 0
        },
        boots: {
            evade: 0,
            critChance: 0,
            health: 0,
            attack: 0
        },
    }
};
let playerGold = 0;

//update player gold 

const gold = () => {
    document.getElementById('player-gold').textContent = playerGold;
}

// shop items info
const shopItems = {
    armor: {
        price: 150,
        hpBonus: 15,
    },
    sword: {
        price: 200,
        attackMinBonus: 1,
        attackMaxBonus: 1
    },
    boots: {
        price: 3000,
        evade: 10,
        critChance: 7,
        health: 1000,
        attack: 25
    }
}

//
//
//
//
// disable/enable buttons

const buyButtonsSwitchOn = () => {
    if (playerGold >= shopItems.armor.price) {
    document.getElementById('upgrade-armor-btn').disabled = false;
    document.getElementById('buy-armor-btn').disabled = false;
    };

    if (playerGold >= shopItems.sword.price) {
    document.getElementById('upgrade-sword-btn').disabled = false;
    document.getElementById('buy-sword-btn').disabled = false;
    };

    if (playerGold >= shopItems.boots.price) {
    document.getElementById('buy-atk-boots-btn').disabled = false;
    document.getElementById('buy-evade-boots-btn').disabled = false;
    document.getElementById('buy-crit-boots-btn').disabled = false;
    document.getElementById('buy-health-boots-btn').disabled = false;
    };
}

const buyButtonsSwitchOff = () => {
    if (playerGold < shopItems.armor.price) {
    document.getElementById('upgrade-armor-btn').disabled = true;
    document.getElementById('buy-armor-btn').disabled = true;
    };

    if (playerGold < shopItems.sword.price) {
    document.getElementById('upgrade-sword-btn').disabled = true;
    document.getElementById('buy-sword-btn').disabled = true;
    };

    if (playerGold < shopItems.boots.price) {
    document.getElementById('buy-atk-boots-btn').disabled = true;
    document.getElementById('buy-evade-boots-btn').disabled = true;
    document.getElementById('buy-crit-boots-btn').disabled = true;
    document.getElementById('buy-health-boots-btn').disabled = true;
    };
}

buyButtonsSwitchOff();


// update actual health in player object and in the DOM for reset/new armor set
const updatePlayerHealth = () => {
    //obj update
    playerInfo.actualStats.healthMax = playerInfo.baseStats.health + playerInfo.armorSet.armor.health + playerInfo.armorSet.boots.health;

    playerInfo.actualStats.health = playerInfo.actualStats.healthMax;
    //DOM update
    document.getElementById('player-health').textContent = playerInfo.actualStats.healthMax;

    // health bar update in DOM

    document.getElementById('player-health-fill').style.width = '100%';
}

// update actual attack in player object and in the DOM
const updatePlayerAttack = () => {
    //obj update
    //atk min
    playerInfo.actualStats.attackMin = playerInfo.baseStats.attackMin + playerInfo.armorSet.sword.attackMin + playerInfo.armorSet.boots.attack;
    //atk max
    playerInfo.actualStats.attackMax = playerInfo.baseStats.attackMax + playerInfo.armorSet.sword.attackMax + playerInfo.armorSet.boots.attack;
    //DOM update
    document.getElementById('player-attack').textContent = playerInfo.actualStats.attackMin + '-' + playerInfo.actualStats.attackMax;
}

// update actual crit chance in player object and in the DOM
const updatePlayerCritChance = () => {
    //obj update
    playerInfo.actualStats.critChance = playerInfo.baseStats.critChance + playerInfo.armorSet.boots.critChance;
    //DOM update
    document.getElementById('player-crit-chance').textContent = playerInfo.actualStats.critChance;
}

// update actual evade in player object and in the DOM
const updatePlayerEvade = () => {
    //obj update
    playerInfo.actualStats.evade = playerInfo.baseStats.evade + playerInfo.armorSet.boots.evade;
    //DOM update
    document.getElementById('player-evade').textContent = playerInfo.actualStats.evade;
}

// calculate player dmg
const playerDamage = () => {
    const roll = chance();
    const baseDmg = damage(playerInfo.actualStats.attackMin, playerInfo.actualStats.attackMax)
    // normal dmg case
    if (
        (playerInfo.actualStats.critChance === 0)
        || roll > playerInfo.actualStats.critChance
    ) {
    return baseDmg;
    }
    // crit dmg case
    return baseDmg*2;
}

// enemies array
const ogres = [
    ogreLvl1 = {
        startHealth: 150,
        health: 150,
        attackMin: 2,
        attackMax: 4,
        evade: 0,
        onHitDropChance: 5,
        reward: 30,
        pic: "pics/ogre1.png"       
    },
    ogreLvl2 = {
        startHealth: 200,
        health: 200,
        attackMin: 4,
        attackMax: 8,
        evade: 1,
        onHitDropChance: 8,
        reward: 70,
        pic: "pics/ogre2.png"         
    },
    ogreLvl3 = {
        startHealth: 350,
        health: 350,
        attackMin: 7,
        attackMax: 11,
        evade: 2,
        onHitDropChance: 12,
        reward: 150,
        pic: "pics/ogre3.png"         
    },
    ogreLvl4 = {
        startHealth: 750,
        health: 750,
        attackMin: 10,
        attackMax: 15,
        evade: 3,
        onHitDropChance: 20,
        reward: 300,
        pic: "pics/ogre4.png"         
    },
    ogreLvl5 = {
        startHealth: 1500,
        health: 1500,
        attackMin: 20,
        attackMax: 35,
        evade: 50,
        onHitDropChance: 100,
        reward: 700,
        pic: "pics/ogre5.png"         
    }
]

//calculate enemy dmg, actual level parameter
const enemyDamage = () => {
    return damage(currentTarget.attackMin, currentTarget.attackMax);
}

//enemy state
let currentTarget = false;
//set enemy
const setEnemy = (lvl) => {
    currentTarget = ogres[lvl-1];
    // document.getElementById('enemy-health').textContent = currentTarget.health;
    // document.getElementById('enemy-attack').textContent = currentTarget.attackMin + '-' + currentTarget.attackMax;
    // document.getElementById('enemy-evade').textContent = currentTarget.evade;
    document.getElementById('ogre-health-fill').style.width = '100%';
    document.getElementById('chosen-enemy-box').style.display = 'block';
    document.getElementById('enemy-choice').style.display = 'none';
    // document.getElementById('atk-btn').style.display = 'block';

    document.getElementById('bf-title').style.display = 'none';

    document.getElementById('ogre-pic').src = currentTarget.pic;

    const btns = document.querySelectorAll('.buy-btn');
    btns.forEach(btn => {
        btn.disabled = true;
    });

    document.getElementById('ogre-pic').addEventListener('click', executeAttack);
    document.getElementById('flash').style.display = 'none';
    document.getElementById('ogre-pic').style.cursor = 'url(sword.cur), pointer';
}

//choose enemy buttons
document.getElementById('lvl-one-btn').addEventListener('click', () => setEnemy(1));
document.getElementById('lvl-two-btn').addEventListener('click', () => setEnemy(2));
document.getElementById('lvl-three-btn').addEventListener('click', () => setEnemy(3));
document.getElementById('lvl-four-btn').addEventListener('click', () => setEnemy(4));
document.getElementById('lvl-five-btn').addEventListener('click', () => setEnemy(5));

//reset of stats after battle
const statsReset = () => {
    // player reset
    updatePlayerHealth();
    // Ogre reset
    currentTarget.health = currentTarget.startHealth;
    currentTarget = false;
}


// calculates gold drop from each hit
const onHitDrop = () => {
    const roll = chance();
    if (roll <= currentTarget.onHitDropChance) {
        const coinDrop = damage(currentTarget.attackMin, currentTarget.attackMax);
        playerGold += coinDrop;
        document.getElementById('player-gold').textContent = playerGold; 
        document.getElementById('info-field').textContent = `Your hit shook ${coinDrop} gold out of Ogre.`    
    }
}

const flash = () => {
  document.getElementById('flash').style.display = 'block';       // show
  setTimeout(() => {
    document.getElementById('flash').style.display = 'none';      // hide again after 1s
  }, 50);
};

//attack button action
const executeAttack = () => {
    const playerEvadeChance = chance();
    const enemyEvadeChance = chance();
    document.getElementById('info-field').textContent = 'Go on';
    let notMissed = true;
    if (enemyEvadeChance <= currentTarget.evade) {
        document.getElementById('miss').style.display = 'block';
        setTimeout(() => {
            document.getElementById('miss').style.display = 'none';
        }, 100);
        notMissed = false;
    } else {
        flash();
        const dmg = playerDamage();
        currentTarget.health -= dmg;
        if (currentTarget.health <= 0) {
            currentTarget.health = 0;
        }
        const ogreBar = Math.ceil(currentTarget.health / currentTarget.startHealth*100);
        document.getElementById('ogre-health-fill').style.width = ogreBar + '%';
    }
    if (playerEvadeChance <= playerInfo.actualStats.evade) {
        false;
    } else {
        const dmg = enemyDamage();
        playerInfo.actualStats.health -= dmg;
        if (playerInfo.actualStats.health <= 0) {
            playerInfo.actualStats.health = 0;
        }
        const playerBar = Math.ceil(playerInfo.actualStats.health / playerInfo.actualStats.healthMax * 100);
        document.getElementById('player-health-fill').style.width = playerBar + '%';
    }
    if (currentTarget.health === 0 || playerInfo.actualStats.health === 0) {
        document.getElementById('reset-btn').style.display = 'block';
        document.getElementById('ogre-pic').removeEventListener('click', executeAttack);
        document.getElementById('ogre-pic').style.cursor = 'url(rusty-brown.cur), pointer';
    }

    if (currentTarget.health === 0 && playerInfo.actualStats.health === 0) {
        playerGold += currentTarget.reward;
        document.getElementById('player-gold').textContent = playerGold;
        document.getElementById('info-field').textContent = `That\'s awkward. You both dead. Take ${currentTarget.reward} gold and don\'t tell anyone about this.`;
        return;
    }

    if (playerInfo.actualStats.health === 0) {
        document.getElementById('info-field').textContent = 'Looks like you dead';
        return;
    }

    if 
    // gold reward for defeating enemy
    (currentTarget.health === 0) {
        playerGold += currentTarget.reward;
        document.getElementById('player-gold').textContent = playerGold
        document.getElementById('info-field').textContent = `You have defeated Ogre! You looted ${currentTarget.reward} gold from his back pocket.`;
        return;
    }

    if (notMissed) {
            onHitDrop();
        }
}

document.getElementById('ogre-pic').addEventListener('click', executeAttack)

//return to choice of enemy
document.getElementById('reset-btn').addEventListener('click', () => {
    buyButtonsSwitchOn();
    document.getElementById('info-field').textContent = 'Well... Hit him';
    document.getElementById('chosen-enemy-box').style.display = 'none';
    document.getElementById('enemy-choice').style.display = 'flex';
    document.getElementById('reset-btn').style.display = 'none';

    document.getElementById('bf-title').style.display = 'block';

    statsReset();
})
// armor upgrades

const buyArmor = () => {
    if (playerGold < shopItems.armor.price) {
        document.getElementById('shop-notification').textContent = 'Not enough gold';
    } else {
        playerGold -= shopItems.armor.price;
        playerInfo.armorSet.armor.health += shopItems.armor.hpBonus
        document.getElementById('player-gold').textContent = playerGold;
        updatePlayerHealth();
        shopItems.armor.hpBonus = 2;
        document.getElementById('armor-upgrade-bonus').textContent = shopItems.armor.hpBonus;
        shopItems.armor.price = 50;
        document.getElementById('armor-price').textContent = 50;
        document.getElementById('upgrade-armor-btn').style.display = 'block';
        document.getElementById('buy-armor-btn').style.display = 'none';
        buyButtonsSwitchOff();
    }
}

const upgradeArmor = () => {
    if (playerGold < shopItems.armor.price) {
        document.getElementById('shop-notification').textContent = 'Not enough';
    } else {
    document.getElementById('buy-armor-btn').style.display = 'none';
    playerGold -= shopItems.armor.price;
    playerInfo.armorSet.armor.health += shopItems.armor.hpBonus
    document.getElementById('player-gold').textContent = playerGold;
    updatePlayerHealth();
    shopItems.armor.hpBonus *= 2;
    document.getElementById('armor-upgrade-bonus').textContent = shopItems.armor.hpBonus;
    shopItems.armor.price *= 2;
    document.getElementById('armor-price').textContent = shopItems.armor.price;
    buyButtonsSwitchOff();
    }
}

document.getElementById('buy-armor-btn').addEventListener('click', buyArmor)

document.getElementById('upgrade-armor-btn').addEventListener('click', upgradeArmor);
document.getElementById('upgrade-armor-btn').style.display = 'none';

// sword upgrades

const buySword = () => {
    if (playerGold < shopItems.sword.price) {
        document.getElementById('shop-notification').textContent = 'Not enough gold';
    } else {
        playerGold -= shopItems.sword.price;
        playerInfo.armorSet.sword.attackMin += shopItems.sword.attackMinBonus
        playerInfo.armorSet.sword.attackMax += shopItems.sword.attackMaxBonus
        document.getElementById('player-gold').textContent = playerGold;
        updatePlayerAttack();
        shopItems.sword.attackMinBonus = 1;
        shopItems.sword.attackMaxBonus = 2;
        document.getElementById('sword-upgrade-bonus').textContent = shopItems.sword.attackMinBonus + '-' + shopItems.sword.attackMaxBonus;
        shopItems.sword.price = 100;
        document.getElementById('sword-price').textContent = shopItems.sword.price;
        document.getElementById('upgrade-sword-btn').style.display = 'block';
        document.getElementById('buy-sword-btn').style.display = 'none';
        buyButtonsSwitchOff();
    }
}

const upgradeSword = () => {
    if (playerGold < shopItems.sword.price) {
        document.getElementById('shop-notification').textContent = 'Not enough gold';
    } else {
    document.getElementById('buy-sword-btn').style.display = 'none';
    playerGold -= shopItems.sword.price;
    playerInfo.armorSet.sword.attackMin += shopItems.sword.attackMinBonus
    playerInfo.armorSet.sword.attackMax += shopItems.sword.attackMaxBonus
    document.getElementById('player-gold').textContent = playerGold;
    updatePlayerAttack();
    shopItems.sword.attackMinBonus *= 2;
    shopItems.sword.attackMaxBonus *= 2;
    document.getElementById('sword-upgrade-bonus').textContent = shopItems.sword.attackMinBonus + '-' + shopItems.sword.attackMaxBonus;
    shopItems.sword.price *= 2;
    document.getElementById('sword-price').textContent = shopItems.sword.price;
    buyButtonsSwitchOff();
    }
}

document.getElementById('buy-sword-btn').addEventListener('click', buySword);

document.getElementById('upgrade-sword-btn').addEventListener('click', upgradeSword);
document.getElementById('upgrade-sword-btn').style.display = 'none';

// buy boots buttons
// gold change for boots function and button update
const bootsGold = () => {
    playerGold -= shopItems.boots.price;
    gold();
    buyButtonsSwitchOff();
}

// buy atk boots
const buyAtkBoots = () => {
    bootsGold();
    playerInfo.armorSet.boots.attack += shopItems.boots.attack;
    updatePlayerAttack();
    document.getElementById('atk-boots-ab').style.display = 'block';
    document.getElementById('buy-atk-boots-btn').style.display = 'none';
}

document.getElementById('buy-atk-boots-btn').addEventListener('click', buyAtkBoots);

// buy crit boots
const buyCritBoots = () => {
    bootsGold();
    playerInfo.armorSet.boots.critChance += shopItems.boots.critChance;
    updatePlayerCritChance();
    document.getElementById('crit-boots-ab').style.display = 'block';
    document.getElementById('buy-crit-boots-btn').style.display = 'none';
}

document.getElementById('buy-crit-boots-btn').addEventListener('click', buyCritBoots);

// buy dodge boots
const buyEvadeBoots = () => {
    bootsGold();
    playerInfo.armorSet.boots.evade += shopItems.boots.evade;
    updatePlayerEvade();
    document.getElementById('evade-boots-ab').style.display = 'block';
    document.getElementById('buy-evade-boots-btn').style.display = 'none';
}

document.getElementById('buy-evade-boots-btn').addEventListener('click', buyEvadeBoots);

// buy atk boots
const buyHealthBoots = () => {
    bootsGold();
    playerInfo.armorSet.boots.health += shopItems.boots.health;
    updatePlayerHealth();
    document.getElementById('health-boots-ab').style.display = 'block';
    document.getElementById('buy-health-boots-btn').style.display = 'none';
}

document.getElementById('buy-health-boots-btn').addEventListener('click', buyHealthBoots);