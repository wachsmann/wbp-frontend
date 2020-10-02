
import React, { useState } from 'react';
import {Col, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import { CSVReader } from 'react-papaparse'
import { Grid, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl, withStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
export default function ProcessorDataTabs(props) {
  const { handleOnDrop,handleChangeImportType,importType,generalRadius } = props
  const [activeTab, setActiveTab] = useState("1")
  const toggle = (tab) => { if (activeTab !== tab) { setActiveTab(tab) } }

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  const handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }
  const GreenRadio = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);
  return (
    <div className="tabs">
      <div className="tabs__wrap">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                toggle('1');
              }}
            >CSV</NavLink>
          </NavItem>
        


        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane style={{ padding: 59 }} tabId="1">
           
            <CSVReader
              onDrop={(data)=>{
                
                handleOnDrop(data,generalRadius)
              }}
              onError={handleOnError}
              style={{
                dropArea: {
                  padding: "30px 10px 30px 10px",
                  width: "50%",
                  margin:"auto",
                  borderRadius:0
                },
                dropFile:{
                 
                  borderRadius:0
                 
                },
              }}
              config={{
                header: true,
                skipEmptyLines: true,
                fastMode: true,
                encoding: "utf-8",
                delimitersToGuess: [',', ';']
              }}
              addRemoveButton
              onRemoveFile={handleOnRemoveFile}
            >
              <span>Arraste arquivos CSV aqui ou clique para enviar.</span>
            </CSVReader>
          </TabPane>

        </TabContent>
      </div>
    </div>

  );
}



