const LOGIN = `
SELECT * 
FROM 
admin 
WHERE 
admin.UserName = ? 
AND 
admin.PassWord = ?
`;
module.exports = { LOGIN };
