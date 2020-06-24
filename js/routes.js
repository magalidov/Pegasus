import homePage from './pages/pegasus-home.cmp.js';
// import bookApp from './pages/book-app.cmp.js';
// import bookDetails from './pages/book-details.cmp.js';
// import bookEdit from './pages/book-edit.cmp.js';


const myRoutes = [
	{
		path: '/',
		component: homePage,
	},
	// {
	// 	path: '/book',
	// 	component: bookApp,
	// },
	// {
	// 	path: '/book/:bookId',
	// 	component: bookDetails,
	// },
	// {
	// 	path: '/about',
	// 	component: aboutUs,
	// },
];

export const myRouter = new VueRouter({ routes: myRoutes });
