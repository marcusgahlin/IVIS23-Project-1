import { Children, useState } from "react"
import { Nav, Tab } from "react-bootstrap";

export default function TabSwitch({children}) {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey={activeTab} className=''>
      <Nav variant="pills" className="flex-column border-end shadow-sm">
      {Children.map(children, (child, idx) => {
        return(
        <Nav.Item>
        <Nav.Link as="button" eventKey={idx}><div className='d-flex align-items-center gap-2'>{child.props.icon}<p className='m-0'>{child.props.title}</p></div></Nav.Link>
      </Nav.Item>
        )
      })}
        </Nav>
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