import emailList from './apps/email/pages/email-list.cmp.js';
import emailDetails from './apps/email/pages/email-details.cmp.js';
import homePage from './pages/pegasus-home.cmp.js';
import emailApp from './apps/email/pages/email-app.cmp.js';
import notesApp from './apps/notes/pages/notes-app.cmp.js';
import about from './pages/about-page.cmp.js';


const myRoutes = [
	{
		path: '/',
		component: homePage,
	},
	{
		path: '/email',
		component: emailApp,
		children: [
			{
                path: '/',
                component: emailList
            },
            {
                path: 'details',
                component: emailDetails
            },
		]
	},
	{
		path: '/notes',
		component: notesApp,
	},
	{
		path: '/about',
		component: about,
	},
];

export const myRouter = new VueRouter({ routes: myRoutes });
