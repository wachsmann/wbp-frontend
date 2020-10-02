import React from 'react';
import { Container } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import TableBase, { actionsLabels } from '../../../../shared/components/table/TableBase'
import { useDispatch, useSelector } from 'react-redux'
import { actions as routingActions } from '../../../../redux/reducers/routingReducer'


import RoutingService from '../../../../redux/services/RoutingService';

const RoutingPage = ({ t }) => {
  const dispatch = useDispatch()
  
  const routingService = new RoutingService(routingActions)
  const handleDelete =  (event, rowData) => {
    return dispatch(routingService.delete('routing',rowData.id))
  }
  const handleList = (data) =>{
    dispatch(routingService.getList(data))
  }
  const {list,isLoading} = useSelector(state => state.routing)
  const {page,rowsPerPage,totalCount,data,searchTerm} = list
  const editable = data.map(o => ({ ...o }))
  
  return (
    <Container>
      <div style={{ width: "100%" }}>
        <TableBase
          tableConfigs={
            {
              actions:[actionsLabels.TABLE_REFRESH,actionsLabels.TABLE_ADD, actionsLabels.TABLE_EDIT,actionsLabels.TABLE_DELETE],
              actionsPaths:{add:"/app/roteirizacao/novo", edit:"/app/roteirizacao/edicao"},
              columns:[
                { title: t('shared.fields.name'), field: "name" },
             
                
            ],
              title:t('shared.general.routing'),
              
            }
          }

          stateName='routing'
          page={page}
          searchTerm={searchTerm}
          isSearchable
          totalCount={totalCount}
          rowsPerPage={rowsPerPage}
          data={editable}
          handleDelete={handleDelete}
          handleList={handleList}
          isLoading={isLoading}
          
         />
      </div>

    </Container>
  )
}
RoutingPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(RoutingPage);
