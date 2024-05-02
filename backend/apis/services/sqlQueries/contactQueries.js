const GET_CONTACT_INFO = `
SELECT * 
FROM 
contact_info 
WHERE ID = 1
`;

const UPDATE_CONTACT = `
UPDATE
contact_info
SET 
contact_info.Address = ?,
contact_info.Phone = ?,
contact_info.Email =?
WHERE
contact_info.ID =?
`;

module.exports = {
  GET_CONTACT_INFO,
  UPDATE_CONTACT,
};
