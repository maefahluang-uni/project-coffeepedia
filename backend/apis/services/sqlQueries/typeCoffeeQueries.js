// Define SQL queries as constants
const GET_TYPE_COFFEE_BY_ID = `
  SELECT 
    type_coffee.ID, 
    roast_level.RoastName, 
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

const GET_TYPE_COFFEE_IMAGE_BY_TYPE_ID = `
SELECT 
type_coffee_image.ImageDataFront, 
type_coffee_image.ImageDataBack 
FROM 
type_coffee_image 
WHERE 
type_coffee_image.TypeID = ?;
`;

// Export the SQL queries
module.exports = {
  GET_TYPE_COFFEE_BY_ID,
  GET_TYPE_COFFEE_IMAGE_BY_TYPE_ID,
};
