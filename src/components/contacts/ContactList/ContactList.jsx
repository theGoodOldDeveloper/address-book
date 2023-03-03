import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from '../../../services/ContactService'
import Spinner from "../../Spinner/Spinner";
//[x] - ContactList OK 
let ContactList = () => {

    let [query, setQuery] = useState({
        text: ''
    })

    let [state, setState] = useState({
        loading: false,
        contacts: [],
        filteredContacts: [],
        errorMessage: ''
    })

    useEffect(() => {
        try {
            fetchData()
            async function fetchData() {
                setState({ ...state, loading: true })
                let response = await ContactService.getAllContacts()
                setState({
                    ...state,
                    loading: false,
                    contacts: response.data,
                    filteredContacts: response.data
                })
                //console.log(response.data)
            }
        } catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            })
        }
    }, [])

    //delete contact
    let clickDelete = async (contactId) => {
        try {
            let response = await ContactService.deleteContact(contactId)
            if (response) {
                fetchData()
                async function fetchData() {
                    setState({ ...state, loading: true })
                    let response = await ContactService.getAllContacts()
                    setState({
                        ...state,
                        loading: false,
                        contacts: response.data,
                        filteredContacts: response.data
                    })
                    //console.log(response.data)
                }
            }
        } catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            })
        }
    }

    let searchContacts = (event) => {
        setQuery({ ...query, text: event.target.value })
        let theContacts = state.contacts.filter(contact => {
            return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setState({
            ...state,
            filteredContacts: theContacts
        })
    }

    let { loading, contacts, filteredContacts, errorMessage } = state

    return (
        <React.Fragment>
            <section className="contact-search p-3">
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className="h3 fw-bold">Address Book
                                    <Link to={'/contacts/add'} className={'btn btn-primary ms-2'}>
                                        <i className="fa fa-user-plus me-2"></i>
                                        New</Link>
                                </p>
                                <p className="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa non aliquam quae aspernatur, tempore sed. Vero similique consectetur est quaerat asperiores inventore illum perferendis eveniet, fugiat quo repellat alias quis.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <form className="row">
                                    <div className="col">
                                        <div className="mb-2">
                                            <input
                                                name='text'
                                                value={query.text}
                                                onChange={searchContacts}
                                                type={'text'} className='form-control' placeholder="Search Names" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-2">
                                            <input type={'submit'} className='btn btn-outline-primary' value='Search' />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {
                loading ? <Spinner /> : <React.Fragment>
                    <section className="contact-list">
                        <div className="container">
                            <div className="row">
                                {
                                    filteredContacts.length > 0 &&
                                    filteredContacts.map(contact => {
                                        return (
                                            <div className="col-md-6" key={contact.id}>
                                                <div className="card my-2">
                                                    <div className="card-body">
                                                        <div className="row align-items-center d-flex justify-content-around">
                                                            <div className="col-md-4">
                                                                <img src={contact.photo} alt="" className="img-fluid contact-img" />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <ul className="list-group">
                                                                    <li className="list-group-item list-group-item-action">
                                                                        Name: <span className="fw-bold">{contact.name}</span>

                                                                    </li>
                                                                    <li className="list-group-item list-group-item-action">
                                                                        Mobile: <span className="fw-bold">{contact.mobile}</span>

                                                                    </li>
                                                                    <li className="list-group-item list-group-item-action">
                                                                        E-mail: <span className="fw-bold">{
                                                                            contact.email
                                                                        }</span>

                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-md-2 d-flex flex-column align-items-center">
                                                                <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning my-1">
                                                                    <i className="fa-solid fa-face-smile-beam"></i>
                                                                </Link>
                                                                <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-1">
                                                                    <i className="fa fa-pen"></i>
                                                                </Link>
                                                                <button className="btn btn-danger my-1" onClick={() => clickDelete(contact.id)}>
                                                                    <i className="fa fa-trash"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        </div>
                    </section>
                </React.Fragment>

            }

        </React.Fragment >
    )
}
export default ContactList

/* const mainImage = "https://lh3.googleusercontent.com/H-56aY-FciIxD5Ps4K0Rtypl3Pr9Bc-VvxjvN7p1HP9xoQAr495XsEQmyKmq543WICGrsvE_M31C0O7CMyy6JvVsWUyXm7Ho5B9QzkdNHvFNy5fpphBrgZsUMAh0Juls5TBDAiH6adKyvZol-UC_9fbXrlVTemegQWBcjl71qj-RxH8DL1pz2j_aD4UuytF1LTZmz94OZ01JdBFv8-PMdmZsa4uY9dbkvHk8ZQ_V85vLWg9zqS8BfG8yOQROuOwdL71Hy_8IzgVOsrtGNxeOsBO95L0hDoHT88pMZb4bAnr1jAeKoGgxnvxZwucoubdS5gMBVSJpHvEcWYs66K4pkrEboTvlzVBwJ2quqkUpNqnUWDlrnEJHHENiX6d9e8VSRfYXOzNZhSJ2X-Rbf3f2njRwND62yO-EIlUucnePFFlyAOiNLL8WY0sDJK5hdCWxYRLzCwoNMKqj180OnMhk4nRWLRCQNjmGtioNiRqMsR0_v8wY3iEeruV6JFbnGtX6S88dv6331GoEHh6VtwwsgelIwZ2EsffRIV-cUn1v_7jsEtgr307-394MpMqk8DhVFtlxCTrkNXEcapgIX4c7GknbFiYRpS3E6ndp0UOM07KpdCkbCtWALUaGS1oSxar-cBiYFEw0WxLXhs9C7YHaOe7zGsqCAnwbcMaen0Sq68FhaRexVMYZyavdhhSs-Ux2rF3mvgwtNkLdZXFbBBkL8UkbUlFte21QPTzvsTurvSksA2sgFnH3ii-RdON00V4h56vhHvlJ4nlyK1r04WDVPFaAg-U6N92cKGtUDOs82ARiS3r0IBOtfwpGyNR1NSkAEspkZYqouOnYVJZbjkDqM5ftwlLQN8E02rDzkrqbaHCy-q2GsN5N2N6PXF0PIPsRP8K2TaKSB917Dj-3UNx3nXMQJa896HFp1f8VZPw1gledYsm6HgP0EjA-yWYqq6YiStx75P-doSK_FJ4b=s220-no?authuser=0"
 */

//INFO:TODO:INFO: bad: async not is useEffect(NOT) {THIS IS}
/* useEffect(async () => {
        try {
            let response = await ContactService.getAllContacts()
            console.log(response.data)
        } catch (error) {

        }
    }, []) */

/* <pre>{JSON.stringify(contacts)}</pre> */