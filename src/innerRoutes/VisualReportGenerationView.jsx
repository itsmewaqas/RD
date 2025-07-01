import { useState } from 'react';
import { SimpleButton, OutlineButton, FilledButton, ModeViewButton } from '../sharedComponents/ButtonComponents';
import addwidgetsIcon from '../assets/images/addwidgetsIcon.svg';
import previewIcon from '../assets/images/previewIcon.svg';
import exportIcon from '../assets/images/exportIcon.svg';
import refreshIcon from '../assets/images/refreshIcon.svg';
import calendarIcon from '../assets/images/calendarIcon.svg';
import filterIcon from '../assets/images/filterIcon.svg';
import searchicon from '../assets/images/searchicon.svg';
import saveIcon from '../assets/images/saveIcon.svg';
import modify from '../assets/images/modify.svg';
import groupRow from '../assets/images/groupRows.png';
import groupColunms from '../assets/images/groupColunms.png';
import OutlineDropdown from '../sharedComponents/OutlineDropdown';
import FilterDropdown from '../sharedComponents/FilterDropdown';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { BiBarChart } from "react-icons/bi";
import { TbTable } from "react-icons/tb";
import CreateReport from '../sharedComponents/CreateReport';
import ChartSelection from '../sharedComponents/ChartSelection';

import SaveReportModal from '../sharedComponents/SaveReportModal';
import ExportReportModal from '../sharedComponents/ExportReportModal';
import ChartViewModal from '../sharedComponents/ChartViewModal';
import { TbTextGrammar } from "react-icons/tb";
import { BiImage } from "react-icons/bi";

import { BiGridVertical, BiTrash, BiPencil, BiRefresh, BiExpand } from 'react-icons/bi';
import { RxCross2 } from "react-icons/rx";

import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, RadialLinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Bar, Doughnut, Pie, Line, PolarArea, Scatter } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

