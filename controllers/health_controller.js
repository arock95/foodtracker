import { health_issues } from "../mock_data/health_data.js"
import escape from "lodash.escape";

const addToDatabase = function(req, res) {
    health_issues.push({
        "health_issue": req.body['health_issue'],
        "occurrence_date": req.body['occurrence_date']
    });
    res.status(201);
    res.send(`Health issue added to database!`);
 }



 export {addToDatabase};