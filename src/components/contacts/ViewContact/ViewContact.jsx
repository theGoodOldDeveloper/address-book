import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactService } from '../../../services/ContactService'
import Spinner from "../../Spinner/Spinner";
//[x] - ViewContact OK 
let ViewContact = () => {

    let { contactId } = useParams()

    let [state, setState] = useState({
        loading: false,
        contact: {},
        errorMessage: '',
        group: {}
    })

    useEffect(() => {
        try {
            fetchData()
            async function fetchData() {
                setState({ ...state, loading: true })
                let response = await ContactService.getContact(contactId)
                let groupResponse = await ContactService.getGroup(response.data)
                //console.log(response.data[0])
                //console.log(groupResponse.data[0])
                setState({
                    ...state,
                    loading: false,
                    contact: response.data[0],
                    group: groupResponse.data[0]
                })
                //console.log(response.data[0])
            }
        } catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            })
        }
    }, [contactId])

    let { loading, contact, errorMessage, group } = state

    return (
        <React.Fragment>
            <section className="view-contact-intro p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-warning fw-bold">
                                View Contact
                            </p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit rem, culpa eos laudantium commodi fuga a nisi eaque et dicta sequi aliquam enim natus reiciendis doloribus! Aut atque recusandae dolore.</p>
                        </div>
                    </div>
                </div>
            </section>

            {
                loading ? <Spinner /> : <React.Fragment>
                    {
                        Object.keys(contact).length > 0 && Object.keys(group).length > 0 &&
                        <section className="view-contact mt-3">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-md-4">
                                        <img src={contact.photo} alt="" className="img-fluid contact-img" />
                                    </div>
                                    <div className="col-md-8">
                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-action">
                                                Name: <span className="fw-bold">{contact.name}</span>

                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Mobile: <span className="fw-bold">{contact.mobile}</span>

                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                E-mail: <span className="fw-bold">{contact.email}</span>

                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Campany: <span className="fw-bold">{contact.company}</span>

                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Title: <span className="fw-bold">{contact.title}</span>

                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Group: <span className="fw-bold">{group.name}</span>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Link to={'/contacts/list'} className='btn btn-warning'>Back</Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    }
                </React.Fragment>
            }
        </React.Fragment>
    )
}
export default ViewContact
const mainImage = "https://lh3.googleusercontent.com/H-56aY-FciIxD5Ps4K0Rtypl3Pr9Bc-VvxjvN7p1HP9xoQAr495XsEQmyKmq543WICGrsvE_M31C0O7CMyy6JvVsWUyXm7Ho5B9QzkdNHvFNy5fpphBrgZsUMAh0Juls5TBDAiH6adKyvZol-UC_9fbXrlVTemegQWBcjl71qj-RxH8DL1pz2j_aD4UuytF1LTZmz94OZ01JdBFv8-PMdmZsa4uY9dbkvHk8ZQ_V85vLWg9zqS8BfG8yOQROuOwdL71Hy_8IzgVOsrtGNxeOsBO95L0hDoHT88pMZb4bAnr1jAeKoGgxnvxZwucoubdS5gMBVSJpHvEcWYs66K4pkrEboTvlzVBwJ2quqkUpNqnUWDlrnEJHHENiX6d9e8VSRfYXOzNZhSJ2X-Rbf3f2njRwND62yO-EIlUucnePFFlyAOiNLL8WY0sDJK5hdCWxYRLzCwoNMKqj180OnMhk4nRWLRCQNjmGtioNiRqMsR0_v8wY3iEeruV6JFbnGtX6S88dv6331GoEHh6VtwwsgelIwZ2EsffRIV-cUn1v_7jsEtgr307-394MpMqk8DhVFtlxCTrkNXEcapgIX4c7GknbFiYRpS3E6ndp0UOM07KpdCkbCtWALUaGS1oSxar-cBiYFEw0WxLXhs9C7YHaOe7zGsqCAnwbcMaen0Sq68FhaRexVMYZyavdhhSs-Ux2rF3mvgwtNkLdZXFbBBkL8UkbUlFte21QPTzvsTurvSksA2sgFnH3ii-RdON00V4h56vhHvlJ4nlyK1r04WDVPFaAg-U6N92cKGtUDOs82ARiS3r0IBOtfwpGyNR1NSkAEspkZYqouOnYVJZbjkDqM5ftwlLQN8E02rDzkrqbaHCy-q2GsN5N2N6PXF0PIPsRP8K2TaKSB917Dj-3UNx3nXMQJa896HFp1f8VZPw1gledYsm6HgP0EjA-yWYqq6YiStx75P-doSK_FJ4b=s220-no?authuser=0"