function VisualReportGenerationView(props) {

  const [saveReport, setSaveReport] = useState(false);
  const [exportReport, setExportReport] = useState(false);
  const [widgetMenu, setWidgetMenu] = useState(false);
  const [reportCreate, setReportCreate] = useState(false);
  const [viewChart, setViewChart] = useState(null);
  const [selectChart, setSelectChart] = useState(false);

  const widgetMenuData = [
    {
      id: 1,
      title: 'Chart',
      icon: <BiBarChart />
    },
    {
      id: 2,
      title: 'Table',
      icon: <TbTable />
    },
    {
      id: 3,
      title: 'Text',
      icon: <TbTextGrammar />
    },
    {
      id: 4,
      title: 'Image',
      icon: <BiImage />
    },
  ]

  const getType = (item) => {
    console.log(item);
    setReportCreate(true);
    setWidgetMenu(false);
  }

  const chartSelection = () => {
    setSelectChart(true);
    setReportCreate(false);
  }

  // drag and drop function
  const [formData, setFormData] = useState([
    { id: 1, title: 'Invoice Date' },
    { id: 2, title: 'Invoice Description' },
    { id: 3, title: 'Invoice Amount' },
    { id: 4, title: 'Corporate Address City' },
    { id: 5, title: 'Corporate Address Email' },
    { id: 6, title: 'Invoice Number' }
  ]);

  const [conditionalData, setConditionalData] = useState('Invoice Date');
  const [items, setItems] = useState(formData);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [editMode, seteditMode] = useState(true);

  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
  };

  const handleDragEnter = (index) => {
    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedItemIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setDraggedItemIndex(index);
    setItems(newItems);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  const removeItem = (index) => {
    const newList = [...items];
    newList.splice(index, 1);
    setItems(newList);
    console.log(newList);
  };

  // drag and drop function

  // bar chart data start
  const options1 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
  };
  const labels = ['January', 'February', 'March', 'April', 'May'];
  const data1 = {
    labels, // This should match the number of data points in the datasets
    datasets: [
      {
        label: 'Dataset 1',
        data: [2, 3, 4, 5, 6], // 5 data points
        backgroundColor: 'rgba(0, 157, 225, 0.9)',
      },
      {
        label: 'Dataset 2',
        data: [7, 8, 9, 1, 2], // 5 data points
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  // bar chart data end

  // doughnut chart data start
  const data2 = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  // doughnut chart data end

  // pie chart data start
  const data3 = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Pie Chart',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  // pie chart data end

  // line chart data start
  const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
  };
  const labels2 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data4 = {
    labels,
    datasets: [
      {
        label: 'Line Chart',
        data: [1, 4, 3, 7, 2],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(0, 157, 225, 0.9)',
      }
    ],
  };
  // line chart data end

  // bi chart data start
  const data5 = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'BI Chart',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  }
  // bi chart data end

  // network chat data start
  const options3 = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Sample chart data
  const data6 = {
    datasets: [
      {
        label: 'Network Chart',
        data: Array.from({ length: 100 }, () => ({
          x: faker.datatype.number({ min: -100, max: 100 }),
          y: faker.datatype.number({ min: -100, max: 100 }),
        })),
        backgroundColor: 'rgba(0, 157, 225, 1)',
      },
    ],
  };
  // network chat data end

  return (
    <div>
      {saveReport && <SaveReportModal saveReport={saveReport} setSaveReport={setSaveReport} />}
      {exportReport && <ExportReportModal exportReport={exportReport} setExportReport={setExportReport} />}
      {reportCreate && <CreateReport reportCreate={reportCreate} setReportCreate={setReportCreate} buttonCtrl={chartSelection} />}
      {selectChart && <ChartSelection selectChart={selectChart} setSelectChart={setSelectChart} />}
      {viewChart && <ChartViewModal id={viewChart} viewChart={viewChart} setViewChart={setViewChart} />}

      <div className='filterRow clearfix'>
        <h2>Attendance Report <span>Marketing</span></h2>
        <FilledButton
          buttonText="Add Widget"
          buttonClick={() => setWidgetMenu(!widgetMenu)}
          disabled={false}
          buttonIcon={addwidgetsIcon}
        />
        {editMode &&
          <FilledButton
            buttonText="Modify"
            buttonClick={() => seteditMode(false)}
            disabled={false}
            buttonIcon={modify}
          />
        }
        <OutlineButton
          buttonText="Preview"
          buttonClick={() => seteditMode(true)}
          disabled={false}
          buttonIcon={previewIcon}
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
        {widgetMenu && <ul className='widgetMenu'>
          {widgetMenuData.map((item, index) => {
            return <li key={index.toString()}>
              <a onClick={() => getType(item)}>{item.icon} {item.title}</a></li>
          })}
        </ul>}
      </div>
      <div>
        {/* <div className="d-flex justify-content-center" style={{ paddingTop: '250px' }}>
          <FilledButton
            buttonText="Add Widget"
            buttonClick={() => setWidgetMenu(!widgetMenu)}
            disabled={false}
            buttonIcon={addwidgetsIcon}
          />
        </div> */}
        <div className='dragPanel'>
          {items.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              className='dragPanelBox'
              style={{
                backgroundColor: draggedItemIndex === index ? '#f8f8f8' : 'white',
                transition: 'transform 0.2s ease, background-color 0.2s ease',
                transform: draggedItemIndex === index ? 'scale(1.05)' : 'scale(1)',
              }}>
              <div className='dragPanelBoxHeader'>
                <h1>{item.title}
                  {editMode == true ?
                    <ctrl>
                      <a><BiRefresh size={16} color='#7F8187' /></a>
                      <a onClick={() => setViewChart(item.id)}><BiExpand size={16} color='#7F8187' /></a>
                    </ctrl>
                    :
                    <ctrl>
                      <a onClick={() => removeItem(index)}><RxCross2 size={16} color='#7F8187' /></a>
                      <a onClick={() => setSelectChart(true)}><BiPencil size={16} color='#7F8187' /></a>
                    </ctrl>
                  }
                </h1>
              </div>
              <div>
                {item.title == 'Invoice Date' ? <div className='dragPanelBoxContent'>
                  <Bar options={options1} data={data1} height={'300px'} />
                </div> :
                  item.title == 'Invoice Description' ? <div className='dragPanelBoxContent'>
                    <div className='chartCtrl1'>
                      <Doughnut data={data2} legend={false} />
                    </div>
                  </div> :
                    item.title == 'Invoice Amount' ? <div className='dragPanelBoxContent'>
                      <div className='chartCtrl1'>
                        <Pie data={data3} />
                      </div>
                    </div> :
                      item.title == 'Corporate Address City' ? <div className='dragPanelBoxContent'>
                        <Line options={options2} data={data4} height={'300px'} />
                      </div> :
                        item.title == 'Corporate Address Email' ? <div className='dragPanelBoxContent'>
                          <div className='chartCtrl1'>
                            <PolarArea data={data5} />
                          </div>
                        </div> :
                          item.title == 'Invoice Number' ? <div className='dragPanelBoxContent'>
                            <Scatter options={options3} data={data6} height={'267px'} />
                          </div> :
                            null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VisualReportGenerationView;
