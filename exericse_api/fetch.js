require('dotenv').config()
const fs = require('fs');

const OUTPUT_PATH = '../workout-client/assets/data'

const HEADERS = {
    'X-RapidAPI-Key': process.env.KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
}

const fetchData = async(url, options) => {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error);
    }
}

const formReq = async(url) => {
    const options = {
        method: 'GET',
        headers: HEADERS
    };
    const res = await fetchData(url, options);
    const urlPaths = url.split('/');
    const fileName = urlPaths[urlPaths.length - 1];

    fs.writeFile(`${OUTPUT_PATH}/${fileName}.json`, JSON.stringify(res, null, 2), function(err){
        if (err){
            console.error(err);
        }
    });

}


const fetchApiData = () => {
    const urls = [
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        'https://exercisedb.p.rapidapi.com/exercises/targetList',
        'https://exercisedb.p.rapidapi.com/exercises/equipmentList',
        'https://exercisedb.p.rapidapi.com/exercises',
    ]
    urls.forEach(url => formReq(url));
}

fetchApiData();

module.exports = {OUTPUT_PATH};