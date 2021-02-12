import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Cmoji from '../utils/csatEmoji';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
const { SearchBar } = Search;


const axios = require('axios');


const DataTable = (props) => {
    const [clients, setClients] = useState([]);
    

    const getClientData = async () => {
        try {
            const response = await axios.get('/client');
            console.log(response.data);
            setClients(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const csatIcon = (cell, row, rowIndex, formatExtraData) => {
        return (<Cmoji value={cell} />);
    };

    const formatDate = (cell, row, rowIndex, formatExtraData) => {
        console.log(cell);
        var date = (cell==null)? "No Purchase" : cell.split(" ").slice(0,4).join(" ");
        return (date);
    };
    
    const viewButton = (cell, row, rowIndex, formatExtraData) => {
        let link = "/client/view/"+row.cid;
        console.log(row);
        return (
          <Button href={link} variant="primary" >
            View
          </Button>
        );
    };

    const editButton = (cell, row, rowIndex, formatExtraData) => {
        let link = "/client/edit/"+row.cid;
        console.log(row);
        return (
          <Button href={link} variant="warning" style={{color: 'white'}}>
            Edit
          </Button>
        );
    };

    const deleteButton = (cell, row, rowIndex, formatExtraData) => {
        let link = "/client/"+rowIndex;
        console.log(row);
        return (
          <Button onClick={()=>props.handleAlert(row.cid)} variant="danger" >
            Delete
          </Button>
        );
    };
    

    const columns = [{
        dataField: 'name',
        text: 'Name'
      }, {
        dataField: 'city',
        text: 'Location'
      }, {
        dataField: 'csat',
        text: 'Sentiment',
        formatter: csatIcon
      }, {
        dataField: 'lp',
        text: 'Last Purchased',
        formatter: formatDate
      }, {
        dataField: "view",
        text: "Action",
        formatter: viewButton,
      }, {
        dataField: "edit",
        text: "Action",
        formatter: editButton,
      }, {
        dataField: "delete",
        text: "Action",
        formatter: deleteButton,
      }];

      useEffect(() => {
          getClientData();
      }, [])

    //   return (<BootstrapTable keyField='name' data={ clients } columns={ columns } pagination={ paginationFactory()} />);

      return (
        <>
        <ToolkitProvider
            keyField="name"
            data={ clients }
            columns={ columns }
            pagination={ paginationFactory()}
            search
        >
            {
            props => (
                <div>
                    <hr />
                <SearchBar { ...props.searchProps } />
                <Button href="/client/create" className="float-right" variant="success">Add New</Button>
                <BootstrapTable
                    { ...props.baseProps }
                    pagination={ paginationFactory()}/>
                </div>
            )
            }
        </ToolkitProvider>
        {alert}
        </>
      );
} 

export default DataTable;