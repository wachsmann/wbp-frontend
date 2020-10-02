import React, { forwardRef, useCallback, useEffect, useState, memo } from "react";
import { withRouter } from 'react-router-dom';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from "material-table";
import { TablePagination, Input, IconButton } from '@material-ui/core';
//Translations


//Redux

import { useSelector } from 'react-redux'

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Backspace from '@material-ui/icons/Backspace';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Send from '@material-ui/icons/Send';
import Map from '@material-ui/icons/Map';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Cached from '@material-ui/icons/Cached';


import PropTypes from 'prop-types';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline color='action' {...props} ref={ref} />),
    Send: forwardRef((props, ref) => <Send color='action' {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    Map: forwardRef((props,ref) => <Map {...props} ref={ref} />)

};
export const actionsLabels = { 
    TABLE_REFRESH:"TABLE_REFRESH",
    TABLE_ADD:"TABLE_ADD",
    TABLE_DELETE:"TABLE_DELETE",
    TABLE_EDIT:"TABLE_EDIT",
    TABLE_RESEND:"TABLE_RESEND",
    OPEN_ADDRESS:"OPEN_ADDRESS"
}

const SearchToolbar = memo((props) => {
    const {
        handleList,
        page,
        rowsPerPage,
        totalCount,
        searchTerm: searchTermFromState,
    } = props

    const [searchTerm, setSearchTerm] = useState(searchTermFromState || '')

    const handleChangeSearchTerm = useCallback(e => {
        setSearchTerm(e.target.value)
    }, [])

    const handleClearSearch = useCallback(e => {
        setSearchTerm('')
        handleList({ rowsPerPage, totalCount, page, searchTerm: '' })
    }, [])

    return (
        <div style={{
            padding: '0 8px',
            margin: '-16px 0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <form onSubmit={() => {
                handleList({ rowsPerPage, totalCount, page, searchTerm })
            }}>
                <Input
                    key="random1"
                    id="search"
                    placeholder='Pesquisar...'
                    value={searchTerm || ''}
                    onChange={handleChangeSearchTerm}
                />
                {!searchTermFromState ? (
                    <IconButton type='submit' variant="outlined">
                        <Search />
                    </IconButton>
                ) : (
                    <IconButton type='button' variant="outlined" onClick={handleClearSearch}>
                        <Backspace />
                    </IconButton>
                )}
            </form>
        </div>
    )
})

let TableBase = props => {
    //TODO: Add translations
    
    const {
        tableConfigs,
        isSearchable,
        history,
        handleList,
        handleResend,
        handleDelete,
        page,
        rowsPerPage,
        totalCount,
        data,
        isLoading
    } = props
    var actionsBase =
        [
            {
                icon: () => <Cached fontSize="small" />,
                tooltip: 'shared.tables.refresh',
                isFreeAction: true,
                onClick: (event) => handleList({ rowsPerPage, totalCount, page }),
                type:"TABLE_REFRESH"
            },
            {
                icon: () => <AddBox fontSize="small" />,
                tooltip:  'shared.tables.add',
                isFreeAction: true,
                onClick: (event) => history.push(tableConfigs.actionsPaths.add),
                type:"TABLE_ADD"
            },
            {
                icon: () => <Edit style={{ fontSize: 15 }} />,
                tooltip: 'shared.tables.edit',
                onClick: (event, rowData) => history.push(`${tableConfigs.actionsPaths.edit}/${rowData.id}`),
                type:"TABLE_EDIT"
            },
            {
                icon: () => <DeleteOutline style={{ fontSize: 15 }}  />,
                tooltip: 'shared.tables.delete',
                onClick: (event, rowData)=>{handleDelete(event, rowData).then(()=>{
                    handleList({ rowsPerPage, totalCount, page:0 })
                })},
                type:"TABLE_DELETE"
            },
            {
                icon: () => <Send style={{ fontSize: 15 }}  />,
                tooltip: 'shared.tables.resend',
                onClick: (event, rowData)=>{handleResend(event, rowData).then(()=>{
                    handleList({ rowsPerPage, totalCount, page:0 })
                })},
                type:"TABLE_RESEND"
            },
            {
                icon: <Map style={{ fontSize: 15 }} />,
                tooltip: 'test',
                onClick: (event,rowData)=>{console.log('evt and rowdata', event, rowData)},
                type:"OPEN_ADDRESS"
            },
        ]

    const themeClass = useSelector(state => state.theme.className)
    useEffect(() => {
        handleList({ rowsPerPage, totalCount, page })//.then((res)=>console.log('testing...'))
    }, []);
    const theme = createMuiTheme({
        palette: {
            type: themeClass.replace('theme-', ''),
            primary: {
                main: '#2aad86',
            },
            secondary: {
                main: '#fcb244',
            },
        },

    });

    const filteredActions = actionsBase.filter((action)=>tableConfigs.actions.includes(action.type))

    return (
        <MuiThemeProvider theme={theme}>
            <MaterialTable
                isLoading={isLoading}
                actions={filteredActions}
                icons={tableIcons}

                columns={tableConfigs.columns}

                data={data}
                components={{
                    Pagination: (componentProps) => {
                        //console.log(componentProps)
                        return (<TablePagination
                            {...componentProps}
                            count={totalCount}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onChangePage={(evt, changedPage) => {
                                //let nextPage = changedPage + 1
                                //console.log(changedPage)
                                handleList({ totalCount, rowsPerPage, page: changedPage })
                            }}
                            onSelectionChange={(rows) => { 
                            //    console.log(rows) 
                            }}
                            onChangeRowsPerPage={(changedRowsPerPage) => {

                                componentProps.onChangeRowsPerPage(changedRowsPerPage)



                                handleList({ totalCount, rowsPerPage: changedRowsPerPage.target.value, page })
                            }}

                        />)
                    },
                    Toolbar: mTableProps => (
                        isSearchable ? (
                            <>
                                <MTableToolbar {...mTableProps} />
                                <SearchToolbar {...props} />
                            </>
                        ) : <MTableToolbar {...mTableProps} />
                    )
                }}


                options={{
                    //selection: true,
                    actionsColumnIndex: -1,
                    pageSize: rowsPerPage,
                    search: false,
                    
                    cellStyle: { padding: '0.5em 0.5em 0.5em 0.5em'},
                    headerStyle: { padding: '0.5em 0.5em 0.5em 0.5em'},
                    rowStyle:{ padding: '0.2em'},
                    
                    sorting: false
                }}

                localization={{
                    body: {
                        emptyDataSourceMessage: 'shared.tables.emptyDataSourceMessage'
                    },
                    header: {
                        actions: 'shared.tables.actions'
                    },
                    toolbar: {
                        searchTooltip: 'shared.tables.searchTooltip',
                        searchPlaceholder: 'shared.tables.searchTooltip'
                    },
                    pagination: {
                        labelRowsSelect: 'shared.pagination.labelRowsSelect',
                        labelDisplayedRows: 'shared.pagination.labelDisplayedRows',
                        firstTooltip: 'shared.pagination.firstTooltip',
                        previousTooltip: 'shared.pagination.previousTooltip',
                        nextTooltip: 'shared.pagination.nextTooltip',
                        lastTooltip: 'shared.pagination.lastTooltip'
                    }
                }}

                title={tableConfigs.title}
            />
        </MuiThemeProvider>

    );
}
TableBase.propTypes = {
    tableConfigs: PropTypes.object.isRequired,
    changeSelection: PropTypes.func.isRequired,
    onChangeRowsPerPage: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    handleList: PropTypes.func.isRequired,
    handleResend: PropTypes.func,
    handleDelete: PropTypes.func.isRequired,
}
export default withRouter(TableBase)
