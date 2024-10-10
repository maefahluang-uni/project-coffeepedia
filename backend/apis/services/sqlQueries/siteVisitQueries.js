const SELECT_VISIT_BYDATE = `
SELECT * 
FROM 
site_visits 
WHERE visit_date = ?
`;
const COUNT_TODAY_VISIT = `
SELECT 
visit_count 
FROM 
site_visits 
WHERE 
DATE(visit_date) = CURDATE();
`;
const INSERT_NEW_VISIT = `
INSERT INTO 
site_visits 
(
visit_date, 
visit_count
) 
VALUES (?, ?)
`;

const UPDATE_VISIT = `
UPDATE 
site_visits 
SET 
visit_count = visit_count + 1 
WHERE 
visit_date = ?
`;
module.exports = {
  SELECT_VISIT_BYDATE,
  COUNT_TODAY_VISIT,
  INSERT_NEW_VISIT,
  UPDATE_VISIT,
};
