const axios = require('axios');

function sleep(ms) {
    
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getLike= params => {
	// const URL = 'https://reactjsteachingproj.herokuapp.com/users';
    console.log('getLike')
	return sleep(1000).then(response => {
		return {like: 100};
	});
};