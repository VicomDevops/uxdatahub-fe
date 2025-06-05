import React from "react";
import {
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    Col,
} from "reactstrap";
import Table from "../common/table/table";
import scenarioServices from '../../services/scenarioServices'
import { toast } from 'react-toastify';
import Add from "../../assets/addBtn.svg"



const VisualiserPopup = ({open,toggle, data, scenarios, type,onGetPanels, onGetScenarios}) => {

    const columns = [
        { title: "Nom", field: 'name' },
        { title: "Prenom", field: 'lastname' },
        { title: "Email", field: 'email' },
    ]

    const columnsScenar = [
        { 
            title: "Date", field: 'createdAt', 
            DateSort: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            render: rowData => <span className={rowData.etat === 2 && 'bold'} >{rowData.createdAt}</span> 
        },
        { 
            title: "Nom de scénario", field: 'title', render: rowData => <span className={rowData.etat === 2 && 'bold'} >{rowData.title}</span> 
        },
        {
            title: "Etat", field: 'etat', 
            render: rowData => 
                <span className={rowData.etat === 2 && 'bold'}>
                {
                    (rowData.etat === 0) ? "A compléter" : 
                        <span className={rowData.etat === 2 && 'bold'} >
                            {rowData.etat === 1 ? "A associer" : 
                            <span className={rowData.etat === 2 && 'bold'} >
                                {rowData.etat === 2 ? "A lancer" : "En cours"}
                            </span>
                            }
                        </span>
                }
                </span>
        },
    ]

    const action = [
        {
            icon: () => <img style={{ marginLeft: '.5em', width: '15px' }} src={Add} alt="" />,
            tooltip: 'Associer le panel',
            onClick: (event, rowData) => handleSave(rowData.id)
        },
    ]



    const handleSave = async (id) => {
        scenarioServices.savePanelExistant(id, data.id).then(res => {
            if (res.header.code !== 200){
                toast.error(res?.header?.message)
            }else{
                toast.success(res?.response)
                onGetPanels()
                onGetScenarios()
                toggle()
            }
        }).catch(err => {
            console.log(err);
            toast.error('Erreur lors de l\'association du panel')
        })
    }


    
    return (
    <Modal isOpen={open} toggle={toggle} className="pt-5 modal-xl border-radius-20 justify-content-center align-items-center">
    <Row className="padding-modal">
        <Col md="12" sm="12" lg="12" className="p-2">
            <ModalHeader toggle={toggle} charCode="x">
                <h3>
                    {
                        type === "Détails" ? 
                            "Détails du panel"
                            :
                            "Associer un scénario"
                    }
                </h3>
            </ModalHeader>
        </Col>
    </Row>
        <ModalBody>
            <Row>
                <Col md='12'>
                    <div className="visPanel">
                        <div>Nom du panel <strong>{data?.name},</strong></div>
                        <div>Nombre de testeurs <strong>{data?.testersNb},</strong></div>
                        {
                            data?.scenarioName ? (
                            <div>Scénario associé  <strong>{data?.scenarioName.join(', ')}</strong></div>
                            ) : (
                            <div style={{ color: "orange" }}>Ce panel n'a pas de scénario associé</div>
                            )
                        }
                    </div>
                    {
                        type === "Détails" ?
                        (
                            <Table
                                className="table table-striped table-bordered"
                                title='Liste des testeurs'
                                columns={columns}
                                data={data?.clientTesters}
                            />
                        ) 
                        :
                        (
                            <Table
                                className="table table-striped table-bordered"
                                title='Liste des scénarios associés'
                                columns={columnsScenar}
                                data={scenarios}
                                actions={action}
                            />
                        )
                    }
                </Col>
            </Row>
        </ModalBody>
    </Modal>
    );
};

export default VisualiserPopup;

