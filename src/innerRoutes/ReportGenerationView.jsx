import { useState, useMemo } from 'react';
import { SimpleButton, OutlineButton, FilledButton, ModeViewButton } from '../sharedComponents/ButtonComponents';
import modifyIcon from '../assets/images/modifyIcon.svg';
import chartIcon from '../assets/images/chartIcon.svg';
import exportIcon from '../assets/images/exportIcon.svg';
import refreshIcon from '../assets/images/refreshIcon.svg';
import calendarIcon from '../assets/images/calendarIcon.svg';
import filterIcon from '../assets/images/filterIcon.svg';
import searchicon from '../assets/images/searchicon.svg';
import saveIcon from '../assets/images/saveIcon.svg';
import groupRow from '../assets/images/groupRows.png';
import groupColunms from '../assets/images/groupColunms.png';
import OutlineDropdown from '../sharedComponents/OutlineDropdown';
import FilterDropdown from '../sharedComponents/FilterDropdown';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import filterPanelArrow from '../assets/images/filterPanelArrow.svg';
import TableDropdown from '../sharedComponents/TableDropdown';
import ReportChartComponent from '../sharedComponents/ReportChartComponent';
import SaveReportModal from '../sharedComponents/SaveReportModal';
import ExportReportModal from '../sharedComponents/ExportReportModal';

