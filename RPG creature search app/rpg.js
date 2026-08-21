const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const API_URL =
  "https://rpg-creature-api.freecodecamp.rocks/api/creature/";

searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}${query}`);

    if (!response.ok) {
      throw new Error("Creature not found");
    }

    const data = await response.json();

    // Basic information
    creatureName.textContent = data.name.toUpperCase();
    creatureId.textContent = `#${data.id}`;

    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;

    // Clear previous types
    types.innerHTML = "";

    data.types.forEach((type) => {
      const typeElement = document.createElement("span");

      typeElement.classList.add("type");
      typeElement.textContent = type.name.toUpperCase();

      types.appendChild(typeElement);
    });

    // Create stats lookup object
    const stats = {};

    data.stats.forEach((stat) => {
      stats[stat.name] = stat.base_stat;
    });

    // Display stats
    hp.textContent = stats.hp;
    attack.textContent = stats.attack;
    defense.textContent = stats.defense;

    specialAttack.textContent = stats["special-attack"];

    specialDefense.textContent = stats["special-defense"];

    speed.textContent = stats.speed;

  } catch (error) {
    alert("Creature not found");
  }
});