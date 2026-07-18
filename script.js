 // Select all score inputs
const scoreInputs = [
    { score: document.getElementById('strScore'), mod: document.getElementById('strMod') },
    { score: document.getElementById('dexScore'), mod: document.getElementById('dexMod') },
    { score: document.getElementById('conScore'), mod: document.getElementById('conMod') },
    { score: document.getElementById('intScore'), mod: document.getElementById('intMod') },
    { score: document.getElementById('wisScore'), mod: document.getElementById('wisMod') },
    { score: document.getElementById('chaScore'), mod: document.getElementById('chaMod') }
];

// Function to calculate D&D modifier
function calculateModifier(score) {
    let num = parseInt(score);
    if (isNaN(num)) return "";
    let mod = Math.floor((num - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
}

// --- NEW AUTO-CALCULATION LOGIC ---
function updateDerivedStats() {
    // Level -> Proficiency Bonus
    const level = parseInt(document.getElementById('charLevel').value) || 1;
    const profBonus = Math.floor((level - 1) / 4) + 2;
    document.getElementById('profBonus').value = `+${profBonus}`;

    // Dexterity -> Armor Class & Initiative
    const dexScore = parseInt(document.getElementById('dexScore').value) || 10;
    const dexMod = Math.floor((dexScore - 10) / 2);
    document.getElementById('armorClass').value = 10 + dexMod;
    document.getElementById('initiative').value = dexMod >= 0 ? `+${dexMod}` : `${dexMod}`;

    // Wisdom -> Passive Perception (10 + Perception Skill Mod)
    const perceptionMod = calculateSkillMod('wis', 'perception');
    document.getElementById('passivePerception').value = 10 + perceptionMod;
}

// Listen for Level changes
document.getElementById('charLevel').addEventListener('input', () => {
    updateDerivedStats();
    if (activeStatId) renderSkills(activeStatId);
});

// Add event listeners to update modifiers automatically when typing a score
scoreInputs.forEach(stat => {
    stat.score.addEventListener('input', (e) => {
        stat.mod.value = calculateModifier(e.target.value);
        updateDerivedStats();
        if (activeStatId) renderSkills(activeStatId); // Update skills if open
    });
});

// --- NEW SKILLS & TRAITS LOGIC ---

const skillsMap = {
    str: [{ id: 'strength save', name: 'STR save' },{ id: 'athletics', name: 'Athletics' }],
    dex: [{ id: 'dexterity save', name: 'DEX save' },{ id: 'acrobatics', name: 'Acrobatics' }, { id: 'sleightOfHand', name: 'Sleight of Hand' }, { id: 'stealth', name: 'Stealth' }],
    con: [{ id: 'Constitution save', name: 'Con save' }], // Constitution has no standard associated skills
    int: [{ id: 'inteligence save', name: 'INT save' },{ id: 'arcana', name: 'Arcana' }, { id: 'history', name: 'History' }, { id: 'investigation', name: 'Investigation' }, { id: 'nature', name: 'Nature' }, { id: 'religion', name: 'Religion' }],
    wis: [{ id: 'Wisdom save', name: 'WIS save' },{ id: 'animalHandling', name: 'Animal Handling' }, { id: 'insight', name: 'Insight' }, { id: 'medicine', name: 'Medicine' }, { id: 'perception', name: 'Perception' }, { id: 'survival', name: 'Survival' }],
    cha: [{ id: 'Charisma save', name: 'CHA save' },{ id: 'deception', name: 'Deception' }, { id: 'intimidation', name: 'Intimidation' }, { id: 'performance', name: 'Performance' }, { id: 'persuasion', name: 'Persuasion' }]
};

const skillsState = {}; 
let activeStatId = null;

// Initialize state for all skills
Object.values(skillsMap).flat().forEach(skill => {
    skillsState[skill.id] = { prof: false, exp: false };
});

// Event listeners for stat boxes
const statBoxes = document.querySelectorAll('.stat-box');
statBoxes.forEach(box => {
    box.addEventListener('click', (e) => {
        // Ignore clicks if the user is typing directly into the input field
        if(e.target.tagName === 'INPUT') return;
        
        const statId = box.dataset.stat;
        toggleSkills(statId);
    });
});

function toggleSkills(statId) {
    const section = document.getElementById('skillsSection');
    const header = document.getElementById('skillsHeader');

    // Remove active class from all stats visually
    statBoxes.forEach(b => b.classList.remove('active'));

    if (activeStatId === statId) {
        // If clicking the currently open stat, hide it
        section.classList.add('hidden');
        activeStatId = null;
    } else {
        // Open and show new stat's skills
        activeStatId = statId;
        const activeBox = document.querySelector(`.stat-box[data-stat="${statId}"]`);
        if(activeBox) activeBox.classList.add('active');
        
        section.classList.remove('hidden');
        
        const statNameMap = { str: 'Strength', dex: 'Dexterity', con: 'Constitution', int: 'Intelligence', wis: 'Wisdom', cha: 'Charisma' };
        header.textContent = `${statNameMap[statId]} Skills`;
        
        renderSkills(statId);
    }
}

function renderSkills(statId) {
    const container = document.getElementById('skillsContainer');
    container.innerHTML = '';
    const skills = skillsMap[statId];

    if(skills.length === 0) {
        container.innerHTML = '<p class="text-gray-500 italic text-sm py-4">No standard skills associated with this ability score.</p>';
        return;
    }

    skills.forEach(skill => {
        const state = skillsState[skill.id];
        const mod = calculateSkillMod(statId, skill.id);
        const displayMod = mod >= 0 ? `+${mod}` : `${mod}`;

        const row = document.createElement('div');
        row.className = 'skill-row';
        row.innerHTML = `
            <div class="skill-checkbox-group">
                <input type="checkbox" class="dnd-radio prof" data-skill="${skill.id}" title="Proficiency" ${state.prof ? 'checked' : ''}>
                <input type="checkbox" class="dnd-radio exp" data-skill="${skill.id}" title="Expertise" ${state.exp ? 'checked' : ''}>
            </div>
            <div class="w-10 text-center font-bold mr-3 text-lg border-b border-gray-300 pb-1">${displayMod}</div>
            <div class="font-semibold text-gray-800 text-lg">${skill.name} <span class="text-xs text-gray-400 font-normal ml-1">(${statId.toUpperCase()})</span></div>
        `;
        container.appendChild(row);
    });

    // Bind checkbox events
    container.querySelectorAll('.prof').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const sId = e.target.dataset.skill;
            skillsState[sId].prof = e.target.checked;
            if(!e.target.checked) {
                skillsState[sId].exp = false; // Turn off expertise if proficiency is removed
                container.querySelector(`.exp[data-skill="${sId}"]`).checked = false;
            }
            updateDerivedStats(); // Passive perception might change
            renderSkills(activeStatId); // Re-render to update math
        });
    });

    container.querySelectorAll('.exp').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const sId = e.target.dataset.skill;
            skillsState[sId].exp = e.target.checked;
            if(e.target.checked) {
                skillsState[sId].prof = true; // Auto-enable proficiency if expertise is checked
                container.querySelector(`.prof[data-skill="${sId}"]`).checked = true;
            }
            updateDerivedStats(); // Passive perception might change
            renderSkills(activeStatId); // Re-render to update math
        });
    });
}

function calculateSkillMod(statId, skillId) {
    const statScoreInput = document.getElementById(`${statId}Score`).value;
    const baseMod = Math.floor((parseInt(statScoreInput || 10) - 10) / 2);
    
    const profBonusStr = document.getElementById('profBonus').value.replace('+','');
    const profBonus = parseInt(profBonusStr || 0);

    const state = skillsState[skillId];
    let mod = baseMod;
    if (state.prof) mod += profBonus;
    if (state.exp) mod += profBonus;

    return mod;
}

// Re-render skills if Proficiency Bonus changes
document.getElementById('profBonus').addEventListener('input', () => { 
    const perceptionMod = calculateSkillMod('wis', 'perception');
    document.getElementById('passivePerception').value = 10 + perceptionMod;
    if(activeStatId) renderSkills(activeStatId); 
});

// Initialize derived stats on load
updateDerivedStats();