function ReportGenerationView(props) {

  const [filterPanel, setFilterPanel] = useState(false);
  const [navActive, setNavActive] = useState(0);
  const [width, setWidth] = useState(28);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showChart, setshowChart] = useState(false);
  const [saveReport, setSaveReport] = useState(false);
  const [exportReport, setExportReport] = useState(false);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const navData = [
    { title: 'Outline', id: 0 },
    { title: 'Filters', id: 1 }
  ];

  // AgGrid data
  const [rowData, setRowData] = useState([
    {
      reportName: "Activities by Sales people",
      description: "How many sales person.",
      folder: "Public Report 1",
      createdBy: "Alber Khan",
      location: 'Public Report',
      modifiedOn: "28/2-2024 - 2:00am"
    },
    {
      reportName: "Activities by presales",
      description: "How many sales person we have ...",
      folder: "Public Report 2",
      createdBy: "Rija Shakir",
      location: 'Public Report',
      modifiedOn: "28/2-2024 - 2:00am"
    },
    {
      reportName: "Activities",
      description: "How many sales person we have ...",
      folder: "Public Report 3",
      createdBy: "Alber Khan",
      location: 'Public Report',
      modifiedOn: "28/2-2024 - 2:00am"
    },
    {
      reportName: "Activities by Sales people",
      description: "How many sales person.",
      folder: "Public Report 4",
      createdBy: "Waseem Khan",
      location: 'Public Report',
      modifiedOn: "28/2-2024 - 2:00am"
    },
    {
      reportName: "Activities by presales",
      description: "How many sales person we have ...",
      folder: "Public Report 5",
      createdBy: "Alber Khan",
      location: 'Public Report',
      modifiedOn: "28/2-2024 - 2:00am"
    },
    {
      reportName: "Activities",
      description: "How many sales person we have ...",
      folder: "Public Report 6",
      createdBy: "junaid Khan",
      location: 'Public Report',
      modifiedOn: "28/2-2024 - 2:00am"
    },
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "reportName", headerName: "Report Name" },
    { field: "description", headerName: "Description" },
    { field: "folder", headerName: "Folder" },
    { field: "createdBy", headerName: "Created By" },
    { field: "location", headerName: "Location" },
    { field: "modifiedOn", headerName: "Modified On" }
  ]);

  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
    };
  }, []);

  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
  };

  const [getRowData, setGetRowData] = useState('');
  const onRowSelected = (event) => {
    const selectedRows = event.api.getSelectedRows();
    setGetRowData(selectedRows)
  };
  console.log('getRowData', getRowData);
  // AgGrid data

  const getColumn = Array.from(new Set(colDefs.map(x => x.headerName)));
  const columnData = ['First Name', 'Last Name', 'Email', 'Cell', 'Gender', 'Address'];

  const [exactColumnData, setexactColumnData] = useState([]);

  const openNestedPanel = () => {
    if (width == 28) {
      setWidth(222)
    }
    else {
      setWidth(28)
    }
  };

  const [destinationItems, setDestinationItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);

  // Handle drag over (allow drop)
  const handleDragOver = (event) => {
    event.preventDefault(); // This is necessary to allow dropping
  };

  // Handle drop (copy item from source to destination)
  const handleDrop = (event) => {
    event.preventDefault();
    // Add the dragged item to the destination list if it's not already there
    if (draggedItem && !destinationItems.includes(draggedItem)) {
      setDestinationItems([...destinationItems, draggedItem]);
    }
  };

  const removeItem = (index) => {
    setDestinationItems([
      ...destinationItems.slice(0, index),
      ...destinationItems.slice(index + 1)
    ]);
  }

  const removeColunm = (index) => {
    setColDefs([
      ...colDefs.slice(0, index),
      ...colDefs.slice(index + 1)
    ]);
  }

  const mergedItems = Array.from(new Set([...getColumn, ...destinationItems]));
  console.log(mergedItems)
  
  return (
    <div>
      {saveReport && <SaveReportModal saveReport={saveReport} setSaveReport={setSaveReport} />}
      {exportReport && <ExportReportModal exportReport={exportReport} setExportReport={setExportReport} />}
      <div className='filterRow clearfix'>
        <h2>Attendance Report <span>Marketing</span></h2>
        <FilledButton
          buttonText="Modify"
          buttonClick={() => setFilterPanel(true)}
          disabled={false}
          buttonIcon={modifyIcon}
        />
        <OutlineButton
          buttonText="Add Chart"
          buttonClick={() => setshowChart(!showChart)}
          disabled={false}
          buttonIcon={chartIcon}
        />
        <div className='filterRowSep'></div>
        <SimpleButton
          buttonText="Export"
          buttonClick={() => setExportReport(true)}
          disabled={false}
          buttonIcon={exportIcon}
        />
        <SimpleButton
          buttonText="Schedule"
          buttonClick={() => console.log('test')}
          disabled={false}
          buttonIcon={calendarIcon}
        />
        <SimpleButton
          buttonText="Save"
          buttonClick={() => setSaveReport(true)}
          disabled={false}
          buttonIcon={saveIcon}
        />
        <SimpleButton
          buttonText="Refresh"
          buttonClick={() => console.log('test')}
          disabled={false}
          buttonIcon={refreshIcon}
        />
        <SimpleButton
          buttonText="Filter"
          buttonClick={() => console.log('test')}
          disabled={false}
          buttonIcon={filterIcon}
        />
        <SimpleButton
          buttonText="Seacrh"
          buttonClick={() => console.log('test')}
          disabled={false}
          buttonIcon={searchicon}
        />
      </div>
      <div className='filterPanelcontainer'>
        {filterPanel &&
          <div style={{ float: 'left' }}>
            <div className='filterSecondPanel' style={{ width: `${width}px`, transition: 'width 0.3s ease' }}>
              <a className={width == '28' ? 'ctrlLink1' : 'ctrlLink2'} onClick={() => openNestedPanel()}><img src={filterPanelArrow} alt="" /><span>Fields</span></a>
              {width == '28' ? null :
                <div>
                  <Scrollbars style={{ height: 500 }}>
                    <TableDropdown
                      isVisible={openDropdown === 'd1'}
                      toggleDropdown={() => toggleDropdown('d1')}
                      tableName="Task Information"
                      setDraggedItem={setDraggedItem}
                      columnData={columnData} />
                    <TableDropdown
                      isVisible={openDropdown === 'd2'}
                      toggleDropdown={() => toggleDropdown('d2')}
                      tableName="Reporting"
                      setDraggedItem={setDraggedItem}
                      columnData={columnData} />
                    <TableDropdown
                      isVisible={openDropdown === 'd3'}
                      toggleDropdown={() => toggleDropdown('d3')}
                      tableName="Contact"
                      setDraggedItem={setDraggedItem}
                      columnData={columnData} />
                    <TableDropdown
                      isVisible={openDropdown === 'd4'}
                      toggleDropdown={() => toggleDropdown('d4')}
                      tableName="Subject"
                      setDraggedItem={setDraggedItem}
                      columnData={columnData} />
                  </Scrollbars>
                </div>}
            </div>
            <div className='filterPanel'>
              <ul>
                {navData.map((item, index) => {
                  return (
                    <li key={index.toString()}>
                      <a className={navActive === item.id ? 'active' : ''}
                        onClick={() => setNavActive(item.id)}>{item.title}</a>
                    </li>
                  );
                })}
              </ul>
              {navActive == 0 ?
                <div>
                  <Scrollbars style={{ height: 450 }}>
                    <input type="text" placeholder='Search' className='filterSearch' />
                    <dd className='custLable'><img src={groupRow} alt="" /> Group Rows</dd>
                    <OutlineDropdown
                      addLabel="Add Group"
                      columnData={getColumn}
                    />
                    <dd className='custLable'><img src={groupColunms} alt="" /> Group Colunms</dd>
                    <OutlineDropdown
                      addLabel="Add Group"
                      columnData={getColumn}
                    />
                    <dd className='custLable'>Colunms</dd>
                    <OutlineDropdown
                      addLabel="Colunms"
                      columnData={getColumn}
                    />
                    <div
                      className='filterDropMenuFetchItemMain'
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}>
                      <h5>Colunm Drag Here</h5>
                      {getColumn.length == 0 ? null : getColumn.map((item, index) => {
                        return (
                          <div className='filterDropMenuFetchItem' key={item.toString()}>{item}
                            <a onClick={() => removeColunm(index)}>X</a></div>
                        )
                      })}
                      {destinationItems.length == 0 ? null : destinationItems.map((item, index) => {
                        return (
                          <div className='filterDropMenuFetchItem' key={item.toString()}>
                            {item}<a onClick={() => removeItem(index)}>X</a></div>
                        )
                      })}
                    </div>
                  </Scrollbars>
                </div>
                :
                <div>
                  <Scrollbars style={{ height: 450 }}>
                    <input type="text" placeholder='Search keyword' className='filterSearch' />
                    <FilterDropdown
                      filterLabel="Date"
                      listData={getColumn} />
                    <FilterDropdown
                      filterLabel="Task"
                      listData={getColumn} />
                    <FilterDropdown
                      filterLabel="Activities"
                      listData={getColumn} />
                    <FilterDropdown
                      filterLabel="Hours"
                      listData={getColumn} />
                  </Scrollbars>
                </div>}
            </div></div>}
        <div className='innnerContainerMain'>
          <div className='innnerContaine'>
            {showChart && <ReportChartComponent />}
            <div className="ag-theme-quartz" style={{ height: 450, clear: 'both' }} >
              <AgGridReact
                onGridReady={onGridReady}
                defaultColDef={defaultColDef}
                tooltipShowDelay={0}
                tooltipHideDelay={2000}
                onRowSelected={onRowSelected}
                pagination={true}
                paginationPageSize={6}
                rowData={rowData}
                columnDefs={colDefs}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='reportFilterBottom'>
        <dir className="d-flex justify-content-between">
          <div>
            <p>Total Records: <strong>32</strong></p>
          </div>
          <div>
            <div className='d-flex justify-content-end'>
              <div className="form-check form-switch px-4">
                <input className="form-check-input" type="checkbox" role="switch" id="ch1" />
                <label className="form-check-label" for="ch1">Grand Total</label>
              </div>
              <div className="form-check form-switch px-4">
                <input className="form-check-input" type="checkbox" role="switch" id="ch2" />
                <label className="form-check-label" for="ch2">Sub Total</label>
              </div>
              <div className="form-check form-switch px-4">
                <input className="form-check-input" type="checkbox" role="switch" id="ch3" />
                <label className="form-check-label" for="ch3">Rows Count</label>
              </div>
              <div className="form-check form-switch px-4">
                <input className="form-check-input" type="checkbox" role="switch" id="ch4" />
                <label className="form-check-label" for="ch4">Details Rows</label>
              </div>
            </div>
          </div>
        </dir>
      </div>
    </div>
  )
}

export default ReportGenerationView;
