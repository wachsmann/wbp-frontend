
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
            <Col md={12} lg={12} style={{ marginTop: "20px" }}>
              <Grid container alignItems="flex-end">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Tipo de importação</FormLabel>
                  <RadioGroup aria-label="importation" name="importationType"  value={importType} onChange={handleChangeImportType}>
                    <FormControlLabel value="address" checked={importType === "address"} control={<GreenRadio />} label="Importação por endereço" />
                    <FormControlLabel value="location" checked={importType === "location"} control={<GreenRadio />} label="Importação por geolocalização" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Col>
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



