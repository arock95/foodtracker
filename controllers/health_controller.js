import { health_issues } from "../mock_data/health_data.js"
import moment from 'moment';

Date.prototype.subDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() - days);
    return date;
}

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
    if (Number.parseInt(req.query['days'])) {
        res.send(getIssueDaysBack(req.query['days']));
    } else if (moment(req.query['start']).isValid() && moment(req.query['end']).isValid()){
        res.send(getIssuesByRange(moment(req.query['start']), moment(req.query['end'])));
    } else {
        res.status(400);
        res.send("Invalid query parameters");
    } 
}

const getIssueDaysBack = function(days_back) {
    let issues = []
    days_back = new Date().subDays(days_back)
    console.log(days_back);
    health_issues.forEach( i => {
        if (i.occurrence_date >= days_back){
            issues.push(i);
        }
    });
    return issues;
}

const getIssuesByRange = (start, end) => {
    let issues = [];
    health_issues.forEach( i => {
        if (i.occurrence_date >= start && i.occurrence_date <= end){
            issues.push(i);
        }
    });
    return issues;
}

 export {post_health, get_health};