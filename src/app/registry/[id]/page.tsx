'use client';

import { useSearchParams } from 'next/navigation';
import AddItemForm from './components/AddItemForm';
import ItemRow from './components/ItemRow';
// import Filters from './components/Filters';
import { useGetCategories, useGetItems, useGetUser } from './hooks/reactQuery';
import { GroupedItems } from './types';

export default function Page() {
  const searchParams = useSearchParams();
  const isAdmin = !!searchParams.get('admin');

  const { isLoading, data: itemsData } = useGetItems();
  const items = itemsData?.data;

  const { data: userData } = useGetUser();
  const userId = userData?.data.user?.id;

  const { data: categoriesData } = useGetCategories();
  const categories = categoriesData?.data;

  const groupedItems: GroupedItems = [];

  categories?.forEach((category, index) => {
    groupedItems.push({
      id: category.id,
      category_name: category.name,
      items: [],
    });
    items?.forEach((item) => {
      if (item.category_id === category.key) {
        groupedItems[index].items.push(item);
      }
    });
  });

  return (
    <div className="py-10 px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-slate-900 sm:text-4xl">
          Mary&apos;s Registry
        </h1>
        {isAdmin && (
          <div className="text-right">
            <div>Your breakup registry link</div>
            <div>http://localhost:3000/registry/chanh</div>
          </div>
        )}
      </div>

      {isAdmin && <AddItemForm userId={userId} />}

      {/* <Filters /> */}

      {isLoading && <div>It&apos;s loading, bitch!</div>}

      <div className="">
        {groupedItems.map((groupedItem) => (
          <div key={groupedItem.id}>
            <h2 className="mt-8 text-3xl">{groupedItem.category_name}</h2>
            {groupedItem.items.map((item) => (
              <ItemRow data={item} isAdmin={isAdmin} key={item.id} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
