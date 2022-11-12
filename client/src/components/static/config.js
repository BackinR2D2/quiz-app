module.exports = {
	url:
		process.env.NODE_ENV === 'production'
			? 'https://quiz-app-034k.onrender.com/api'
			: 'http://localhost:5000/api',
};
