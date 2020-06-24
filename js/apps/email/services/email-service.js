import { Utils } from '../../../services/utils.service.js';

const STORE_KEY ='pegasusMails'
const gFakeEmails = [
    {subject: 'Wassap?',from: 'magalidov@gmail.com', body: 'Pick up!Pick up!Pick up!Pick up!Pick up!Pick up!Pick up!Pick up!Pick up!Pick up!Pick up!Pick up!Pick up!Pick up!Pick up!Pick up!Pick up!Pick up!Pick up!Pick up!Pick up!Pick up!Pick up!', tags:{isRead: false, isStared:false}, sentAt : 1551133930594, id:null},
    {subject: 'Wassap?',from: 'magalidov@gmail.com', body: 'Pick up!', tags:{isRead: false, isStared:false}, sentAt : 1551133930594, id:null},
    {subject: 'Wassap?',from: 'magalidov@gmail.com', body: 'Pick up!', tags:{isRead: false, isStared:false}, sentAt : 1551133930594, id:null},
    {subject: 'Wassap?',from: 'magalidov@gmail.com', body: 'Pick up!', tags:{isRead: false, isStared:false}, sentAt : 1551133930594, id:null},
]
let gEmails= null

export const emailService = {
    loadEmails,
    updateEmail,
    deleteEmails,
	// getById: getById,
	// saveReview: saveReview,
	// removeReview: removeReview
};

function loadEmails() {
	gEmails = Utils.loadFromStorage(STORE_KEY)
	gEmails = (!gEmails) ? addIdTo(gFakeEmails.slice()) : gEmails
	Utils.storeToStorage(STORE_KEY,gEmails)
	return Promise.resolve(gEmails);
}
// function getById(emailId) {
// 	if (!gEmails) getEmails()
// 	const email = gEmails.find(email => email.id === emailId)
// 	return Promise.resolve(email)
// }
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
function addIdTo(fakeMails){
    return fakeMails.map(mail=> {
        let mailWithId = {...mail}
        mailWithId.id = Utils.getRandomId()
        return  mailWithId })
}

function updateEmail(updatedMail){
    const idx = gEmails.findIndex(email=> email.id === updatedMail.id)
    gEmails.splice(idx,1,updatedMail)
    Utils.storeToStorage(STORE_KEY,gEmails)
}

function deleteEmails(checkedEmails){
    checkedEmails.forEach(checkedMail=>{
        const idx = gEmails.findIndex(email=> email.id === checkedMail.id)
        gEmails.splice(idx,1)
    })
    Utils.storeToStorage(STORE_KEY,gEmails)
}