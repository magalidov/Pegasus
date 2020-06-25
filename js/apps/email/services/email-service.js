import { Utils } from '../../../services/utils.service.js';

const STORE_KEY = 'pegasusMails';
const gFakeEmails = [
	{
		subject: 'Thank You',
		from: 'Yael@gmail.com',
		body:
			`There’s an art to writing a thank-you letter. It goes beyond saying, “Thanks for _____. I really appreciate it.” We’ll show you some thank-you letter examples and templates that will help you express your gratitude in style.<br><img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.winwood-outdoor.co.uk%2Facatalog%2Fduck_small.jpg&f=1&nofb=1"/>`,
		tags: { isRead: false, isStared: false },
		sentAt: 1551133930594,
		id: null,
	},
	{
		subject: 'A Winner',
		from: 'lotto@gmail.com',
		body: 'YOU\'VE JUST HIT IT BIG...REAL BIG Now What?',
		tags: { isRead: false, isStared: false },
		sentAt: 1551133930594,
		id: null,
	},
	{
		subject: 'Your Reservation',
		from: 'MoonRestaurant@gmail.com',
		body: `At most full service restaurants, your customers usually have two options: make a reservation to secure a spot in advance or show up in hopes they’ll snag an open table. For restaurant owners and managers, managing the mix between reservations and walk-ins can be challenging. `,
		tags: { isRead: false, isStared: false },
		sentAt: 1551133930594,
		id: null,
	},
	{
		subject: 'How Are You',
		from: 'SecretLover@gmail.com',
		body: 'Hello love ,I loved you even before I met you in person. Once I laid eyes on you, that love grew by infinite measure.',
		tags: { isRead: false, isStared: false },
		sentAt: 1551133930594,
		id: null,
	},
	{
		subject: 'How Are You',
		from: 'SecretLover@gmail.com',
		body: 'Hello love ,I loved you even before I met you in person. Once I laid eyes on you, that love grew by infinite measure.',
		tags: { isRead: false, isStared: false },
		sentAt: 1551133930594,
		id: null,
	},
	{
		subject: 'How Are You',
		from: 'SecretLover@gmail.com',
		body: 'Hello love ,I loved you even before I met you in person. Once I laid eyes on you, that love grew by infinite measure.',
		tags: { isRead: false, isStared: false },
		sentAt: 1551133930594,
		id: null,
	},
	{
		subject: 'How Are You',
		from: 'SecretLover@gmail.com',
		body: 'Hello love ,I loved you even before I met you in person. Once I laid eyes on you, that love grew by infinite measure.',
		tags: { isRead: false, isStared: false },
		sentAt: 1551133930594,
		id: null,
	},
	{
		subject: 'How Are You',
		from: 'SecretLover@gmail.com',
		body: 'Hello love ,I loved you even before I met you in person. Once I laid eyes on you, that love grew by infinite measure.',
		tags: { isRead: false, isStared: false },
		sentAt: 1551133930594,
		id: null,
	},
	{
		subject: 'How Are You',
		from: 'SecretLover@gmail.com',
		body: 'Hello love ,I loved you even before I met you in person. Once I laid eyes on you, that love grew by infinite measure.',
		tags: { isRead: false, isStared: false },
		sentAt: 1551133930594,
		id: null,
	},
	{
		subject: 'How Are You',
		from: 'SecretLover@gmail.com',
		body: 'Hello love ,I loved you even before I met you in person. Once I laid eyes on you, that love grew by infinite measure.',
		tags: { isRead: false, isStared: false },
		sentAt: 1551133930594,
		id: null,
	},
];
let gEmails = null;

export const emailService = {
    getEmails,
	updateEmail,
	deleteEmails,
	updateEmails,
	getById,
	// saveReview: saveReview,
	// removeReview: removeReview
};
function getEmails() {
	gEmails = Utils.loadFromStorage(STORE_KEY);
	gEmails = !gEmails ? addIdTo(gFakeEmails.slice()) : gEmails;
	Utils.storeToStorage(STORE_KEY, gEmails);
	return Promise.resolve(gEmails);
}
function addIdTo(fakeMails) {
	return fakeMails.map((mail) => {
		let mailWithId = { ...mail };
		mailWithId.id = Utils.getRandomId();
		return mailWithId;
	});
}
function getById(emailId) {
	if (!gEmails) getEmails()
	const email = gEmails.find(email => email.id === emailId)
	return Promise.resolve(email)
}
// function saveReview(reviewInput,emailId){
// 	let email = gEmails.find(email => email.id === emailId)
// 	email.reviews = (email.reviews)? email.reviews : []
// 	email.reviews.push(reviewInput)
// 	Utils.storeToStorage(STORE_KEY,gEmails)
// }
// function removeReview(idx,emailId){
// 	let email = gEmails.find(email => email.id === emailId)
// 	email.reviews.splice(idx,1)
// }
function findIndexById(id){
return gEmails.findIndex((email) => email.id === id)
}
function updateEmail(updatedEmail) {
	const idx = findIndexById(updatedEmail.id);
	gEmails.splice(idx, 1, updatedEmail);
	Utils.storeToStorage(STORE_KEY, gEmails);
}

// Multiple
function updateEmails(tag, state, checkedEmails) {
	checkedEmails.forEach((checkedMail) => {
		const idx = findIndexById(checkedMail.id)
		gEmails[idx].tags[tag] = state;
	});
}
function deleteEmails(checkedEmails) {
	checkedEmails.forEach((checkedMail) => {
		const idx = findIndexById(checkedMail.id)
		gEmails.splice(idx, 1);
	});
	Utils.storeToStorage(STORE_KEY, gEmails);
}

