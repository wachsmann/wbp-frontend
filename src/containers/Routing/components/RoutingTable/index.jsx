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
    return dispatch(routingService.delete('routing',rowData.id))
  }
  const handleList = (data) =>{
    //dispatch(routingService.getList(data))
  }
  const {list,isLoading} = useSelector(state => state.routing)
  const {page,rowsPerPage,totalCount,data} = {rowsPerPage:10,totalCount:4,data:[],page:1}//list
 // const editable = data.map(o => ({ ...o }))
 const editable = [
    {id:1,name:"teste 1"},{id:2,name:"teste 2"},{id:3,name:"teste 3"},{id:4,name:"teste 4"}
  ]
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
          page={page}
          //isSearchable
          totalCount={totalCount}
          rowsPerPage={rowsPerPage}
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
