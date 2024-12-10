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
};
