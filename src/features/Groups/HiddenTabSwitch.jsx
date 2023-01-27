import { useState, Children } from "react";
import { Nav, Tab } from "react-bootstrap";


export default function HiddenTabSwitch({children, tabIndex}) {  
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey={tabIndex} activeKey={tabIndex.toString()} className=''>
      <Tab.Content className='h-100 w-100'>
          {Children.map(children, (child, idx) => {
            return(
            <Tab.Pane eventKey={idx} key={idx} className='w-100 h-100'>
            {child}
          </Tab.Pane>
         ) })}
          </Tab.Content>
    </Tab.Container>
  );
}