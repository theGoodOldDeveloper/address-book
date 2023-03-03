import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

/* const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    display: 'flex',
  }; */

let EditContact = () => {

    let { contactId } = useParams()
    let navigate = useNavigate()

    let [state, setState] = useState({
        loading: false,
        contact: {
            name: '',
            photo: '',
            mobile: '',
            email: '',
            company: '',
            title: '',
            groupId: ''
        },
        groups: [],
        errorMessage: ''
    })

    useEffect(() => {
        try {
            async function fetchData() {
                setState({ ...state, loading: true })
                let response = await ContactService.getContact(contactId)
                let groupResponse = await ContactService.getGroups()
                //console.log('response:', response.data[0])
                //console.log('groupResponse:', groupResponse)
                setState({
                    ...state, loading: false,
                    contact: response.data[0],
                    groups: groupResponse.data
                })
            }
            fetchData();
        } catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            })
        }
    }, [contactId])

    let updateInput = (event) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        })
    }

    let submitForm = async (event) => {
        event.preventDefault()
        try {
            let response = await ContactService.updateContact(state.contact, contactId)
            //NOTE - navigate("/contacts/list")
            //console.log('eljutsz te ide', response.data)
            //INFO - alert('naMiAHelyzet')
            if (response) {
                //console.log('eljutsz te ide', response)
                navigate('/contacts/list', { replace: true })
                //console.log('eljutsz te ide *****', response.data.name)
                //INFO - alert('naMiAHelyzet ****')
            }
        } catch (error) {
            setState({ ...state, errorMessage: error.message })
            navigate(`/contacts/edit/${contactId}`, { replace: false })
        }
    }

    let { loading, contact, groups, errorMessage } = state

    return (
        <React.Fragment>
            {
                loading ? <Spinner /> : <React.Fragment>
                    <section className="add-contact p-3">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <p className="h4 text-primary fw-bold">Edit Contact</p>
                                    <p className="fst-italic">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur, quae id fuga nulla facere laborum sequi deleniti. Doloribus nostrum officiis praesentium voluptatibus dolor, hic quo tempore esse optio et ipsam.</p>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <form onSubmit={submitForm}>
                                        <div className="mb-2">
                                            <input
                                                required={true}
                                                name="name"
                                                value={contact.name}
                                                onChange={updateInput}
                                                type="text" className="form-control" placeholder="Name" />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                disabled={true}
                                                //required={true}
                                                name="photo"
                                                value={contact.photo}
                                                onChange={updateInput}
                                                type="text" className="form-control" placeholder="Photo Url" />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                required={true}
                                                name="mobile"
                                                value={contact.mobile}
                                                onChange={updateInput}
                                                type="number" className="form-control" placeholder="Mobile" />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                required={true}
                                                name="email"
                                                value={contact.email}
                                                onChange={updateInput}
                                                type="email" className="form-control" placeholder="E-mail" />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                required={true}
                                                name="company"
                                                value={contact.company}
                                                onChange={updateInput}
                                                type="text" className="form-control" placeholder="Company" />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                required={true}
                                                name="title"
                                                value={contact.title}
                                                onChange={updateInput}
                                                type="text" className="form-control" placeholder="Title" />
                                        </div>
                                        <div className="mb-2">
                                            <select
                                                required={true}
                                                name="groupId"
                                                value={contact.groupId}
                                                onChange={updateInput}
                                                className="form-control">
                                                <option value="">Select a Group</option>
                                                {
                                                    groups.length > 0 &&
                                                    groups.map(
                                                        group => {
                                                            return (
                                                                <option key={group.id} value={group.id}>{group.name}</option>
                                                            )
                                                        }
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-2 ">
                                            <input type="submit" className="btn btn-primary" value='Update' />
                                            <Link to={'/contacts/list'} className='btn btn-danger ms-2'>
                                                Cancel
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-6">
                                    <img src={contact.photo} alt="" className="img-fluid contact-img" />

                                </div>

                            </div>
                        </div>
                    </section>
                </React.Fragment>

            }

        </React.Fragment>
    )
}
export default EditContact
const mainImage = "https://lh3.googleusercontent.com/H-56aY-FciIxD5Ps4K0Rtypl3Pr9Bc-VvxjvN7p1HP9xoQAr495XsEQmyKmq543WICGrsvE_M31C0O7CMyy6JvVsWUyXm7Ho5B9QzkdNHvFNy5fpphBrgZsUMAh0Juls5TBDAiH6adKyvZol-UC_9fbXrlVTemegQWBcjl71qj-RxH8DL1pz2j_aD4UuytF1LTZmz94OZ01JdBFv8-PMdmZsa4uY9dbkvHk8ZQ_V85vLWg9zqS8BfG8yOQROuOwdL71Hy_8IzgVOsrtGNxeOsBO95L0hDoHT88pMZb4bAnr1jAeKoGgxnvxZwucoubdS5gMBVSJpHvEcWYs66K4pkrEboTvlzVBwJ2quqkUpNqnUWDlrnEJHHENiX6d9e8VSRfYXOzNZhSJ2X-Rbf3f2njRwND62yO-EIlUucnePFFlyAOiNLL8WY0sDJK5hdCWxYRLzCwoNMKqj180OnMhk4nRWLRCQNjmGtioNiRqMsR0_v8wY3iEeruV6JFbnGtX6S88dv6331GoEHh6VtwwsgelIwZ2EsffRIV-cUn1v_7jsEtgr307-394MpMqk8DhVFtlxCTrkNXEcapgIX4c7GknbFiYRpS3E6ndp0UOM07KpdCkbCtWALUaGS1oSxar-cBiYFEw0WxLXhs9C7YHaOe7zGsqCAnwbcMaen0Sq68FhaRexVMYZyavdhhSs-Ux2rF3mvgwtNkLdZXFbBBkL8UkbUlFte21QPTzvsTurvSksA2sgFnH3ii-RdON00V4h56vhHvlJ4nlyK1r04WDVPFaAg-U6N92cKGtUDOs82ARiS3r0IBOtfwpGyNR1NSkAEspkZYqouOnYVJZbjkDqM5ftwlLQN8E02rDzkrqbaHCy-q2GsN5N2N6PXF0PIPsRP8K2TaKSB917Dj-3UNx3nXMQJa896HFp1f8VZPw1gledYsm6HgP0EjA-yWYqq6YiStx75P-doSK_FJ4b=s220-no?authuser=0"