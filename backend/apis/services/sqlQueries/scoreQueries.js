const GET_ALL_SCORE_CATEGORIES = `
SELECT 
* 
FROM 
score_categories
`;

const GET_ALL_SCORE_CATEGORIES_GUEST = `
SELECT 
* 
FROM 
score_categories
WHERE
IsActivate = '1'
`;

const GET_ALL_SCORE_LISTS_BY_CATEGORY_ID = `
SELECT
*
FROM
score_lists
WHERE
CategoryID = ?
`;

const GET_ALL_SCORE_LISTS_GUEST = `
SELECT 
* 
FROM 
score_lists
WHERE
IsActivate ='1'
`;

const INSERT_NEW_CATEGORY = `
INSERT 
INTO 
score_categories
( 
name
) 
VALUES (?)
`;
const UPDATE_CATEGORY = `
UPDATE
score_categories
SET
name = ?
WHERE
score_categories.ID = ?
`;

const UPDATE_CATEGORY_ACTIVATE = `
UPDATE
score_categories
SET
IsActivate = ?
WHERE
score_categories.ID = ?
`;

const INSERT_NEW_LIST = `
INSERT
INTO
score_lists
(
CategoryID,
name,
unit
)
VALUES (?,?,?)
`;

const UPDATE_LIST = `
UPDATE
score_lists
SET
name = ?,
unit = ?
WHERE
score_lists.ID = ?
`;

const UPDATE_LIST_ACTIVATE = `
UPDATE
score_lists
SET
IsActivate = ?
WHERE
score_lists.ID = ?
`;

const GET_ALL_COFFEE_VARIETIES = `
SELECT
*
FROM
coffee_varieties
`;

const GET_ALL_COFFEE_VARIETIES_GUEST = `
SELECT 
* 
FROM 
coffee_varieties
WHERE
IsActivate = '1'
`;

const INSERT_NEW_COFFEE_VARIETY = `
INSERT 
INTO 
coffee_varieties
( 
LocationID,
CoffeeProcessID,
code
) 
VALUES (?,?,?)
`;

const UPDATE_COFFEE_VARIETY = `
UPDATE
coffee_varieties
SET
LocationID = ?,
CoffeeProcessID = ?,
code = ?
WHERE
coffee_varieties.ID = ?
`;

const GET_ALL_COFFEE_VARIETIY_SCORES_BY_ID = `
SELECT 
* 
FROM 
coffee_variety_scores
WHERE
coffee_variety_scores.CoffeeVarietyID = ?
`;

const GET_ALL_COFFEE_VARIETIY_SCORES_GUEST = `
SELECT 
* 
FROM 
coffee_variety_scores
WHERE
IsActivate = '1'
`;

module.exports = {
  GET_ALL_SCORE_CATEGORIES,
  GET_ALL_SCORE_CATEGORIES_GUEST,
  GET_ALL_SCORE_LISTS_BY_CATEGORY_ID,
  GET_ALL_SCORE_LISTS_GUEST,
  INSERT_NEW_CATEGORY,
  INSERT_NEW_LIST,
  UPDATE_CATEGORY,
  UPDATE_LIST,
  UPDATE_CATEGORY_ACTIVATE,
  UPDATE_LIST_ACTIVATE,
  GET_ALL_COFFEE_VARIETIES,
  GET_ALL_COFFEE_VARIETIES_GUEST,
  GET_ALL_COFFEE_VARIETIY_SCORES_BY_ID,
  GET_ALL_COFFEE_VARIETIY_SCORES_GUEST,
  INSERT_NEW_COFFEE_VARIETY,
  UPDATE_COFFEE_VARIETY,
};
