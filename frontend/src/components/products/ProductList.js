import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import happyIcon from "../../images/happy.jpg";
import normalIcon from "../../images/normal.jpg";
import sadIcon from "../../images/sad.jpg";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
const { SearchBar } = Search;


const axios = require('axios');


const DataTable = (props) => {
    const [products, setProducts] = useState([]);

    const getProductData = async () => {
        try {
            const response = await axios.get('/product');
            console.log(response.data);
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const formatImage = (cell, row, rowIndex, formatExtraData) => {
      return <img src={cell} width="50px" style={{maxHeight: '50px'}} />;
    };

    const formatText = (cell, row, rowIndex, formatExtraData) => {
      if (cell.length > 50) {
        return cell.substring(0, 50) + '...';
      }
      return cell;
    };

    const formatCurrency = (cell, row, rowIndex, formatExtraData) => {
      return "Rs. "+cell+".00";
    };

    const csatIcon = (cell, row, rowIndex, formatExtraData) => {
        console.log(cell);
        var icon = (cell<1.67)?sadIcon:(cell<3.34)?normalIcon:happyIcon; 
        return (
          <img src={icon} alt={cell} title={"CSAT: "+cell} height="40px" />
        );
    };

    const formatDate = (cell, row, rowIndex, formatExtraData) => {
        var date = (cell==null)? "No Purchase" : cell.split(" ").slice(0,4).join(" ");
        return (date);
    };
    
    const viewButton = (cell, row, rowIndex, formatExtraData) => {
        let link = "/product/view/"+row.pid;
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
          <Button onClick={()=>props.handleAlert(row.pid)} variant="danger" >
            Delete
          </Button>
        );
    };
    

    const columns = [{
        dataField: 'image',
        text: 'Image',
        formatter: formatImage
      },{
        dataField: 'name',
        text: 'Name',
        formatter: formatText
      }, {
        dataField: 'price',
        text: 'Price',
        formatter: formatCurrency
      }, {
        dataField: 'csat',
        text: 'Sentiment',
        formatter: csatIcon
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
          getProductData();
      }, [])

    //   return (<BootstrapTable keyField='name' data={ clients } columns={ columns } pagination={ paginationFactory()} />);

      return (
        <>
        <ToolkitProvider
            keyField="name"
            data={ products }
            columns={ columns }
            pagination={ paginationFactory()}
            search
        >
            {
            props => (
                <div>
                    <hr />
                <SearchBar { ...props.searchProps } />
                <Button href="/product/create" className="float-right" variant="success">Add New</Button>
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