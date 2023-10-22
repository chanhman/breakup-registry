'use client';

import { useRouter } from 'next/navigation';
import AddItemForm from './components/AddItemForm';
import ItemRow from './components/ItemRow';
// import Filters from './components/Filters';
import {
  useAuthGetUser,
  useGetCategories,
  useGetItems,
  useRegistryCount,
  useGetUserByRegistryKey,
} from './hooks/reactQuery';
import { useGetRegistryKey } from './hooks/useGetRegistryKey';
import { GroupedItems, Item } from './types';

export default function Page() {
  const router = useRouter();
  const registryKey = useGetRegistryKey();
  const { isLoading: gettingItems, data: itemsData } = useGetItems(registryKey);
  const { data: authUserData } = useAuthGetUser();
  const { data: categoriesData } = useGetCategories();
  const { isSuccess: gotUser, data: userData } =
    useGetUserByRegistryKey(registryKey);
  const { data: registryCount } = useRegistryCount(registryKey);

  const authUserId = authUserData?.data?.user?.id;
  const publicUserId = userData?.data?.[0]?.id;
  const publicUserName = userData?.data?.[0]?.first_name;
  const items = itemsData?.data;
  const isAdmin = !!authUserData?.data?.user && authUserId === publicUserId;
  const categories = categoriesData?.data;
  const groupedItems: GroupedItems = [];
  const registryExists = registryCount && !!registryCount.count;

  if (registryExists === false) {
    router.push('/not-found');
  }

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

  return gettingItems ? (
    <div>
      <img
        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdzZDkxbmEzMHVqNXE4bTl2c3c5NzFzNmFuNTZsZWFtOHlyYm0xZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3owzVXoDN8iP0w3T68/giphy.gif"
        alt=""
      />
    </div>
  ) : (
    <div className="py-10 px-8">
      {gotUser && (
        <>
          <div className="flex justify-between items-center">
            {publicUserName && <h1>{publicUserName}&apos;s Registry</h1>}
          </div>

          {isAdmin && <AddItemForm />}

          {/* <Filters /> */}
        </>
      )}

      {items && items.length > 0 ? (
        <div>
          {groupedItems.map((groupedItem) => (
            <div key={groupedItem.id}>
              <h2 className="mt-8">{groupedItem.category_name}</h2>
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
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
}
