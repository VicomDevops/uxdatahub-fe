import React, { useState } from 'react';
import Table from "../../common/table/table";
import Edit from "../../../assets/tdb/modiifier.svg";
import Delete from "../../../assets/tdb/delete.svg";
import Detacher from "../../../assets/Detacher.png";
import Replace from "../../../assets/Remplacer.png";
import DeleteTest from "../../../assets/insightdata_gestiondescomptes.svg";
import ResentCredentials from "../../../assets/replace.jpg";

const TesterTable = ({ testers, onToggleUpdateTester, onToggleDeleteTester, onToggleDetacherModal, onToggleDeleteTest, onToggleResentCredentials }) => {
    const [disabledIcons, setDisabledIcons] = useState({});

    const handleResentCredentials = (rowData) => {
        const { id } = rowData;
        onToggleResentCredentials(rowData);

        // Disable the icon
        setDisabledIcons((prev) => ({
            ...prev,
            [id]: true, // Mark the icon as disabled
        }));

        // Re-enable the icon after 10 seconds
        setTimeout(() => {
            setDisabledIcons((prev) => ({
                ...prev,
                [id]: false, // Re-enable the icon
            }));
        }, 10000); // 10 seconds in milliseconds
    };

    const columns = [
        { title: "Nom", field: 'lastname' },
        { title: "Prénom", field: 'name' },
        { title: "Email", field: 'email' },
        { title: "Test terminer", field: 'tests_passed', render: rowData => <>{rowData?.tests_passed?.length ?? "-"}</> },
        { title: "Test en attente", field: 'tests_pending', render: rowData => <>{rowData?.tests_pending?.length ?? "-"}</> },
        { title: "Notifications", field: 'notification', render: rowData => <span>{rowData?.notification ? rowData?.notification + "/5" : "-"}</span> },
    ];

    const actions = [
        rowData => ({
            icon: () => <img style={{ width: "22px", marginRight: "5px" }} className={`${rowData?.tests_passed?.length === 0 ? 'tableIcons1' : 'tableIcons1 tableIconsDisabled'}`} src={Replace} alt="UX DATAHUB icons" />,
            tooltip: 'Remplacer',
            onClick: (event, rowData) => onToggleUpdateTester(rowData, "remplace"),
            hidden: !rowData?.id,
        }),
        rowData => ({
            icon: () => <img style={{ width: "18px", marginRight: "5px" }} className={`${rowData?.tests_pending?.length !== undefined && rowData?.tests_pending?.length !== 0 && rowData?.tests_passed?.length !== 0 ? 'tableIcons1' : 'tableIcons1 tableIconsDisabled'}`} src={Detacher} alt="UX DATAHUB icons" />,
            tooltip: 'Detacher',
            onClick: (event, rowData) => onToggleDetacherModal(rowData),
            hidden: !rowData?.id,
        }),
        rowData => ({
            icon: () => <img style={{ width: "30px" }} className={`${rowData?.id ? 'tableIcons1 tableIconsDisabled' : 'tableIcons1'}`} src={Edit} alt="UX DATAHUB icons" />,
            tooltip: 'Modifier',
            onClick: (event, rowData) => onToggleUpdateTester(rowData, "update"),
            hidden: rowData?.id,
        }),
        rowData => ({
            icon: () => <img style={{ width: "30px" }} className={`${(rowData?.tests_passed?.length === 0 && rowData?.id) || (rowData?.tests_pending === undefined) ? 'tableIcons1' : 'tableIcons1 tableIconsDisabled'}`} src={Delete} alt="UX DATAHUB icons" />,
            tooltip: 'Supprimer Testeur',
            onClick: (event, rowData) => onToggleDeleteTester(rowData),
        }),
        rowData => ({
            icon: () => <img style={{ width: "30px" }} className={`${rowData?.tests_passed?.length !== 0 ? 'tableIcons1' : 'tableIcons1 tableIconsDisabled'}`} src={DeleteTest} alt="UX DATAHUB icons" />,
            tooltip: 'Supprimer Test',
            onClick: (event, rowData) => onToggleDeleteTest(rowData),
        }),
        rowData => ({
            icon: () => (
                <img
                    style={{ width: "22px", marginRight: "5px" }}
                    className={disabledIcons[rowData.id] ? 'tableIconsDisabled' : 'tableIcons1'}
                    src={ResentCredentials}
                    alt="UX DATAHUB icons"
                />
            ),
            tooltip: 'Renvoyer les informations d\'identification',
            onClick: (event, rowData) => !disabledIcons[rowData.id] && handleResentCredentials(rowData),
        })
    ];

    return (
        <Table
            title='Liste des testeurs'
            columns={columns}
            data={testers}
            actions={actions}
        />
    );
};

export default TesterTable;
