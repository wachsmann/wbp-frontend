import React from 'react';
import { Container } from 'reactstrap';

import PropTypes from 'prop-types';

import TableBase, { actionsLabels } from '../../../../shared/components/table/TableBase'
import { useDispatch, useSelector } from 'react-redux'
import { actions as routingActions } from '../../../../redux/reducers/routingReducer'


import RoutingService from '../../../../redux/services/RoutingService';

const RoutingPage = () => {
  const dispatch = useDispatch()
  
  const routingService = new RoutingService(routingActions)
  const handleDelete =  (event, rowData) => {
    console.log(rowData)
    return dispatch(routingService.delete(rowData.id))
  }
  const handleList = (data) =>{
    dispatch(routingService.getList())
  }
  const {list} = useSelector(state => state.routing)
  
 const editable = !!list && list.map(o => ({ ...o }))

  return (
    <Container>
      <div style={{ width: "100%" }}>
        <TableBase
          tableConfigs={
            {
              actions:[actionsLabels.TABLE_REFRESH,actionsLabels.TABLE_ADD, actionsLabels.TABLE_EDIT,actionsLabels.TABLE_DELETE],
              actionsPaths:{add:"/app/roteirizacao", edit:"/app/roteirizacao/edicao"},
              columns:[
                { title: "Nome", field: "name" },
             
                
            ],
              title:"Roteamentos",
              
            }
          }

          stateName='routing'
         
          data={editable}
          handleDelete={handleDelete}
          handleList={handleList}
          isLoading={false}
          
         />
      </div>

    </Container>
  )
}

export default (RoutingPage);
