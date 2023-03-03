import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import 'bootstrap/dist/css/bootstrap.min.css';
//[x] - AddContact OK 
let AddContact = () => {

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
            groupId: '',
            htmlbase64: ''
        },
        groups: [],
        errorMessage: ''
    })

    let updateInput = (event) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        })
    }
    //NOTE - start new code
    var srcData = ''
    let updateInputBase64 = (event) => {
        const selectedfile = event.target.files;
        if (selectedfile.length > 0) {
            const [imageFile] = selectedfile;
            const fileReader = new FileReader();
            //console.log(selectedfile)
            //console.log('file size: ', selectedfile[0].size);
            if (selectedfile[0].size > 500000) {
                alert('Please choose a file size smaller than 500 KB ...')
            } else {
                fileReader.onload = () => {
                    srcData = fileReader.result;
                    //INFO console.log('base64:', srcData)
                    setState({
                        ...state,
                        contact: {
                            ...state.contact,
                            photo: srcData,
                            [event.target.name]: event.target.value
                        }
                    })
                };
                fileReader.readAsDataURL(imageFile);
            }
        }
        //console.log(event.target.value)
        //NOTE - end new code

        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        })
    }

    useEffect(() => {
        try {
            fetchData()
            async function fetchData() {
                setState({ ...state, loading: true })
                let response = await ContactService.getGroups()
                setState({
                    ...state,
                    loading: false,
                    groups: response.data
                })
            }
        } catch (error) {

        }
    }, [])

    let submitForm = async (event) => {
        event.preventDefault()
        try {
            let response = await ContactService.createContact(state.contact)
            //navigate("/contacts/list")
            if (response) {
                //console.log('eljutsz te ide', response)
                navigate('/contacts/list', { replace: true })
                //console.log('eljutsz te ide', response)
            }
        } catch (error) {
            setState({ ...state, errorMessage: error.message })
            navigate('/contacts/add', { replace: false })
        }
    }

    /* let submitForm = (event) => {
        event.preventDefault()
        try {
            fetchData()
            async function fetchData() {
                let response = await ContactService.createContact(state.contact)
                if (response) {
                    navigate('/contacts/list', { replace: true })
                    console.log('eljutsz te ide', response)
                }
            }
        } catch (error) {
            setState({ ...state, errorMessage: error.message })
            navigate('/contacts/list', { replace: false })
        }
    } */

    let { loading, contact, groups, errorMessage } = state

    return (
        <React.Fragment>
            <section className="add-contact p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h4 text-success fw-bold">Create Contact</p>
                            <p className="fst-italic">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur, quae id fuga nulla facere laborum sequi deleniti. Doloribus nostrum officiis praesentium voluptatibus dolor, hic quo tempore esse optio et ipsam.</p>
                        </div>
                    </div>
                    <div className="row">
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
                                {/* NOTE start fileInput */}
                                <div className="mb-2">
                                    <input
                                        //required={true}
                                        name="htmlbase64"
                                        value={contact.htmlbase64}
                                        onChange={updateInputBase64}
                                        type="file" accept="image/*" className="form-control btn btn-info" placeholder="Photo Url" />
                                </div>
                                {/* NOTE end fileInput */}
                                <div className="mb-2">
                                    <input
                                        //required={true}
                                        disabled={true}
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
                                        type="text" className="form-control" placeholder="Campany" />
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
                                            groups.map(group => {
                                                return (
                                                    <option key={group.id} value={group.id}>
                                                        {group.name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-2 ">
                                    <input type="submit" className="btn btn-success" value='Create' />
                                    <Link to={'/contacts/list'} className='btn btn-danger ms-2'>
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default AddContact