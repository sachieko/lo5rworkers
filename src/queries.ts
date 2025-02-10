// api queries for the database

export const loreQuery = `
  SELECT lore.*, cards.id AS card_id, cards.header, 
  cards.content FROM lore
  LEFT JOIN cards ON lore.id = lore_id
  ORDER BY lore.id, cards.id;`;

export const opportunitiesQuery = `
  SELECT opportunities.*, techniques.name, techniques.prerequisite, techniques.rank,
  techniques.type, techniques.description, techniques.activation, techniques.effect AS technique_effect
  FROM opportunities
  LEFT JOIN techniques ON technique_id = techniques.id
  ORDER BY opportunities.ring, opportunities.category, opportunities.id;`;

export const rulesQuery = `
  SELECT rules.* , cards.id AS card_id, cards.header, cards.content AS content FROM rules
  LEFT JOIN cards ON rules.id = rule_id
  ORDER BY rules.id, cards.id;`;

export const searchQuery = `
  SELECT '/rules/' || id AS link, title, detail FROM rules 
  WHERE title ILIKE '%' || $1 || '%'
  UNION 
  SELECT '/lore/' || id AS link, title, detail FROM lore
  WHERE title ILIKE '%' || $1 || '%'
  UNION
  SELECT '/techniques/?filter=&tech=' || id AS link, name AS title, type AS detail FROM techniques
  WHERE name ILIKE '%' || $1 || '%'
  UNION
  SELECT '/conditions/' || id AS link, title, detail FROM conditions
  WHERE title ILIKE '%' || $1 || '%'
  UNION
  SELECT '/terrains/' || id AS link, title, detail FROM terrains
  WHERE title ILIKE '%' || $1 || '%'
  UNION
  SELECT '/qualities/' || id AS link, title, detail FROM item_qualities
  WHERE title ILIKE '%' || $1 || '%'
  UNION
  SELECT '/weapons/' AS link, name AS title, type AS detail FROM weapons
  WHERE name ILIKE '%' || $1 || '%';
  `;

export const questionsQuery = `
  SELECT questions.*, choices.id AS choice_id, choices.choice,
  choices.stat, choices.info AS choiceinfo FROM questions
  JOIN choices ON questions.id = question_id
  ORDER BY questions.id, choices.id;`;

export const techniqueAGGQuery = `
  SELECT techniques.*, JSON_AGG(JSON_BUILD_OBJECT(
    'opportunity_id', opportunities.id,
    'ring', opportunities.ring,
    'cost', opportunities.cost,
    'effect', opportunities.effect
  )) AS opportunities
  FROM techniques
  LEFT JOIN opportunities ON technique_id = techniques.id
  GROUP BY techniques.id
  ORDER BY techniques.type, techniques.rank, techniques.name;`;

export const conditionsQuery = `
  SELECT conditions.*
  FROM conditions
  ORDER BY conditions.title;`;

export const terrainsQuery = `
  SELECT terrains.* 
  FROM terrains 
  ORDER BY terrains.title;`;

export const qualitiesQuery = `
  SELECT item_qualities.*
  FROM item_qualities
  ORDER BY item_qualities.title;
  `;

export const weaponsQuery = `
  SELECT weapons.id, weapons.name as title, weapons.type, weapons.skill, weapons.range, weapons.damage, weapons.deadliness,weapons.rarity,
  weapons.cost, weapons.book, weapons.pg, STRING_AGG(item_qualities.title, ', ') as qualities
  FROM weapons
  LEFT JOIN weapon_qualities ON weapons.id = weapon_qualities.weapon_id
  LEFT JOIN item_qualities ON item_qualities.id = weapon_qualities.quality_id
  GROUP BY weapons.id
  ORDER BY title;
`;