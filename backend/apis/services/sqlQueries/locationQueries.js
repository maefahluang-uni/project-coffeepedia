const GET_LOCATIONS_FOR_ADMIN = `
SELECT 
* 
FROM 
locations
`;

const GET_ALL_LOCATIONS = `
SELECT 
* 
FROM 
locations 
WHERE 
locations.Isactivate = 1
`;

const INSERT_NEW_LOCATION = `
INSERT 
INTO 
locations 
( 
farmName, 
locationName, 
latitude, 
longtitude, 
masl, 
province, 
district, 
subdistrict, 
zipcode, 
image
) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL, ?)
`;

const UPDATE_LOCATION = `
UPDATE
locations
SET
farmName = ?,
locationName = ?,
latitude = ?, 
longtitude = ?, 
masl = ?, 
province = ?, 
district = ?, 
subdistrict = ?, 
zipcode = ?, 
image = ?
WHERE
locations.id = ?
`;

const UPDATE_LOCATION_ACTIVATE = `
UPDATE
locations
SET
IsActivate = ?
WHERE
locations.id = ?
`;

module.exports = {
  GET_ALL_LOCATIONS,
  GET_LOCATIONS_FOR_ADMIN,
  INSERT_NEW_LOCATION,
  UPDATE_LOCATION,
  UPDATE_LOCATION_ACTIVATE,
};
