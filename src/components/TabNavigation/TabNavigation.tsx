"use client"; // this is a client component

import { FC, useEffect, useState } from 'react'
import Tab from './Tab';
import TabContent from './TabContent';

interface Props {
  tabs?: any[]
}

const TabNavigation: FC<Props> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>('1');

  const handleTabOnClick = (e: any) => {
    // console.log('[handleTabOnClick] with value', e.target.id);
    setActiveTab(e.target.id);
  }

  // useEffect(() => {
  //   console.log('[activeTab]', activeTab);
  // }, [activeTab]);

  return (
    <div className="flex flex-col">
      {/* Tabs */}
      <div className="flex flex-row border-b-2">
        {tabs?.map((tab, index) => (
          <div className='w-full bg-slate-50' key={index}>
            <Tab
              id={tab.id}
              key={index}
              onClick={handleTabOnClick}
              disabled={activeTab === `${tab.id}`}
              active={activeTab === `${tab.id}`}
            >
              {tab.title}
            </Tab>
          </div>
        ))}
      </div>

      {/* Tabs Content */}
      <div>
        {tabs?.map((tab, index) => (
          <div key={index}>
            {activeTab === `${tab.id}` && (
              <TabContent id={tab.id} key={index} >{tab.content}</TabContent>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TabNavigation