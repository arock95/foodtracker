import { health_issues } from "../mock_data/health_data.js"

const addToDatabase = function(req, res) {
    health_issues.push({
        "health_issue": req.body['health_issue'],
        "occurrence_date": req.body['occurrence_date']
    });
    res.status(201);
    res.send(JSON.stringify(req.body));
 }

 

 export {addToDatabase};