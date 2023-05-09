import { TabNavigation } from '@components/index';
import { LPPositionTabContent, MigrateTabContent, TokenListTabContent } from '@components/TabNavigation';

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

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full">
        <TabNavigation tabs={tabs} />
      </div>
    </div>
  );
}
