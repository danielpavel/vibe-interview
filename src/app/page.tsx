"use client";

import { TabNavigation } from '@/components/index';
import { LPPositionTabContent, MigrateTabContent, TokenListTabContent } from '@/components/TabNavigation';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';

export default function Home() {
  const tabs = [
    {
      id: 1,
      title: "Token List",
      content: <TokenListTabContent />
    },
    {
      id: 2,
      title: "LP Position",
      content: <LPPositionTabContent />
    },
    {
      id: 3,
      title: "Migrate",
      content: <MigrateTabContent />
    },
  ];

  useEffect(() => {
    const _ = async () => {
      // const res = await quote();
      // console.log('[Pool quotes]:', res);

    }

    _();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full">

        <RecoilRoot>
          <TabNavigation tabs={tabs} />
        </RecoilRoot>

      </div>
    </div>
  );
}
