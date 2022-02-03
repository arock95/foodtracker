import moment from "moment";
import { food_entries } from "../mock_data/food_data.js";


Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const post_food = function(req, res){
    if (Date.parse(req.body['eaten_date'])){
        const foods = `${req.body['foods']}`;
        
        const foods_array = typeof foods === 'string' ? foods.split(',') : [];
        const eaten_date = new Date(req.body['eaten_date']);

        foods_array.forEach((f) => {
            addToDatabase(f, eaten_date)
        })

        res.status( 201 );
        res.send(`foods added to database!`);
    } else {
        res.status( 400 );
        res.send("Invalid data!");
    }
}

const addToDatabase = function (food, eaten_date) {
    food_entries.push({
        "food": food,
        "eaten_date": eaten_date
    })
}

const get_food = function(req, res) {
    if (Number.parseInt(req.query['days'])) {
        const days_back = req.query['days'] * -1;
        res.send(getFoodsDaysBack(days_back));
    } else if (moment(req.query['start']).isValid() && moment(req.query['end']).isValid()) {
        res.send(getFoodsByRange(moment(req.query['start']), moment(req.query['end'])));
    } else {
        res.status(400);
        res.send("Invalid query parameters");
    }
}

const getFoodsDaysBack = function (days) {
    const foods = []
    let daysBack = new Date()
    daysBack = daysBack.addDays(days)

    food_entries.forEach((f) => {
        if (f.eaten_date >= daysBack) {
            foods.push(f);
        }
    })
    return foods;
}

const getFoodsByRange = (start, end) => {
    const foods = []

    food_entries.forEach((f) => {
        if (f.eaten_date >= start && f.eaten_date <= end) {
            foods.push(f);
        }
    })
    return foods;
}

export {post_food, get_food};