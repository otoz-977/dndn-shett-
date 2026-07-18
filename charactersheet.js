const dnd5eCharacterTemplate = {
  // --- 1. Basic Character Information ---
  characterInfo: {
    characterName: "",
    playerName: "",
    class: "",
    subClass: "",
    level: 0, // e.g., "Fighter 3"
    race: "",
    background: "",
    alignment: "",
    experiencePoints: 0
  },

  // --- 2. Ability Scores ---
  // In a robust app, 'modifier' would likely be a derived getter: Math.floor((score - 10) / 2)
  abilityScores: {
    strength: { score: 10, modifier: 0 },
    dexterity: { score: 10, modifier: 0 },
    constitution: { score: 10, modifier: 0 },
    intelligence: { score: 10, modifier: 0 },
    wisdom: { score: 10, modifier: 0 },
    charisma: { score: 10, modifier: 0 }
  },

  // --- 3. Core Combat & Progression Stats ---
  coreStats: {
    proficiencyBonus: 2,
    inspiration: 0,
    armorClass: 10,
    initiative: 0,
    speed: 30,
    passivePerception: 10
  },

  // --- 4. Health & Survivability ---
  health: {
    hitPoints: {
      maximum: 0,
      current: 0,
      temporary: 0
    },
    hitDice: {
      total: "", // e.g., "3d10"
      current: "" 
    },
    deathSaves: {
      successes: 0, // Max 3
      failures: 0   // Max 3
    }
  },

  // --- 5. Saving Throws ---
  savingThrows: {
    strength: { proficient: false, bonus: 0 },
    dexterity: { proficient: false, bonus: 0 },
    constitution: { proficient: false, bonus: 0 },
    intelligence: { proficient: false, bonus: 0 },
    wisdom: { proficient: false, bonus: 0 },
    charisma: { proficient: false, bonus: 0 }
  },

  // --- 6. Skills ---
  skills: {
    acrobatics: { proficient: false, expertise: false, bonus: 0, ability: "dexterity" },
    animalHandling: { proficient: false, expertise: false, bonus: 0, ability: "wisdom" },
    arcana: { proficient: false, expertise: false, bonus: 0, ability: "intelligence" },
    athletics: { proficient: false, expertise: false, bonus: 0, ability: "strength" },
    deception: { proficient: false, expertise: false, bonus: 0, ability: "charisma" },
    history: { proficient: false, expertise: false, bonus: 0, ability: "intelligence" },
    insight: { proficient: false, expertise: false, bonus: 0, ability: "wisdom" },
    intimidation: { proficient: false, expertise: false, bonus: 0, ability: "charisma" },
    investigation: { proficient: false, expertise: false, bonus: 0, ability: "intelligence" },
    medicine: { proficient: false, expertise: false, bonus: 0, ability: "wisdom" },
    nature: { proficient: false, expertise: false, bonus: 0, ability: "intelligence" },
    perception: { proficient: false, expertise: false, bonus: 0, ability: "wisdom" },
    performance: { proficient: false, expertise: false, bonus: 0, ability: "charisma" },
    persuasion: { proficient: false, expertise: false, bonus: 0, ability: "charisma" },
    religion: { proficient: false, expertise: false, bonus: 0, ability: "intelligence" },
    sleightOfHand: { proficient: false, expertise: false, bonus: 0, ability: "dexterity" },
    stealth: { proficient: false, expertise: false, bonus: 0, ability: "dexterity" },
    survival: { proficient: false, expertise: false, bonus: 0, ability: "wisdom" }
  },

  // --- 7. Attacks & Spellcasting ---
  attacks: [
    // Example: { name: "Longsword", bonus: 5, damage: "1d8+3", damageType: "Slashing" }
  ],

  // --- 8. Equipment & Inventory ---
  equipment: {
    currency: {
      cp: 0,
      sp: 0,
      ep: 0,
      gp: 0,
      pp: 0
    },
    items: [
      // Example: { name: "Rations (1 day)", quantity: 10, weight: 2.0 }
    ]
  },

  // --- 9. Proficiencies & Languages ---
  proficienciesAndLanguages: {
    armor: [],    // e.g., ["Light", "Medium", "Shields"]
    weapons: [],  // e.g., ["Simple", "Martial"]
    tools: [],    // e.g., ["Thieves' Tools", "Lute"]
    languages: [] // e.g., ["Common", "Elvish"]
  },

  // --- 10. Features & Traits ---
  featuresAndTraits: [
    // Example: { name: "Action Surge", source: "Fighter Level 2", description: "Take one additional action on your turn." }
  ],

  // --- 11. Roleplay Elements ---
  roleplay: {
    personalityTraits: "",
    ideals: "",
    bonds: "",
    flaws: ""
  },

  // --- 12. Spellcasting (Keep empty/null if non-caster) ---
  spellcasting: {
    spellcastingClass: "",
    spellcastingAbility: "", // e.g., "intelligence"
    spellSaveDC: 0,          // 8 + Prof Bonus + Ability Modifier
    spellAttackBonus: 0,     // Prof Bonus + Ability Modifier
    slots: {
      level1: { total: 0, expended: 0 },
      level2: { total: 0, expended: 0 },
      level3: { total: 0, expended: 0 },
      level4: { total: 0, expended: 0 },
      level5: { total: 0, expended: 0 },
      level6: { total: 0, expended: 0 },
      level7: { total: 0, expended: 0 },
      level8: { total: 0, expended: 0 },
      level9: { total: 0, expended: 0 }
    },
    spells: {
      cantrips: [], // e.g., [{ name: "Fire Bolt", castingTime: "1 Action", range: "120 ft", components: "V, S", duration: "Instantaneous" }]
      level1: [],
      level2: [],
      level3: [],
      level4: [],
      level5: [],
      level6: [],
      level7: [],
      level8: [],
      level9: []
    }
  }
};