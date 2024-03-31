// Define SQL queries as constants
const GET_TYPES_COFFEE = `
SELECT 
type_coffee.ID,
roast_level.RoastName,
coffee_process.ProcessName,
type_coffee.ImageDataFront
FROM 
type_coffee
JOIN
roast_level ON type_coffee.RoastLevelID = roast_level.ID 
JOIN
coffee_process ON type_coffee.CoffeeProcessID = coffee_process.ID
WHERE
roast_level.IsActivate = 1 AND coffee_process.IsActivate = 1 AND type_coffee.IsActivate = 1
ORDER BY coffee_process.ProcessName ASC
`;

const GET_TYPES_COFFEE_FOR_ADMIN = `
SELECT 
type_coffee.ID,
roast_level.RoastName,
coffee_process.ProcessName,
type_coffee.ImageDataFront
FROM 
type_coffee
JOIN
roast_level ON type_coffee.RoastLevelID = roast_level.ID 
JOIN
coffee_process ON type_coffee.CoffeeProcessID = coffee_process.ID
WHERE
roast_level.IsActivate = 1 AND coffee_process.IsActivate = 1
ORDER BY coffee_process.ProcessName ASC
`;

const GET_TYPE_COFFEE_BY_ID = `
SELECT 
type_coffee.ID, 
roast_level.RoastName, 
type_coffee.CommonName,
coffee_process.ProcessName, 
type_coffee.Tempurature, 
type_coffee.CrackState, 
type_coffee.Flavor, 
type_coffee.MoreDetail
FROM 
type_coffee
JOIN 
roast_level ON type_coffee.RoastLevelID = roast_level.ID 
JOIN 
coffee_process ON type_coffee.CoffeeProcessID = coffee_process.ID 
WHERE 
roast_level.IsActivate = 1 AND coffee_process.IsActivate = 1 AND type_coffee.ID = ?;
`;

const INSERT_NEW_TYPE_COFFEE = `
INSERT INTO 
type_coffee 
( RoastLevelID, 
  CoffeeProcessID, 
  CommonName, 
  Tempurature, 
  CrackState, 
  Flavor, 
  MoreDetail) 
VALUES 
( ?, 
?, 
?, 
?, 
?, 
?,
? )
`;

const UPDATE_TYPE_COFFEE = `
UPDATE 
type_coffee
SET 
RoastLevelID = ?, 
CoffeeProcessID = ?, 
CommonName = ?, 
Tempurature = ?, 
CrackState = ?, 
Flavor = ?, 
MoreDetail = ?
WHERE 
type_coffee.ID = ?;
`;

const GET_TYPE_COFFEE_GAS_STATES = `
SELECT 
gas_state.Gas, gas_state.WhenTempurature 
FROM gas_state 
JOIN 
type_coffee ON gas_state.TypeCoffeeID = type_coffee.ID
WHERE
type_coffee.ID = ?  
ORDER BY gas_state.Gas  DESC
`;

const INSERT_GAS_STATE = `
INSERT INTO 
gas_state 
(TypeCoffeeID, 
Gas, 
WhenTempurature) 
VALUES 
( ?, 
?, 
?)
`;

const INSERT_DRINK_SUGGESTION = `
INSERT INTO 
drink_suggest 
(TypeID, 
DrinkName, 
icon) 
VALUES 
( ?,
  ?, 
  ?)
`;

const GET_TYPE_COFFEE_IMAGES_BY_TYPE_ID = `
SELECT 
type_coffee_image.ImageDataFront, 
type_coffee_image.ImageDataBack 
FROM 
type_coffee_image 
WHERE 
type_coffee_image.TypeID = ?;
`;

const GET_TYPE_COFFEE_DRINK_SUGGESTION_BY_TYPE_ID = `
SELECT 
drink_suggest.DrinkName, 
drink_suggest.icon 
FROM 
drink_suggest
JOIN
type_coffee ON drink_suggest.TypeID = type_coffee.ID
WHERE
type_coffee.ID = ?  
ORDER BY drink_suggest.DrinkName ASC;
`;

const COUNT_TYPES = `
SELECT 
COUNT(*) 
AS 
type_count 
FROM 
type_coffee;
`;

const GET_PROCESS = `
SELECT * 
FROM 
coffee_process;
`;

const GET_ROAST = `
SELECT * 
FROM 
roast_level;
`;

const INSERT_NEW_PROCESS = `
INSERT 
INTO 
coffee_process
(ProcessName) 
VALUES 
(?)
`;

const INSERT_NEW_ROAST = `
INSERT 
INTO 
roast_level 
(RoastName) 
VALUES 
(?)
`;

const UPDATE_PROCESS = `
UPDATE 
coffee_process
SET 
ProcessName = ?
WHERE 
coffee_process.ID = ?;
`;

const UPDATE_ROAST = `
UPDATE 
roast_level
SET 
RoastName = ? 
WHERE 
roast_level.ID = ?;
`;

const UPDATE_PROCESS_ACTIVATE = `
UPDATE 
coffee_process
SET 
IsActivate = ?
WHERE 
coffee_process.ID = ?;
`;

const UPDATE_ROAST_ACTIVATE = `
UPDATE 
roast_level
SET 
IsActivate = ?
WHERE 
roast_level.ID = ?;
`;
const UPDATE_TYPE_ACTIVATE = `
UPDATE 
type_coffee
SET 
IsActivate = ?
WHERE 
type_coffee.ID = ?;
`;
// Export the SQL queries
module.exports = {
  GET_TYPE_COFFEE_BY_ID,
  GET_TYPE_COFFEE_GAS_STATES,
  GET_TYPE_COFFEE_IMAGES_BY_TYPE_ID,
  INSERT_NEW_TYPE_COFFEE,
  UPDATE_TYPE_COFFEE,
  INSERT_GAS_STATE,
  INSERT_DRINK_SUGGESTION,
  GET_TYPES_COFFEE,
  GET_TYPES_COFFEE_FOR_ADMIN,
  GET_TYPE_COFFEE_DRINK_SUGGESTION_BY_TYPE_ID,
  COUNT_TYPES,
  GET_PROCESS,
  GET_ROAST,
  INSERT_NEW_PROCESS,
  INSERT_NEW_ROAST,
  UPDATE_PROCESS,
  UPDATE_ROAST,
  UPDATE_PROCESS_ACTIVATE,
  UPDATE_ROAST_ACTIVATE,
  UPDATE_TYPE_ACTIVATE,
};
