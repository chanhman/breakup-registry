'use client';

import AddItemForm from './components/AddItemForm';
import ItemRow from './components/ItemRow';
// import Filters from './components/Filters';
import {
  useGetCategories,
  useGetItems,
  useAuthGetUser,
} from './hooks/reactQuery';
import { useGetRegistryKey } from './hooks/useGetRegistryKey';
import { GroupedItems, Item } from './types';

export default function Page() {
  const registryKey = useGetRegistryKey();
  const { isLoading, data: itemsData } = useGetItems();
  const { data: authUserData } = useAuthGetUser();
  const { data: categoriesData } = useGetCategories();

  const items = itemsData?.data;
  const isAdmin = !!authUserData?.data.user;
  const categories = categoriesData?.data;
  const groupedItems: GroupedItems = [];

  categories?.forEach((category, index) => {
    groupedItems.push({
      id: category.id,
      category_name: category.name,
      items: [],
    });
    items?.forEach((item: Item) => {
      if (
        item.category_key === category.key &&
        item.registry_key === registryKey
      ) {
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
      </div>

      {isAdmin && <AddItemForm />}

      {/* <Filters /> */}

      {isLoading && <div>It&apos;s loading, bitch!</div>}

      <div className="">
        {groupedItems.map((groupedItem) => (
          <div key={groupedItem.id}>
            <h2 className="mt-8 text-3xl">{groupedItem.category_name}</h2>
            {groupedItem.items.length == 0 ? (
              <div className="mt-4">None</div>
            ) : (
              groupedItem.items.map((item) => (
                <ItemRow data={item} isAdmin={isAdmin} key={item.id} />
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
