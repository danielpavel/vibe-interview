'use client'

import React, {FC, useEffect, useState} from 'react'
import Tab from './Tab'
import TabContent from './TabContent'
import {
  LPPositionTabContent,
  MigrateTabContent,
  TokenListTabContent,
} from '@components/TabNavigation/index'
import {TokenResponse} from '@/types/types'
import {RecoilRoot} from 'recoil'

interface Props {
  tokens: TokenResponse[]
}

const TabNavigation: FC<Props> = ({tokens}) => {
  const [activeTab, setActiveTab] = useState<string>('1')

  const handleTabOnClick = (e: any) => {
    // console.log('[handleTabOnClick] with value', e.target.id);
    setActiveTab(e.target.id)
  }

  const tabs = [
    {
      id: 1,
      title: 'Token List',
      content: <TokenListTabContent tokens={tokens} />,
    },
    {
      id: 2,
      title: 'LP Position',
      content: <LPPositionTabContent />,
    },
    {
      id: 3,
      title: 'Migrate',
      content: <MigrateTabContent />,
    },
  ]

  // useEffect(() => {
  //   console.log('[activeTab]', activeTab);
  // }, [activeTab]);

  return (
    <RecoilRoot>
      <div className="flex flex-col">
        {/* Tabs */}
        <div className="flex flex-row border-b-2">
          {tabs?.map((tab, index) => (
            <div className="w-full bg-slate-50" key={index}>
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
                <TabContent id={tab.id} key={index}>
                  {tab.content}
                </TabContent>
              )}
            </div>
          ))}
        </div>
      </div>
    </RecoilRoot>
  )
}

export default TabNavigation
