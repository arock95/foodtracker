import { health_issues } from "../mock_data/health_data.js"

const post_health = function(req, res) {
    if (Date.parse(req.body['occurrence_date'])){
        addToDatabase(req.body['health_issue'], req.body['occurrence_date'])
        res.status(201);
        res.send(`Health issue added to database!`);
    } else {
        res.status( 400 );
        res.send("Invalid date!")
    }    
 }

 const addToDatabase = (issue, occurrence_date) => {
    health_issues.push({
        "health_issue": issue,
        "occurrence_date": new Date(occurrence_date)
    });
 }

 const get_health = function(req, res) {
    const days_back = req.query['days'] * -1;
    res.send(getIssueDaysBack(days_back));   
}


 export {post_health, get_health};