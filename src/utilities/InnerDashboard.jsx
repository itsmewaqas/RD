import React, { useState } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import DashHeader from '../utilities/DashHeader';
import DashSidebar from '../utilities/DashSidebar';
import DashFooter from '../utilities/DashFooter';
import { useDispatch, useSelector } from 'react-redux';
import Notify from './Notify';
import TopMenu from './TopMenu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function InnerDashboard(props) {

  const data = useSelector((state) => state);
  const location = useLocation();

  const [sidebarCtrl, sidebarCtrlSet] = useState("dSidebar");
  const [titleCtrl, titleCtrlSet] = useState("titleShow");
  const [dashContainer, SetdashContainer] = useState("dContainer");
  const [notifyRow, SetnotifyRow] = useState(true);

  const sidebarCtrlFunc = () => {
    sidebarCtrlSet(sidebarCtrl == 'dSidebar' ? 'dSidebarCollaps' : 'dSidebar');
    titleCtrlSet(titleCtrl == 'titleShow' ? 'titleHide' : 'titleShow');
    SetdashContainer(dashContainer == 'dContainer' ? 'dContainerCollaps' : 'dContainer');
  }

  return (
    <div className={`dMain`}>
      <ToastContainer />
      <DashHeader
        sidebarCtrlFunc={sidebarCtrlFunc}
        titleCtrl={titleCtrl} />
      <div className='topMenu clearfix'>
        {notifyRow && <Notify notifyClose={() => SetnotifyRow(false)} />}
        <TopMenu />
      </div>
      {location.pathname == '/ReportGenerationView' || location.pathname == '/VisualReportGenerationView' ?
        <div style={{ marginTop: notifyRow == true ? '130px' : '98px' }}>
          <Outlet />
        </div>
        :
        <div>
          <DashSidebar
            topCtrl={{ top: notifyRow == true ? '130px' : '90px' }}
            sidebarCtrl={sidebarCtrl}
            titleCtrl={titleCtrl} />
          <div className={dashContainer} style={{ marginTop: notifyRow == true ? '130px' : '98px' }}>
            <div className='dContainerInner'>
              <Outlet />
            </div>
          </div>
        </div>
      }

      {location.pathname == '/ReportGenerationView' || location.pathname == '/VisualReportGenerationView' ? null : <DashFooter />}
    </div>
  );
}

export default InnerDashboard;