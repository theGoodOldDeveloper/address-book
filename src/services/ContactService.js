import axios from "axios"

export class ContactService {
    //INFO - JSON-server 
    //static serverURL = 'http://localhost:9000'
    //INFO - SQLite-server 
    static serverURL = 'http://80.211.204.154:5012'
    //static serverURL = 'http://localhost:5012'

    static getGroups() {
        let dataURL = `${this.serverURL}/groups`
        //console.log(dataURL)
        return axios.get(dataURL)
    }

    static getGroup(contact) {
        //console.log(contact)
        let groupId = contact[0].groupId
        //console.log(groupId)
        let dataURL = `${this.serverURL}/groups/${groupId}`
        //console.log(dataURL)
        return axios.get(dataURL)
    }

    static getAllContacts() {
        let dataURL = `${this.serverURL}/contacts`
        //console.log(dataURL)
        return axios.get(dataURL)
    }

    static getContact(contactId) {
        let dataURL = `${this.serverURL}/contacts/${contactId}`
        //console.log(dataURL)
        return axios.get(dataURL)
    }

    static createContact(contact) {
        let dataURL = `${this.serverURL}/createcontacts`

        //console.log(dataURL, contact)
        //console.log(contact)
        //alert('hoohahoo')
        return axios.post(dataURL, contact)
    }

    static updateContact(contact, contactId) {
        let dataURL = `${this.serverURL}/contacts/${contactId}`
        return axios.put(dataURL, contact)

    }

    static deleteContact(contactId) {
        let dataURL = `${this.serverURL}/contacts/${contactId}`
        return axios.delete(dataURL)
    }
}