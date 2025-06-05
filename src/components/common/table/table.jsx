//REACT IMPORT
import React, { memo, useMemo } from "react";
//LIBRARY IMPORT
import { Label } from "reactstrap";
import MaterialTable from "material-table";
import PropTypes from "prop-types";
//STYLES IMPORT
import "./index.css"


//CONSTANTS
const tableLocalization = {
    body: {
        emptyDataSourceMessage: 'Aucune donnée à afficher',
    },
    pagination: {
        labelDisplayedRows: '{from}-{to} de {count}',
        labelRowsSelect: 'lignes',
        labelRowsPerPage: 'lignes par page:',
        firstAriaLabel: 'Première page',
        firstTooltip: 'Première page',
        previousAriaLabel: 'Page précédente',
        previousTooltip: 'Page précédente',
        nextAriaLabel: 'Page suivante',
        nextTooltip: 'Page suivante',
        lastAriaLabel: 'Dernière page',
        lastTooltip: 'Dernière page'
    },
}

const tablePaginationOptions = {
    sorting: true,
    actionsColumnIndex: -1,
    cellStyle: {
        lineHeight: "1",
        textAlign: "start",
        fontSize: ".9rem"
    },
    headerStyle: {
        lineHeight: "1 ",
        textAlign: "start",
        backgroundColor:"#F3FBF7",
        fontSize: ".9rem",
        fontWeight: "600",
        fontFamily:'roboto',
    },
    searchFieldStyle: {
        color: "#00a359",
        MuiInputUnderline: "none",
        marginBottom: "1.8rem",
    },
}

const tableStyle = {
    backgroundColor: "white",
    border: "none ",
    boxShadow: "none",
    borderCollapse: "separate",
    borderSpacing: "0 1rem",
    width: "100%",
}

/**
 * Renders a Material-UI table with given data, title, columns, actions, and
 * onRowClick function. The table is given a class name of "table_container" and
 * the title is wrapped in a Label with class name "table_title". The
 * localization and options are also given default values.
 *
 * @param {Object[]} data - The data to be rendered in the table.
 * @param {string} title - The title of the table.
 * @param {Object[]} columns - The column definitions.
 * @param {Object[]} actions - The actions to be rendered in the table.
 * @param {function} onRowClick - The function to be called when a row is
 *     clicked.
 * @return {JSX.Element} The rendered table component.
 */
const Table = ({ data, title, columns, actions, pageSize=5, pageSizeOptions=[5,10], onRowClick } ) => {

    //HOOKS
    const titleLabel = useMemo(() => title, [title]);

    //STATE
    tablePaginationOptions.pageSizeOptions = pageSizeOptions
    tablePaginationOptions.pageSize = pageSize


    //RENDER
    return (
        <MaterialTable
            style={tableStyle}
            title={<Label className="table_title">{titleLabel}</Label>} 
            columns={columns}
            data={data}
            actions={actions}
            localization={ tableLocalization }
            onRowClick={onRowClick ?? undefined}
            options={ tablePaginationOptions }
        />
    );
};

//PROPTYPES
Table.prototype = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    title: PropTypes.string,
    actions: PropTypes.array,
    onRowClick: PropTypes.func,
};

//EXPORT
export default memo(Table);
