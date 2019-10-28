interface ICharacter {
  health?: number;
  name: string;
  type: "hero" | "villain";
}

interface IHero extends ICharacter {
  type: "hero";
}

interface IVillain extends ICharacter {
  type: "villain";
}

export class Hero {
  private readonly name: string;
  private health: number;
  private maxHealth: number = 100;
  constructor(name: string, health: number = 100) {
    this.name = name;
    if (health < this.maxHealth) {
      this.health = health;
    } else {
      this.health = this.maxHealth;
    }
  }

  attacked(attackValue: number) {
    if (attackValue > this.health) {
      console.log(`${this.name} is no more.`);
    } else {
      this.health -= attackValue;
      console.log(`Hero attacked: ${attackValue} -- ${this.health}`);
    }
  }

  heal(healValue: number) {
    if (this.health + healValue > this.maxHealth) {
      console.log(`${this.name} has max health of ${this.maxHealth}`);
    } else {
      this.health += healValue;
      console.log(`${this.name} healed to ${this.health}`);
    }
  }
}

// villain.ts
export class Villain {
  private readonly name: string;
  private health: number;
  private maxHealth: number = 100;
  constructor(name: string, health: number = 100) {
    this.name = name;
    if (health < this.maxHealth) {
      this.health = health;
    } else {
      this.health = this.maxHealth;
    }
  }

  rampage() {
    if (this.health <= 10) {
      this.health = this.maxHealth * 0.90
      console.log(`${this.name} restored health to ${this.health}`);
    } else {
      console.log(`${this.name} is not weak enough`);
    }
  }

  attacked(attackValue: number) {
    if (attackValue > this.health) {
      console.log(`${this.name} is no more.`);
    } else {
      this.health -= attackValue;
      console.log(`Villain attacked: ${attackValue} -- ${this.health}`);
    }
  }

  heal(healValue: number) {
    if (this.health + healValue > this.maxHealth) {
      console.log(`${this.name} has max health of ${this.maxHealth}`);
    } else {
      this.health += healValue;
      console.log(`${this.name} healed to ${this.health}`);
    }
  }
}

export class SuperHeroFactory {
  createSuperHero(heroOptions: IHero): Hero;
  createSuperHero(heroOptions: IVillain): Villain;
  createSuperHero(heroOptions: ICharacter) {
    if (heroOptions.type === "hero") {
      return new Hero(heroOptions.name, heroOptions.health);
    } else if (heroOptions.type === "villain") {
      return new Villain(heroOptions.name, heroOptions.health);
    } else {
      throw Error('unknown character type!')
    }
  }
}

const superheroFactory = new SuperHeroFactory();
const batman = superheroFactory.createSuperHero({name: 'Batman', type: "hero"});
const joker = superheroFactory.createSuperHero({name: 'Joker', health: 50, type: "villain"});

batman.attacked(40); // Hero attacked: 40 -- 60
joker.attacked(40); // Villain attacked: 40 -- 10
joker.rampage(); // Joker restored health to 90
batman.attacked(40);
